function zoomIn() {
    var gallery = document.querySelector('.photo-gallery');
    console.log(gallery);
    var photo = document.querySelector('#photo-img img');
    var imgs = document.querySelectorAll('.photos img');
    var close = document.querySelector('#close');

    imgs.forEach(function (img) {
        img.addEventListener('click', function() {
            gallery.classList.remove('none');
            gallery.classList.add('display');
                var src = img.getAttribute('src');
                photo.setAttribute('src', src);
            if (getComputedStyle(gallery).display == 'flex') {
                gallery.classList.add('opacity1');
            }

        });
    });
    close.addEventListener('click', function() {
        gallery.classList.remove('opacity1');
        gallery.classList.add('opacity0');
        setTimeout(function() {
            if (getComputedStyle(gallery).opacity == 0) {
                gallery.classList.add('none');
            }
        }, 510);

    });
}









