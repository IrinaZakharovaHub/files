$(function() {
    window.addEventListener("load", ready);
    function ready() {
         var openedPopup = false;  
         $('.back').css('opacity', 1);
         $('.button').on('touchend', function() {
            $('.popup').css('left', 0);
            openedPopup = true;
         });
        $('.popup__close').on('touchend', function() {
            $('.popup').css('left', '100%');
        })
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