CommunicateEmbedded.ready(function () {
    CommunicateEmbedded.suppressNavigation();
    var calculator = {
        base: '',
        "koeff1": 1,
        "koeff2": 1,
        "eligard7": {
            "basekoeff": 0.76,
            "count": '',
            "price": 7499.56,
            "koeff1": '',
            "koeff2": ''
        },
        "eligard22": {
            "basekoeff": 1.51,
            "count": '',
            "price": 18749.84,
            "koeff1": '',
            "koeff2": ''
        },
        "eligard45": {
            "basekoeff": 2.4,
            "count": '',
            "price": 28712.41,
            "koeff1": '',
            "koeff2": ''
        },
        "kstandi": {
            "basekoeff": 20.01,
            "count": '',
            "price": 171314.00,
            "koeff1": '',
            "koeff2": ''
        }
    };


    var e7count = CommunicateEmbedded.getData('e7count');
    var e22count = CommunicateEmbedded.getData('e22count');
    var e45count = CommunicateEmbedded.getData('e45count');
    var kcount = CommunicateEmbedded.getData('kcount');


    var region = CommunicateEmbedded.getData('region');
    var base = CommunicateEmbedded.getData('base');

    var koeff17 = CommunicateEmbedded.getData('koeff1-7');
    var koeff27 = CommunicateEmbedded.getData('koeff2-7');

    var koeff122 = CommunicateEmbedded.getData('koeff1-22');
    var koeff222 = CommunicateEmbedded.getData('koeff2-22');

    var koeff145 = CommunicateEmbedded.getData('koeff1-45');
    var koeff245 = CommunicateEmbedded.getData('koeff2-45');

    var dkstandi1 = CommunicateEmbedded.getData('kstandi1');
    var dkstandi2 = CommunicateEmbedded.getData('kstandi2');

    if (base) {
        calculator["base"] = base;
        $('.js-rate__count').text(base);
        showAll();
    }
    if (region) {
        $('.js-search').val(region);
        showAll();

    }
    if (koeff17 && koeff27 && koeff122 && koeff222 && koeff145 && koeff245 && dkstandi1 && dkstandi2) {
        calculator["eligard7"]["koeff1"] = +koeff17;
        calculator["eligard7"]["koeff2"] = +koeff27;

        calculator["eligard22"]["koeff1"] = +koeff122;
        calculator["eligard22"]["koeff2"] = +koeff222;

        calculator["eligard45"]["koeff1"] = +koeff145;
        calculator["eligard45"]["koeff2"] = +koeff245;

        calculator["kstandi"]["koeff1"] = +dkstandi1;
        calculator["kstandi"]["koeff2"] = +dkstandi2;

        $('.eligard7 .koeff1 .js-koeff').text(koeff17);
        $('.eligard7 .koeff2 .js-koeff').text(koeff27);

        $('.eligard22 .koeff1 .js-koeff').text(koeff122);
        $('.eligard22 .koeff2 .js-koeff').text(koeff222);

        $('.eligard45 .koeff1 .js-koeff').text(koeff145);
        $('.eligard45 .koeff2 .js-koeff').text(koeff245);

        $('.kstandi .koeff1 .js-koeff').text(dkstandi1);
        $('.kstandi .koeff2 .js-koeff').text(dkstandi2);

    }


    countInp('eligard22', e22count);
    countInp('eligard7', e7count);
    countInp('eligard45', e45count);
    countInp('kstandi', kcount);

    if (e7count && e22count && e45count && kcount) {

        countInp('eligard45', e45count);
        secInputs()
    }
    else {
        inputs();
        $('#eligard7').text('0');
        $('#eligard22').text('0');
        $('#eligard45').text('0');
        $('#kstandi').text('0');
        $('.js-total-summ').text('0');
        $('.js-total-return').text('0');
        $('.js-total-balance').text('0');
    }

    let arrOfKeys = [];

    window.addEventListener("keydown", function (e) {
        if (e.code.substring(0,3) === "Key") {
            arrOfKeys.push(e.code.slice(-1))
        }
        if (e.code === 'Backspace') {
            arrOfKeys.pop();
            if (arrOfKeys.length === 0) {
                $('.js-search').val('');
            }
        }
    });

    function secInputs() {
        $('.js-input-total, .js-kstandi').on('change', function () {
            let handle = $(this).parent().find('.ui-slider-handle');
            handle.attr('data-value', handle.attr('aria-valuenow'));
            calculator["eligard7"]["count"] = handle.attr('aria-valuenow');
        });
        $('.js-input-range-plus').click(function () {
            let max = 500;
            let value = $(this).parent().children().find('.js-value').val();
            if ($(this).parent().children().find('.js-value').hasClass('js-kstandi')) {
                max = 100;
            }
            let medName = $(this).parent().children().find('.js-value').attr('data-med');
            let inp = $(this).parent().children().find('.ui-slider-handle');
            let percent = (value / max) * 100;
            let data = $(this).parent().find(".ui-slider-handle").attr('data-value');
            $(this).parent().find('input').change();
            data = +data + 1;
            inp.css('left', +percent + 1 + '%');
            inp.attr('aria-valuenow', +data);
            inp.attr('aria-valuetext', +data);
            inp.attr('title', +data);
            inp.attr('data-value', +data);
            $(this).parent().children().find('.js-value').val(+data);
            calculator[medName]["count"] = data;
            render();
            return false;
        });
        $('.js-input-range-minus').click(function () {
            let max = 500;
            let value = $(this).parent().children().find('.js-value').val();
            if ($(this).parent().children().find('.js-value').hasClass('js-kstandi')) {
                max = 100;
            }
            let medName = $(this).parent().children().find('.js-value').attr('data-med');
            let inp = $(this).parent().children().find('.ui-slider-handle');
            let percent = (value / max) * 100;
            let data = $(this).parent().find(".ui-slider-handle").attr('data-value');
            data = +data - 1;
            if (data >= 0) {
                $(this).parent().find('input').change();
                inp.css('left', +percent - 1 + '%');
                inp.attr('aria-valuenow', data);
                inp.attr('aria-valuetext', data);
                inp.attr('title', data);
                inp.attr('data-value', data);
                $(this).parent().children().find('.js-value').val(data);
                calculator[medName]["count"] = data;
            }
            render();
            return false;
        });
    }


    function countInp(name, val) {
        let inp = $('[data-med=' + name + ']').find('.ui-slider-handle');
        inp.parent().parent().find('.js-input-total').val(val).trigger('change');
        inp.attr('data-value', val);
        let percent = val / 500 * 100;
        if (name === 'kstandi') {
            percent = val;
        }
        calculator[name]["count"] = val;
        inp.css('left', +percent + '%');
        inp.attr('aria-valuenow', val);
        inp.attr('aria-valuetext', val);
        inp.attr('title', val);
        inp.attr('data-value', val);
        $('[data-med=' + name + '] .tooltip').css('left', '300').attr('data-value', val);
        render();
    }

    var opened = false;
    var options = {
        valueNames: ['name', 'born']
    };
    var city = $('.js-city');
    var manualCount = $('.js-rate__manual-count');
    var buttons = $('.keyboard__buttons');


    var counter = [];
    let koeffs = {
        eligard7: {
            "koeff1": [],
            "koeff2": []
        },
        eligard22: {
            "koeff1": [],
            "koeff2": []
        },
        eligard45: {
            "koeff1": [],
            "koeff2": []
        },
        kstandi: {
            "koeff1": [],
            "koeff2": []
        }
    };
    var count1 = [];
    var count2 = [];
    var userList = new List('city', options);

    $('.cloud').on('touchend', function () {
        $('.alert').fadeIn(500);
        setTimeout(function () {
            $('.alert').fadeOut(500);
        }, 1500)
    });

    city.on('touchend', function (e) {
        e.stopPropagation();
        if (!opened) {
            city.children('.city__block').slideDown();
            $('.city__button').addClass('opened');
            $('.city').addClass('grey');
            opened = true;
        } else {
            if ($(e.target).hasClass('name')) {
                counter.pop();
                calculator.base = $(e.target).attr('data-count');
                choose($(e.target));
                close();
            }
        }
        buttons.off('touchend');
    });
    var inp = true;
    $('.js-search').on('keyup', function () {
        $('.opinions__ops').removeClass('active');
        $('[data-direct="all"]').addClass('active');
        $('ul.list li').removeClass('list-item-hidden');
        $('.js-city-list').css('height', '1000px');
        $(this).css('width', '205');
    });
    $('.city__button').on('touchend', function () {
        event.stopPropagation();
        if (!opened) {
            city.children('.city__block').slideDown();
            $('.city__button').addClass('opened');
            $('.city').addClass('grey');
            opened = true;
        } else {
            city.children('.city__block').slideUp();
            $('.city__button').removeClass('opened');
            $('.city').removeClass('grey');
            opened = false;
        }
    });

    function choose(target) {
        let koeff1El7 = $(target).attr('data-koeff1-7');
        let koeff2El7 = $(target).attr('data-koeff2-7');
        let koeff1El22 = $(target).attr('data-koeff1-22');
        let koeff2El22 = $(target).attr('data-koeff2-22');
        let koeff1El45 = $(target).attr('data-koeff1-45');
        let koeff2El45 = $(target).attr('data-koeff2-45');
        let kstandi1 = $(target).attr('data-koeff1-ks');
        let kstandi2 = $(target).attr('data-koeff2-ks');
        if (target.hasClass('name')) {
            counter = [""];
            $('.eligard7 .koeff1 .js-koeff').text(koeff1El7);
            $('.eligard7 .koeff2 .js-koeff').text(koeff2El7);
            calculator["eligard7"]["koeff1"] = +koeff1El7;
            calculator["eligard7"]["koeff2"] = +koeff2El7;

            $('.eligard22 .koeff1 .js-koeff').text(koeff1El22);
            $('.eligard22 .koeff2 .js-koeff').text(koeff2El22);
            calculator["eligard22"]["koeff1"] = +koeff1El22;
            calculator["eligard22"]["koeff2"] = +koeff2El22;

            $('.eligard45 .koeff1 .js-koeff').text(koeff1El45);
            $('.eligard45 .koeff2 .js-koeff').text(koeff2El45);
            calculator["eligard45"]["koeff1"] = +koeff1El45;
            calculator["eligard45"]["koeff2"] = +koeff2El45;

            $('.kstandi .koeff1 .js-koeff').text(kstandi1);
            $('.kstandi .koeff2 .js-koeff').text(kstandi2);
            calculator["kstandi"]["koeff1"] = +kstandi1;
            calculator["kstandi"]["koeff2"] = +kstandi2;

            render();

            chooseTheCity(target, target.text());
            // clearKoeff();
        }
    }

    function clearKoeff() {
        calculator["koeff1"] = 1;
        calculator["koeff2"] = 1;
        // count1 = [];
        // count2 = [];
        $('.koeff1 .js-koeff').text('1');
        $('.koeff2 .js-koeff').text('1');
        render();
    }

    function close() {
        event.stopPropagation();
        city.children('.city__block').slideUp();
        $('.city__button').removeClass('opened');
        $('.city').removeClass('grey');
        opened = false;
    }

    $('.opinions__ops').on('touchend', function () {
        $('[data-direct]').removeClass('active');
        $(this).addClass('active');
        var parentId = $(this).data('direct');
        showListItems(parentId);
    });

    function showListItems(parentId) {
        $('ul.list li').addClass('list-item-hidden');
        if (parentId !== 'all') {
            $('ul.list li[data-child-of=' + parentId + ']').removeClass('list-item-hidden');
        } else {
            $('ul.list li').removeClass('list-item-hidden');
            $('.js-city-list').css('height', '1300px');
        }
        if (parentId === 'resp' || parentId === 'edje' || parentId === 'cities' || parentId === 'country') {
            $('.js-city-list').css('height', '316px');
        }
        if (parentId === 'district') {
            $('.js-city-list').css('height', '500px');
        }
    }

    showListItems('resp');

    function chooseTheCity(obj, name) {
        inp = true;
        $('.js-search').val(name.replace(/Республика/g, ""));
        // $('.js-koeff__inp').text('1');
        insertData(obj);
    }

    function insertData(obj) {
        $('.js-rate__count').text(obj.attr('data-count').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        counter.push(obj.attr('data-count'));
        calculator.base = obj.attr('data-count');
        showAll();
        buttons.off('touchend');
    }

    $('.rate__pen').show();
    $('.js-rate__count').on('touchend', function () {
        manualCount.show();
        changeTheRate();
    });

    function changeTheRate() {
        showKeyboard();
        insertValue();
    }

    function insertValue() {
        showOp();
        if (calculator.base !== '') {
            manualCount.text(calculator.base);
        }

        $('.keyboard__confirm').on('touchend', function () {
            hideOp();
            showAll();
            hideKeyboard();
            if (calculator.base.length !== 0) {
                manualCount.text(calculator.base.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            } else {
                manualCount.text('');
            }
            $('.koeff__inp').hide();
            if (manualCount.text() != '|' && manualCount.text().length !== 0) {
                $('.js-rate__count').text(calculator.base.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            } else if (manualCount.text().length === 0) {
                $('.js-rate__count').text('0');
            }
            manualCount.hide();
            buttons.off('touchend');
            $('.js-keyboard__clear').off('touchend');
            render();
        });
        counter = [""];
        buttons.on('touchend', function () {
            if (counter.length < 8) {
                $('.rate__error').hide();
                counter.push($(this).text());
                manualCount.text(counter.join('').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
                calculator.base = counter.join('');
                // render();
            }

        });

        $('.js-keyboard__clear').on('touchend', function () {
            counter.pop();
            calculator.base = counter.join('');
            if (counter.length < 8) {
                $('.rate__error').hide();
                manualCount.text(counter.join('').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
            }
        });
        $('.js-clear-all').on('touchend', function () {
            counter = [];
            manualCount.text('');
            calculator.base = counter;
        });
        render();
    }

    function countTheBase() {
        calculate($(this).attr('data-med'), $(this).val());
    }

    let eligard7Koeff1 = $('.eligard7 .koeff1');
    let eligard7Koeff2 = $('.eligard7 .koeff2');

    let eligard22Koeff1 = $('.eligard22 .koeff1');
    let eligard22Koeff2 = $('.eligard22 .koeff2');

    let eligard45Koeff1 = $('.eligard45 .koeff1');
    let eligard45Koeff2 = $('.eligard45 .koeff2');

    let kstandi1 = $('.kstandi .koeff1');
    let kstandi2 = $('.kstandi .koeff2');

    $('.js-kstandi').on('change', countTheBase);
    $('.js-input-total').on('change', countTheBase);
    eligard7Koeff1.on('touchend', countTheKoeff.bind(eligard7Koeff1, 'eligard7'));
    eligard7Koeff2.on('touchend', countTheKoeff.bind(eligard7Koeff2, 'eligard7'));

    eligard22Koeff1.on('touchend', countTheKoeff.bind(eligard22Koeff1, 'eligard22'));
    eligard22Koeff2.on('touchend', countTheKoeff.bind(eligard22Koeff2, 'eligard22'));

    eligard45Koeff1.on('touchend', countTheKoeff.bind(eligard45Koeff1, 'eligard45'));
    eligard45Koeff2.on('touchend', countTheKoeff.bind(eligard45Koeff2, 'eligard45'));

    kstandi1.on('touchend', countTheKoeff.bind(kstandi1, 'kstandi'));
    kstandi2.on('touchend', countTheKoeff.bind(kstandi2, 'kstandi'));


    var status = true;

    function countTheKoeff(el) {
        event.stopPropagation();
        showKeyboard();
        showOp();
        if (status) {
            $(this).children('.js-koeff__inp').text(calculator[el][this.attr('data-koeff')]);
            $(this).children('.js-koeff__inp').show();
            status = false;
        }

        $('.keyboard__confirm').on('touchend', {
            name: $(this),
            el: $(this).children('.js-koeff__inp').attr('data-el')
        }, function (event) {
            let elem = event.data.el;
            $('.js-keyboard__clear').off('touchend');
            if (event.data.name.attr('data-koeff') === 'koeff1') {
                if (koeffs[elem]["koeff1"].length !== 0) {
                    event.data.name.children('.js-koeff').text(koeffs[elem]["koeff1"].join(''));
                    $(`.${el} .js-koeff__inp`).text(koeffs[elem]["koeff1"].join(''));
                    calculator[el]["koeff1"] = koeffs[elem]["koeff1"].join('');
                    // calculate('koeff1', koeffs[elem]["koeff1"].join(''));
                }
            }
            else if (event.data.name.attr('data-koeff') === 'koeff2') {
                if (koeffs[elem]["koeff2"].length !== 0) {
                    event.data.name.children('.js-koeff').text(koeffs[elem]["koeff2"].join(''));
                    calculator[el]["koeff2"] = koeffs[elem]["koeff2"].join('');
                    // calculate('koeff2', koeffs[elem]["koeff2"].join(''));
                }
            }

            buttons.off('touchend');
            $('.js-koeff__inp').hide();
            $('.js-clear-all').off('touchend');
            $(`.${el} .koeff1 .js-koeff__inp`).text(calculator[el]["koeff1"]);
            $(`.${el} .koeff2 .js-koeff__inp`).text(calculator[el]["koeff2"]);
            hideKeyboard();

            status = true;
            render();
            hideOp();

        });

        buttons.on('touchend', {
            name: $(this).attr('data-med'),
            koeff: $(this).hasClass('koeff1'),
            obj: $(this).children('.js-koeff__inp'),
            el: $(this).children('.js-koeff__inp').attr('data-el')
        }, pushKoeff);

        function pushKoeff(event) {
            let el = event.data.el;
            if (event.data.koeff) {
                koeffs[el]["koeff1"].push($(this).text());
                event.data.obj.text(koeffs[el]["koeff1"].join(''));
            }
            else {
                koeffs[el]["koeff2"].push($(this).text());
                event.data.obj.text(koeffs[el]["koeff2"].join(''));
            }
        }

        $('.js-keyboard__clear').on('touchend', {
            name: $(this),
            obj: $(this).children('.js-koeff__inp'),
            el: $(this).children('.js-koeff__inp').attr('data-el')
        }, function (event) {
            if (event.data.name.attr('data-koeff') === 'koeff1') {
                if (typeof(calculator[el]["koeff1"]) === "string") {
                    calculator[el]["koeff1"] = 0;
                    koeffs[el]["koeff1"] = ["0"];
                    event.data.obj.text("0");
                    event.data.name.children('.js-koeff').text('0');
                }
                koeffs[el]["koeff1"].pop();
                event.data.obj.text(koeffs[el]["koeff1"].join(''));
            }
            else if (event.data.name.attr('data-koeff') === 'koeff2') {
                if (typeof(calculator[el]["koeff2"]) === "string") {
                    calculator[el]["koeff2"] = 0;
                    koeffs[el]["koeff2"] = ["0"];
                    event.data.obj.text("0");
                    event.data.name.children('.js-koeff').text('0');
                }
                koeffs[el]["koeff2"].pop();
                event.data.obj.text(koeffs[el]["koeff2"].join(''));
            }

        });
        $('.js-clear-all').on('touchend', {name: $(this), obj: $(this).children('.js-koeff__inp')}, function (event) {

            if (event.data.name.attr('data-koeff') === 'koeff1') {
                calculator[el]["koeff1"] = ["0"];
                $(event.data.name).find('.js-koeff').text('0');
                $(event.data.name).find('.js-koeff__inp').text('0');
            }
            else if (event.data.name.attr('data-koeff') === 'koeff2') {
                calculator[el]["koeff2"] = ["0"];
                $(event.data.name).find('.js-koeff').text('0');
                $(event.data.name).find('.js-koeff__inp').text('0');
            }
        });
    }

    function calculate(elem, value) {
        // $('.keyboard__confirm').off('touchend');
        if (elem !== 'koeff1' || elem !== 'koeff2') {
            calculator[elem]["count"] = value;
        } else {
            calculator[elem] = value;
        }
        render();
    }

    function render() {
        var eligard7 = Math.round(calculator["base"] * calculator["eligard7"]["basekoeff"] * +calculator["eligard7"]["koeff1"] * +calculator["eligard7"]["koeff2"] * +calculator["eligard7"]["count"]);
        var eligard22 = Math.round(calculator.base * calculator["eligard22"]["basekoeff"] * +calculator["eligard22"]["koeff1"] * +calculator["eligard22"]["koeff2"] * +calculator["eligard22"]["count"]);
        var eligard45 = Math.round(calculator.base * calculator["eligard45"]["basekoeff"] * +calculator["eligard45"]["koeff1"] * +calculator["eligard45"]["koeff2"] * +calculator["eligard45"]["count"]);
        var kstandi = Math.round(calculator.base * calculator["kstandi"]["basekoeff"] * +calculator["kstandi"]["koeff1"] * +calculator["kstandi"]["koeff2"] * +calculator["kstandi"]["count"]);
        var totalSum = calculator["eligard7"]["price"] * calculator["eligard7"]["count"] + calculator["eligard22"]["price"] * calculator["eligard22"]["count"] + calculator["eligard45"]["price"] * calculator["eligard45"]["count"] + calculator["kstandi"]["price"] * calculator["kstandi"]["count"];
        var returnSum = eligard7 + eligard22 + eligard45 + kstandi;
        var balance = Math.round((returnSum - totalSum));
        totalSum = Math.round(totalSum);
        returnSum = Math.round(returnSum);

        $('#eligard7').text((eligard7 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('#eligard22').text((eligard22 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('#eligard45').text((eligard45 + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('#kstandi').text((kstandi + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-total-summ').text((totalSum + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-total-return').text((returnSum + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

        if (balance > 0) {
            balance = '+' + balance;
        }
        $('.js-total-balance').text((balance + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    }

    function showOp() {
        $('.op').show()
    }

    function hideOp() {
        $('.op').hide();
    }

    function showKeyboard() {
        $('.keyboard').slideDown();
    }

    function hideKeyboard() {
        $('.keyboard').slideUp();
    }

    function showAll() {
        $('.cloud').hide(200);
    }

    $(".js-input-total").slider({
        min: 0,
        max: 500,
        create: function (event, ui) {
            $(".ui-slider-handle").attr('data-value', '0');
        },
        stop: function (e, ui) {
            $(ui.handle).attr('data-value', ui.value);
            let elem = $(ui.handle).parent().attr('data-med');
            render();
        }
    });


    $(".js-kstandi").slider({
        min: 0,
        max: 100,
        create: function (event, ui) {
            $(".ui-slider-handle").attr('data-value', '0');
        },
        stop: function (e, ui) {
            $(ui.handle).attr('data-value', ui.value);
            let elem = $(ui.handle).parent().attr('data-med');
            // calculator[elem]["count"] = ui.value;
            render();
        }
    });

    function inputs() {
        $('.js-input-total').on('change', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            let max = 500;
            let value = $(this).val();

            let elem = $(this).attr('data-med');
            calculator[elem]["count"] = value;
            $(this).next().children(".ui-slider-handle").attr('data-value', value);
            let percent = value / max;
            let width = $(this).width();

            let left = percent * width;

            $(this).parent().find('.tooltip').css('left', left).attr('data-value', value);
        }).val(0).trigger('change');


        $('.js-kstandi').on('change', function () {
            let max = 100;
            let value = $(this).val();

            let elem = $(this).attr('data-med');
            calculator[elem]["count"] = value;
            $(this).next().children(".ui-slider-handle").attr('data-value', value);
            let percent = value / max;
            let width = $(this).width();

            let left = percent * width;

            $(this).parent().find('.tooltip').css('left', left).attr('data-value', value);
        }).val(0).trigger('change');


        $('.js-input-range-plus').on('touchend', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            let max = 500;
            let value = $(this).parent().children().find('.js-value').val();

            if ($(this).parent().children().find('.js-value').hasClass('js-kstandi')) {
                max = 100;
            }
            if (value < max) {
                let medName = $(this).parent().children().find('.js-value').attr('data-med');
                let inp = $(this).parent().children().find('.ui-slider-handle');
                let percent = (value / max) * 100;
                let data = $(this).parent().find(".ui-slider-handle").attr('data-value');
                $(this).parent().find('input').change();
                data = +data + 1;
                inp.css('left', +percent + 1 + '%');
                inp.attr('aria-valuenow', +data);
                inp.attr('aria-valuetext', +data);
                inp.attr('title', +data);
                inp.attr('data-value', +data);
                $(this).parent().children().find('.js-value').val(+data);
                calculator[medName]["count"] = data;
                render();
            }
            return false;
        });
        $('.js-input-range-minus').on('touchend', function () {
            let max = 500;
            let value = $(this).parent().children().find('.js-value').val();
            if ($(this).parent().children().find('.js-value').hasClass('js-kstandi')) {
                max = 100;
            }
            let medName = $(this).parent().children().find('.js-value').attr('data-med');
            let inp = $(this).parent().children().find('.ui-slider-handle');
            let percent = (value / max) * 100;
            let data = $(this).parent().find(".ui-slider-handle").attr('data-value');
            data = +data - 1;
            if (data >= 0) {
                $(this).parent().find('input').change();
                inp.css('left', +percent - 1 + '%');
                inp.attr('aria-valuenow', data);
                inp.attr('aria-valuetext', data);
                inp.attr('title', data);
                inp.attr('data-value', data);
                $(this).parent().children().find('.js-value').val(data);
                calculator[medName]["count"] = data;
            }
            render();
            return false;
        });
    }


    $('.send').on('touchend', function () {
        var region = $('.js-search').val();
        var rate = $('.js-rate__count').text();
        var koeff1 = $('.koeff1 .js-koeff').text();
        var koeff2 = $('.koeff2 .js-koeff').text();
        CommunicateEmbedded.setData('region', region);
        CommunicateEmbedded.setData('rate', rate);

        CommunicateEmbedded.setData('koeff1-7', calculator["eligard7"]["koeff1"]);
        CommunicateEmbedded.setData('koeff2-7', calculator["eligard7"]["koeff2"]);

        CommunicateEmbedded.setData('koeff1-22', calculator["eligard22"]["koeff1"]);
        CommunicateEmbedded.setData('koeff2-22', calculator["eligard22"]["koeff2"]);

        CommunicateEmbedded.setData('koeff1-45', calculator["eligard45"]["koeff1"]);
        CommunicateEmbedded.setData('koeff2-45', calculator["eligard45"]["koeff2"]);

        CommunicateEmbedded.setData('kstandi1', calculator["kstandi"]["koeff1"]);
        CommunicateEmbedded.setData('kstandi2', calculator["kstandi"]["koeff2"]);


        CommunicateEmbedded.setData('e7count', calculator["eligard7"]["count"]);
        CommunicateEmbedded.setData('e22count', calculator["eligard22"]["count"]);
        CommunicateEmbedded.setData('e45count', calculator["eligard45"]["count"]);
        CommunicateEmbedded.setData('kcount', calculator["kstandi"]["count"]);
        CommunicateEmbedded.setData('totalSumm', $('.js-total-summ').text());
        CommunicateEmbedded.setData('totalReturn', $('.js-total-return').text());
        CommunicateEmbedded.setData('totalBalance', $('.js-total-balance').text());
        CommunicateEmbedded.setData('base', calculator["base"]);
    })

});
