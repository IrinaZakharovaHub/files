function footer() {
    let openedMenu = false,
    footerPopup =  $('.footer__popup');
    let video =  document.getElementById('myVideo');

    $('.js-menu').on('touchend', function() {
        if (!openedMenu) {
            $('.js-opened-footer').slideDown(500);
            $('.js-footer-logo').css('opacity', 0);
            $('.js-footer-logo-white').css('opacity', 1);
            $('.js-footer-white-texared_1').css('opacity', 1);
            $('.js-footer-context').addClass('filter');
            $('.js-footer-texared_1').css('opacity', 0);
            $('.dark-wrap').css('z-index', '98');
            $('.dark-wrap').css('opacity', '1');
            $('.js-footer-shadow-texared_1').css('opacity', 0);
            openedMenu = true;
        }
        else {
            $('.js-opened-footer').slideUp(500);
            $('.js-footer-logo').css('opacity', 1);
            $('.js-footer-logo-white').css('opacity', 0);
            $('.js-footer-white-texared_1').css('opacity', 0);
            $('.js-footer-context').removeClass('filter');
            $('.js-footer-texared_1').css('opacity', 1);
            $('.dark-wrap').css('z-index', '-1');
            $('.dark-wrap').css('opacity', '0');
            $('.js-footer-shadow-texared_1').css('opacity', 1);
            openedMenu = false;
        }

    });
    $('.js-footer-texared_1').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_100');
    });
    $('.js-back').on('touchend', function (ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigateBackward(1);
    });
    $('.js-lock').on('touchstart', function () {
        localStorage.setItem('scheme', 'opened');
        $('.scheme').addClass('active');
        footerPopup.css('display', 'none');
        $('.footer__popup3').css('display', 'flex');
        controlNavigation(1);
    });
    $('.scheme__close').on('touchstart', function () {
        let popup = localStorage.getItem('popup');
        localStorage.setItem('scheme', 'closed');
        $('.scheme').removeClass('active');
        footerPopup.css('display', 'none');
        if (popup === '1') {
            $('.footer__popup1').css('display', 'flex');
        }
        else if (popup === '2') {
            $('.footer__popup2').css('display', 'flex');
        }
        else if (popup === '3') {
            $('.footer__popup3').css('display', 'flex');
        }
        else {
            $('.footer__base').css('display', 'flex');
            controlNavigation('06');
        }
    });
    $('.js-video').on('touchend', function() {
        $('.video-block').show();
        video.play();
    });
    $('.js-video-close').on('touchend', function() {
        $('.video-block').hide();
        video.pause();
        video.currentTime = 0;
    });
    $('.js-prev').on('touchend', function (ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigateBackward(1);
    });

    $('.js-footer-texared').on('touchend', function(ev) {
        ev.preventDefault();
        CommunicateEmbedded.navigate('slide_100');
    });
}
footer();
(function($) {


    $('.footer__brand img').not('.footer__disabled').on('touchstart', function() {
        $('.footer').toggleClass('footer--links-show');
    });
    $('.footer__close').on('touchstart', function() {
        $('.links').removeClass('links--active');
    });


    $('.footer__book').on('touchstart', function() {
        console.log(1);
        $('.library').addClass('library_show');
    });


    $('.btn-alert-up').on('touchstart',function () {
        if($(this).hasClass('btn-alert-up--active')){
            $('.btn-alert-up').removeClass('btn-alert-up--active');
            $('.alert-up').removeClass('alert-up--show');
            $('.alert-up-hide-block').removeClass('hide');
        }
        else {
            var id = $(this).attr('data-alert');
            $('.btn-alert-up').not($(this)).removeClass('btn-alert-up--active');
            $(this).addClass('btn-alert-up--active');
            $('.alert-up').not('.alert-up--'+id).removeClass('alert-up--show');
            $('.alert-up--'+id).addClass('alert-up--show');
            $('.alert-up-hide-block').addClass('hide');
        }
    });
    $('.alert-up__close').on('touchstart',function () {
        $('.btn-alert-up').removeClass('btn-alert-up--active');
        $('.alert-up').removeClass('alert-up--show');
        $('.alert-up-hide-block').removeClass('hide');
    });

    $(window).load(function(){
        $('.slides').addClass('slides--anim');
    });

})(jQuery);

(function () {
    $('.slide').removeClass('slide_active');
    CommunicateEmbedded.ready(function () {
        $('.slide').addClass('slide_active');

    });

    $('[data-pdf]').on('click', function (e) {
        var $link = $(e.currentTarget).data('pdf');
        if ($link) {
            CommunicateEmbedded.openAttachment($link);
        }
    });
    $('[data-folder]').on('click', function (e) {
        var $link = $(e.currentTarget).data('folder');
        if (typeof $link == 'number') {
            $('.library__section_' + $link).addClass('library__section_show');
            $('.library__back').addClass('library__back_active');
            $('.library__section_main').removeClass('library__section_show');
        }
    });
    $('[data-video]').on('click', function (e) {
        var videoN = $(e.currentTarget).data('video');
        CommunicateEmbedded.openAttachment('video' + videoN);
    });
    $('.video-modal-close, .video-overlay').on('click', function (e) {
        $('.video-buf').get(0).pause();
        $('.video-modal, .video-overlay').hide();
    });

    $('.library__close').on('click', function (e) {
        $('.library').removeClass('library_show');
    });
    $('.library__back').on('click', function (e) {
        if ($(e.currentTarget).hasClass('library__back_active')) {
            $(e.currentTarget).removeClass('library__back_active');
            $('.library__section').removeClass('library__section_show');
            $('.library__section_main').addClass('library__section_show');
        }
    });
})();