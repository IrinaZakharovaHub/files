$(function() {
    window.addEventListener("load", ready);

    function ready() {
        $('.back').css('opacity', 1);
    }
    CommunicateEmbedded.ready(function() {
       $('.button').on('touchend', function() {
            CommunicateEmbedded.navigate('slide_106');
        });

        $('.js-back').on('touchend', function(ev) {
            ev.preventDefault();
            CommunicateEmbedded.navigate('slide_100');
        });

        CommunicateEmbedded.onslideflip = function(ev) {
            if (ev.direction === 'next') {
                ev.preventDefault();
                CommunicateEmbedded.navigate('slide_100');
            }
            if (ev.direction === 'prev') {
                ev.preventDefault();
                CommunicateEmbedded.navigate('slide_100');
            }
        }

    })
});