$(function() {
        CommunicateEmbedded.ready(function() {
                
                $('.blank').on('touchmove', disable);
                $('#redux').on('touchmove', disable);
                $('.h1').on('touchmove', enable);
                $('.main').on('touchmove', enable);
                $('.white-block').on('touchmove', enable);
                function disable(e) {
                    e.stopPropagation();
                    CommunicateEmbedded.onslideflip = function(ev) {
                        ev.preventDefault();
                     }
                    console.log(1);
                }
                  function enable(e) {
                    console.log(2);
                    CommunicateEmbedded.onslideflip = function(ev) {
                        if (ev.direction === 'prev') {
                            CommunicateEmbedded.navigate('slide_00');
                        }
                        if (ev.direction === 'next') {
                            CommunicateEmbedded.navigate('slide_02');
                        }
                     }
                }
               
        });
        let white = false;
        $('#redux').eraser({
            size: 70,
            progressFunction: function(p) {
                console.log(p);
            },
            completeRatio: .9,
            completeFunction: function() {
                func();
                event.preventDefault();
            }
        });

        function func() {
            $('.js-finger').removeClass('opacity');
            $('.js-finger').addClass('opacity2');
            $('.js-october').addClass('opacity3');
        }
        $('.footer-btn').on('touchend', function() {
            if (!white) {
                $('.white-block').slideDown();
                $('.opened-footer').slideDown();
                white = true;
            } else {
                $('.white-block').slideUp();
                $('.opened-footer').slideUp();
                white = false;
            }

        })
    });