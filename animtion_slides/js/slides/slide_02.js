$(function() {

    CommunicateEmbedded.ready(function() {
        CommunicateEmbedded.setData('slide', 'slide_02');
        let index = 1;

        var footerPopup =  $('.footer__popup');
        $('.js-block1').on('touchstart', function () {
            localStorage.setItem('popup', '1');
            $('.popup--1').addClass('popup--show');
            $('.popup--1 .anim').addClass('active');
            footerPopup.css('display', 'none');
            $('.footer__popup1').css('display', 'flex');
            setTimeout(()=> {
                console.log(1);
                $('.popup__15').addClass('opacity1');
            }, 1000);
            setTimeout(()=> {
                console.log(4);
                $('.tape1').addClass('opacity1');
                $('.tape2').addClass('opacity1');
            }, 1000);
            setTimeout(()=> {
                console.log(2);
                $('.popup__24').addClass('opacity1');
            }, 1200);
            setTimeout(()=> {
                console.log(3);
                $('.popup__60').addClass('opacity1');
            }, 1500);
            controlNavigation(1);
        });

        $('.js-block2').on('touchstart', function () {
            localStorage.setItem('popup', '2');
            $('.popup--2').addClass('popup--show');
            $('.popup--2 .anim').addClass('active');
            footerPopup.css('display', 'none');
            $('.footer__popup2').css('display', 'flex');
            controlNavigation(1);
        });

        $('.js-block3').on('touchstart', function () {
            localStorage.setItem('popup', '3');
            $('.popup--3').addClass('popup--show');
            $('.popup--3 .anim').addClass('active');
            footerPopup.css('display', 'none');
            $('.footer__popup3').css('display', 'flex');
            controlNavigation(1);
        });

        $('.popup__close').on('touchstart', function () {
            localStorage.setItem('popup', 'main');
            controlNavigation('06');
            $('.popup').removeClass('popup--show');
            $('.anim').removeClass('active');
            $('.js-anim').removeClass('opacity1');
            footerPopup.css('display', 'none');
            $('.footer__base').css('display', 'flex');
        });


    })
});

