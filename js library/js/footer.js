function footer() {
    let openedMenu = false;
    let video =  document.getElementById('myVideo');
    $('.js-menu').on('click touchend', function() {
        if (!openedMenu) {
            $('.js-links').slideDown(500);
            $('.js-wrapper').addClass('active');
            openedMenu = true;
        }
        else {
            $('.js-links').slideUp(500);
            $('.js-wrapper').removeClass('active');
            openedMenu = false;
        }

    });
    $('.js-back').on('click touchend', function () {
        CommunicateEmbedded.navigateBackward(1);
    });
    $('.js-footer-texared').on('click touchend', function() {
        CommunicateEmbedded.navigate('slide_100');
    });
    $('.js-video').on('touchend', function() {
        $('.video-block').show();
        video.play();
    });
    $('.js-video-close').on('click touchend', function() {
        $('.video-block').hide();
        video.pause();
        video.currentTime = 0;
    });
    let connection = document.createElement('div');
    connection.className = "connection-block";
    connection.innerHTML = "<div class=\"connection-close js-connection-close\"></div>";
    $('.js-connection').on('click touchend', function() {
        document.body.appendChild(connection);
        CommunicateEmbedded.suppressNavigation();
        $('.js-connection-close').on('touchend', function() {
            let parent = $(this).parent();
            parent.remove();
            CommunicateEmbedded.enableNavigation();
        })
    });
}
footer();
(function($) {


    $('.footer__brand images').not('.footer__disabled').on('click touchstart', function() {
        $('.footer').toggleClass('footer--links-show');
    });
    $('.footer__close').on('click touchstart', function() {
        $('.links').removeClass('links--active');
    });


    $('.footer__book').on('click touchstart', function() {
        $('.library').addClass('library_show');
    });


    $('.btn-alert-up').on('click touchstart',function () {
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
    $('.alert-up__close').on('click touchstart',function () {
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