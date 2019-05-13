$(function() {

    window.onload = function() {
        $('.button__hand').addClass('ux');
        $('.button__round').addClass('ux');
        $('.js-anim').on('touchend', startAnimation);
        $('.js-anim-back').on('touchend', returnAnimation);

        function startAnimation() {
            $('.anim').addClass('active');
            $('.button__hand').removeClass('ux');
            $('.button__round').removeClass('ux');
        }

        function returnAnimation() {
            $('.anim').removeClass('active');
        }
    }


});
CommunicateEmbedded.ready(function() {
    // CommunicateEmbedded.setData('slide', 'slide_01');

    $('.button__area').on('touchmove', disable);
    $('.button__thumb--orange').on('touchmove', disable);
    $('.button__thumb--blue').on('touchmove', disable);
    $('*').on('touchmove', enable);

    function disable(e) {
        e.stopPropagation();
        CommunicateEmbedded.onslideflip = function(ev) {
            ev.preventDefault();
        }
    }
    function enable(e) {
        let scheme = localStorage.getItem('scheme');
        console.log(scheme);
        CommunicateEmbedded.onslideflip = function(ev) {
            ev.preventDefault();
        };
        if (!$(e.target).hasClass('button__area') && !$(e.target).hasClass('button__thumb--orange') && !$(e.target).hasClass('button__thumb--blue') && !$(e.target).hasClass('button__background') && !$(e.target).hasClass('button__hand') && !$(e.target).hasClass('button__round') && scheme !== 'opened') {
            CommunicateEmbedded.onslideflip = function(ev) {
                if (ev.direction === 'prev') {
                    ev.preventDefault();
                    CommunicateEmbedded.prevCallPresentation();
                }
                if (ev.direction === 'next') {
                    ev.preventDefault();
                    CommunicateEmbedded.navigate('slide_02');
                }
            }
        }
    }
});