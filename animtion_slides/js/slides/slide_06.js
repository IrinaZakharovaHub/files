    (function(){


        var svgChildren = $('svg').children(),
            svgLength = svgChildren.length,
            i = 0;

        var timerId = setInterval(function () {

            svgChildren.eq(i).css('opacity',1);

            if(++i == svgLength) {

                clearInterval(timerId);

            }

        },20);

    })();
        CommunicateEmbedded.ready(function() {
        CommunicateEmbedded.setData('slide', 'texared_2');
                CommunicateEmbedded.onslideflip = function(ev) {
                    if (ev.direction === 'next') {
                        ev.preventDefault();
                        CommunicateEmbedded.nextCallPresentation();
                    }
                }
    });
