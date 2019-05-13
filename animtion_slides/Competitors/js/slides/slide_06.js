$(function() {
    window.addEventListener("load", ready);

    function ready() {
        $('.back').css('opacity', 1);
        $('.popup__cities').css('opacity', 1);
        $('.city-star').css('opacity', 1);
    }
    CommunicateEmbedded.ready(function() {

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