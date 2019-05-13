(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.Communicate = factory();
    }
}(this, function () {/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../../node_modules/almond/almond", function(){});

/*globals document: true, window: true */

define('tools/dispatcher',[],function() {
    'use strict';
    return {
        questorCommand: function questorCommand(command, params, callback) {
            var cmd = command,
                token = new Date().getTime(),
                init = cmd + '_init_' + token,
                cb = cmd + '_callback_' + token;

            window[init] = function() {
                delete window[init];
                return JSON.stringify({
                    type: cmd,
                    suppressError: 0,
                    params: params
                });
            };

            window[cb] = function(err, data) {
                if (callback) {
                    callback(err, data);
                }
                delete window[cb];
            };

            window.location.href = 'questor://executeCommand/' + init + '/' + cb;
        },
        log: function log(data) {
            var iframe = document.createElement('IFRAME');
            iframe.setAttribute('src', 'js-frame:logData&' + encodeURIComponent(JSON.stringify(data)));
            document.documentElement.appendChild(iframe);
            iframe.parentNode.removeChild(iframe);
            iframe = null;
        },
        error: function error() {},
        dispatch: function dispatch(method, data) {
            var iframe = document.createElement('IFRAME');
            if (method === 'openAttachment') {
                iframe.setAttribute('src', 'js-frame:openFile&' + encodeURIComponent(data.path));
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }
            if (method === 'sendMail') {
                iframe.setAttribute('src', 'js-frame:sendMail&' + encodeURIComponent(JSON.stringify(data)));
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }
            if (method === 'openUrl') {
                iframe.setAttribute('src', 'js-frame:openUrl&' + encodeURIComponent(data.url));
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }
            if (method === 'nextCallPresentation' || method === 'prevCallPresentation') {
                iframe.setAttribute('src', 'js-frame:' + method);
                document.documentElement.appendChild(iframe);
                iframe.parentNode.removeChild(iframe);
                iframe = null;
            }
        }
    };
});

/*globals sessionStorage: true */
define('api/init',['tools/dispatcher'], function(dispatcher) {
	'use strict';
	return function(state, options) {
		var date = new Date(),
		specialityId = sessionStorage.specialityId,
		logObj = {
			logType: 'init',
			//presentation: state.version,
			//runId: state.runId,
			logData: options
		};
		state.presentation = options;
		state.version = '3822_13958_20180904';
		state.runId = date.toJSON().replace(/[-T:\.\Z]/g,'') + '-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function() {
			var r = Math.random() * 36 | 0;
			return r.toString(36);
		});
        state.timesplit = [];
		logObj.runId = state.runId;
		logObj.presentation = state.version;
		if(specialityId!==undefined && specialityId!==null && specialityId!== '' && specialityId!=='undefined')
		{
			logObj.specialityId = specialityId;
		}
		dispatcher.log(logObj);
	};
});

define('api/nav',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state, to) {

        var timeStamp = new Date().getTime(),
            navInfo = {},
            slideObj,
            correctAlias = state.presentation.some(function(part) {
                return part.slides && part.slides.some(function(slide) {
                    if (slide.alias === to) {
                        slideObj = slide;
                        return true;
                    }
                    return false;
                });
            });

        if (!correctAlias) {
            dispatcher.error('Slide', to, 'not found');
        }

        if (state.currentSlide) {
            navInfo.from = state.currentSlide;
            navInfo.stayDuration = timeStamp - state.currentSlideEnter;
            if (state.currentSlideObj.timeSplit && state.currentSlideObj.timeSplit.length) {
                calculateTimeSplit();
            }
        }

        navInfo.to = state.currentSlide = to;
        state.currentSlideEnter = timeStamp;
        state.currentSlideObj = slideObj;

        dispatcher.log({
            logType: 'nav',
            logData: navInfo,
            runId: state.runId
        });

        function calculateTimeSplit() {
            var i, j, totalSplit = 0,
                currentSplit = 0,
                totalCoeff = state.currentSlideObj.timeSplit.reduce(function(total, item) {
                    return item.split + total;
                }, 0);
            for (i = 0; i < state.currentSlideObj.timeSplit.length; i++) {
                currentSplit = Math.round(navInfo.stayDuration / totalCoeff * state.currentSlideObj.timeSplit[i].split);
                if (i === state.currentSlideObj.timeSplit.length - 1) {
                    currentSplit = navInfo.stayDuration - totalSplit;
                }
                totalSplit = totalSplit + currentSplit;
                for (j = 0; j < state.timesplit.length; j++) {
                    if (state.timesplit[j].brand === state.currentSlideObj.timeSplit[i].brand) {
                        state.timesplit[j].duration += currentSplit;
                        break;
                    }
                }
                if (j === state.timesplit.length) {
                    state.timesplit.push({
                        brand: state.currentSlideObj.timeSplit[i].brand,
                        duration: currentSplit
                    });
                }
            }
        }
    };
});

define('api/attach',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state, alias) {
        var path, i, j, part, k, slide, data;

        for (i = 0; i < state.presentation.length; i++) {
            part = state.presentation[i].slides;
            if (part) {
                for (j = 0; j < part.length; j++) {
                    slide = part[j];
                    if (slide.alias === state.currentSlide && slide.attachments) {
                        for (k = 0; k < slide.attachments.length; k++) {
                            if (slide.attachments[k].alias === alias) {
                                path = slide.attachments[k].path;
                            }
                        }
                    }
                }
            }
        }

        if (path) {
            data = {
                slide: state.currentSlide,
                alias: alias,
                path: path
            };
            dispatcher.dispatch('openAttachment', data);
            dispatcher.log({
                logType: 'attach',
                logData: data,
                runId: state.runId
            });
        } else {
            dispatcher.error('Cant find attachment with alias ', alias, ' on slide ', state.currentSlide);
        }
    };
});
define('api/fire',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state, alias) {
         dispatcher.log({
            logType: 'fire',
            logData: {
                slide: state.currentSlide,
                alias: alias,
                runId: state.runId
            }
        });
    };
});
define('api/fill',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state, alias, data, dataAddon) {
        var logData = {
            slide: state.currentSlide,
            alias: alias,
            data: data,
            presentation: state.version,
            runId: state.runId
        };
        if ( dataAddon ) {
            Object.keys(dataAddon).forEach(function(key){
                logData[key] = dataAddon[key];
            });
        }

        dispatcher.log({
            logType: 'fill',
            logData: logData
        });
    };
});
define('api/url',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state, url) {
        var data = {
                slide: state.currentSlide,
                url: url
            };

        dispatcher.log({
            logType: 'url',
            logData: data,
            runId: state.runId
        });

        dispatcher.dispatch('openUrl', data);
    };
});
define('api/nextPres',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function() {
        dispatcher.dispatch('nextCallPresentation');
    };
});

define('api/prevPres',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function() {
        dispatcher.dispatch('prevCallPresentation');
    };
});

define('api/sendMail',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(data) {
        dispatcher.dispatch('sendMail', data);
    };
});

define('api/showQuiz',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state) {
        var start = new Date().getTime();
        dispatcher.questorCommand('showQuizUI',{}, function(){
            var end = new Date().getTime();
            // "pause" slide while quiz were opened
            state.currentSlideEnter = state.currentSlideEnter + end - start;
        });
    };
});

define('api/setClientData',['tools/dispatcher'], function(dispatcher) {
    'use strict';
    return function(state, data) {
        var logData = {
            slide: state.currentSlide,
            data: data,
            presentation: state.version,
            runId: state.runId
        };

        dispatcher.log({
            logType: 'clientData',
            logData: logData
        });
    };
});
/* globals window */
define('main',['api/init', 'api/nav', 'api/attach', 'api/fire', 'api/fill', 'api/url', 'api/nextPres', 'api/prevPres', 'api/sendMail', 'api/showQuiz', 'api/setClientData'], function(init, nav, attach, fire, fill, url, nextPres, prevPres, mail, showQuiz, setClntData) {
    'use strict';
    var state, communicate;
    communicate = {
        initialize: function navigated(options) {
            state = {};
            init(state, options);
        },
        navigated: function navigated(to) {
            nav(state, to);
        },
        openAttachment: function openAttachment(alias) {
            attach(state, alias);
        },
        fireEvent: function fireEvent(alias) {
            fire(state, alias);
        },
        fillQuestionary: function fillQuestionary(alias, data, dataAddon) {
            fill(state, alias, data, dataAddon);
        },
        openUrl: function openUrl(address) {
            url(state, address);
        },
        nextCallPresentation: function nextCallPresentation() {
            nextPres();
        },
        prevCallPresentation: function prevCallPresentation() {
            prevPres();
        },
        sendMail: function sendMail(data) {
            mail(data);
        },
        showQuizUI: function showQuizUI() {
            showQuiz(state);
        },
        setClientData: function setClientData(data) {
            setClntData(state, data);
        }
    };
    window.CEGetStatisticsSplit = function() {
        communicate.navigated(state.currentSlide);
        var res = {
            version: 1,
            statistics: state.timesplit
        };
        state.timesplit = [];
        return JSON.stringify(res);
    };

    return communicate;
});

    return require('main');
}));