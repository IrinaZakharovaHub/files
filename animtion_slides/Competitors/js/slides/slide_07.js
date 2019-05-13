$(function() {
    window.addEventListener("load", ready);
    function ready() {
         var openedPopup = false;  
         $('.back').css('opacity', 1);
         $('.button').on('touchend', function() {
            console.log(openedPopup);
            if (!openedPopup) {
                $('.popup').css('left', 0);
                openedPopup = true;
            }
            else {
                $('.popup').css('left', '100%');
                openedPopup = false;  
            }

         });
    }
    CommunicateEmbedded.ready(function() {

        $('.js-back').on('touchend', function(ev) {
            ev.preventDefault();
            CommunicateEmbedded.navigate('slide_100');
        });
                CommunicateEmbedded.onslideflip = function(ev) {
            if (ev.direction === 'next') {
                ev.preventDefault();
                CommunicateEmbedded.navigate('slide_108');
            }
            if (ev.direction === 'prev') {
                ev.preventDefault();
                 CommunicateEmbedded.navigate('slide_100');
            }
        }

    })
});