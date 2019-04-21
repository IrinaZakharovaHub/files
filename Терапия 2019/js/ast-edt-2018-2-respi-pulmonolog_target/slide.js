'use strict';

function popup() {
    const overlay = $('.overlay');

    $('.js-link').on('touchend', function () {
        overlay.addClass('active');
    });
    $('.js-close').on('touchend', function () {
        overlay.removeClass('active');
    })
}

function shot() {
    const button = document.querySelectorAll('.js-button');
    const fire = document.querySelector('.js-fire');
    const hand = document.querySelector('.js-hand');
    const choice = document.querySelectorAll('.js-choice');
    const sightShadow = document.querySelector(`.js-sight-shadow`);
    const sight = document.createElement('img');
    const container = document.querySelector(`#container`);

    let currentY, currentX, shiftX, shiftY, game, wasMoving, animation = false;
    [...button].forEach(function (i) {
        i.addEventListener('touchend', () => {
            for (let y = 0; y < button.length; y++) {
                button[y].classList.remove('active');
                button[y].classList.add('disabled');
                choice[y].classList.remove('animate');
                hand.classList.add('active');
                sightShadow.classList.add('active');
            }
            i.classList.add('active');
            i.classList.remove('disabled');
            readyToShot($(i).attr('data-button'));
        })
    });

    sight.className = `sight images-sight`;
    sight.src = `img/ast-edt-2018-2-respi-pulmonolog_target/sight.png`;
    sight.style.top = `577px`;
    sight.style.left = `440px`;
    container.appendChild(sight);

    function readyToShot(button) {
        game = button;
        sight.classList.add('active');
    }

    sight.addEventListener('touchstart', function (event) {
        hand.classList.remove('active');
        sightShadow.classList.remove('active');
        currentY = +sight.style.top.slice(0, -2);
        currentX = +sight.style.left.slice(0, -2);
        let coords = getCoords(this);
        let beginY = coords.top;
        let beginX = coords.left;
        let moveY = event.changedTouches[0].pageY - coords.top;
        let moveX = event.changedTouches[0].pageX - coords.left;
        this.addEventListener('touchmove', function (event) {
            let area = getArea();
            for (let i = 0; i < event.changedTouches.length; i++) {
                shiftY = beginY - event.changedTouches[i].pageY + moveY;
                shiftX = beginX - event.changedTouches[i].pageX + moveX;
                area.top = event.changedTouches[i].pageY;
                area.left = event.changedTouches[i].pageX;
            }
            if ((area.top > 100 && area.top < 650) && (area.left > 220 && area.left < 800 && !animation)) {
                sight.style.top = `${currentY - shiftY}px`;
                sight.style.left = `${currentX - shiftX}px`;
                fire.style.top = `${currentY - shiftY}px`;
                fire.style.left = `${currentX - shiftX}px`;
                wasMoving = true;
            }
        })
    });
    sight.addEventListener('touchend', function () {
        if (wasMoving) {
            $(`.${game}`).addClass('animate');
            fire.classList.add('animate');
            setTimeout(() => {
                fire.classList.remove('animate');
            }, 100);
            setTimeout(() => {
                this.style.transition = 'none';
                animateFinish();
            }, 1500);
            animateStart();
            this.style.transition = '1s';
            this.style.left = '440px';
            this.style.top = '577px';
            wasMoving = false;
        }
    });

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    function getArea() {
        return {
            top: 100,
            left: 220
        }
    }

    let animateStart = function () {
        let t1 = new TimelineMax(),
            splinter = document.querySelectorAll(`.splinter`);
        if (!animation) {
            $(splinter).css('top', currentY - shiftY).css('left', currentX - shiftX);
            t1.to(splinter, .5, {
                opacity: 1,
                onComleted: function () {
                    Array.prototype.forEach.call(splinter, function (el) {
                        TweenMax.to(el, 1, {
                            x: el.getAttribute('data-x'),
                            y: el.getAttribute('data-y'),
                            ease: Linear.easeNone,
                            rotation: Math.random() * 360 - 180,
                            transformOrigin: "center"
                        });
                        TweenMax.to(el, 1, {
                            opacity: 0
                        });
                        animation = true;

                    });

                }
            }, "-=3");
        }
    };

    let animateFinish = function () {
        let t1 = new TimelineMax(),
            splinter = document.querySelectorAll(`.splinter`);
        if (animation) {
            t1.to(splinter, 1, {
                x: 40,
                y: 40
            }, "-=3");
            animation = false;
        }

    };
}


popup();
shot();