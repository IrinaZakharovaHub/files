function footer() {
    let openedMenu = false;
    $('.js-menu').on('touchend', function() {
        if (!openedMenu) {
            $('.js-opened-footer').slideDown(500);
            $('.js-footer-logo').css('opacity', 0);
            $('.js-footer-logo-white').css('opacity', 1);
            $('.js-footer-white-texared').css('opacity', 1);
            $('.js-footer-context').addClass('filter');
            $('.js-footer-texared').css('opacity', 0);
            $('.dark-wrap').css('z-index', '98');
            $('.dark-wrap').css('opacity', '1');
            $('.js-footer-shadow-texared').css('opacity', 0);
            openedMenu = true;
        }
        else {
            $('.js-opened-footer').slideUp(500);
            $('.js-footer-logo').css('opacity', 1);
            $('.js-footer-logo-white').css('opacity', 0);
            $('.js-footer-white-texared').css('opacity', 0);
            $('.js-footer-context').removeClass('filter');
            $('.js-footer-texared').css('opacity', 1);
            $('.dark-wrap').css('z-index', '-1');
            $('.dark-wrap').css('opacity', '0');
            $('.js-footer-shadow-texared').css('opacity', 1);
            openedMenu = false;
        }

    });
}
footer();
(function($) {


    $('.footer__brand images').not('.footer__disabled').on('touchstart', function() {
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