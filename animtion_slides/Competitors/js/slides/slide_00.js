CommunicateEmbedded.ready(function() {
    $('.block1').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_101');
    });
    $('.block2').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_102');
    });
    $('.block3').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_103');
    });
    $('.block4').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_104');
    });
    $('.block5').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_105');
    });
    $('.block6').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_107');
    });
    var slide = CommunicateEmbedded.getData('slide');
    CommunicateEmbedded.onslideflip = function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate(slide);
    };
    $('.js-back').on('touchend', function(ev) {
        CommunicateEmbedded.navigate(slide);
    })
});

$(function() {
    function controlNavigation(arg) {
        if (arg === 1) {
            CommunicateEmbedded.onslideflip = function(ev) {
                ev.preventDefault();
            }
        }
        else if (arg === 2) {
            CommunicateEmbedded.onslideflip = function(ev) {
                if (ev.direction === 'next') {
                    ev.preventDefault();
                    CommunicateEmbedded.navigate('slide_101');
                }
            }
        }
    }
    var video =  document.getElementById('myVideo');
    $('.js-video').on('touchend', function() {
        $('.video-block').show();
        video.play();
        controlNavigation(1);
    });
    $('.js-video-close').on('touchend', function() {
        $('.video-block').hide();
        video.pause();
        video.currentTime = 0;
        controlNavigation(2);
    })
});
