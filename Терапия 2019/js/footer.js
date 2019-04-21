function links() {
    const linkBtn = $('.js-link-button');
    const linksBlock = $('.js-links');

    let opened = false;
    linkBtn.on('touchend', function () {
        if (!opened) {
            linksBlock.addClass('active');
            opened = true;
        }
        else {
            linksBlock.removeClass('active');
            opened = false;
        }
    })
}

links();