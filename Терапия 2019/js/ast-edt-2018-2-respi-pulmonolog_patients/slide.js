'use strict';
function Slider() {
    const slider = $('.js-slider');
    const screen = $('.js-screen');
    const screenAnimation = $('.js-screen-animation');
    const screenAction = $('.js-screen-action');
    const button = $('.js-button');
    const checkBtn = $('.js-check-btn');
    const clearBtn = $('.js-clear-btn');
    const showTableBtn = $('.js-show-popup-btn');
    const hideTableBtn = $('.js-hide-popup-btn');
    const counterText = document.querySelector('.js-counter-text');
    const uiSlider = $('.ui-range');
    const img = new Image();
    img.src = 'img/ast-edt-2018-2-respi-pulmonolog_patients/man.png';

    const linkBtn = $('.js-link-button');
    const linksBlock = $('.js-links');
    let current = 'left';
    let opened = false;
    this.quantity = {
        'left': 0,
        'right': 0
    };

    function initAction() {
        setTimeout(()=> {
            screenAnimation.removeClass('active');
            screenAction.addClass('active');
        }, 3000)
    }

    function slide() {
        button.on('click touchend', function () {
            let dataButton = $(this).attr('data-button');
            current = dataButton;
            $(`.js-button`).removeClass('active');
            $(this).addClass('active');
            slider.removeClass('animate');
            uiSlider.removeClass('active');
            $(`#${current}-range`).addClass('active');
            screen.removeClass('active');
            if (dataButton === 'right') {
                slider.addClass('animate');
            }
            $(`.screen--${dataButton}`).addClass('active');
            opened = false;
        });
    }

    function checkData() {
        checkBtn.on('click touchend', function () {
            $(`.screen--${current} .js-title`).addClass('active');
            $(`.screen--${current} .js-counter`).removeClass('active');
            $(`.screen--${current} .js-clear-btn`).removeClass('active');
            $(`.screen--${current} .js-check-btn`).removeClass('active');
            $(`.screen--${current} .js-show-popup-btn`).addClass('active');
            $(`.screen--${current} .patients__patient`).removeClass('active');
            $(`.screen--${current} .js-right-answer`).addClass('active');
            $(`#${current}-range`).slider("disable");
        })
    }

    function tableScreen() {
        showTableBtn.on('click touchend', function () {
            $(`.screen--${current} .popup`).addClass('active');
            $(`.screen--${current} .js-hide-popup-btn`).addClass('active');
        });
        hideTableBtn.on('click touchend', function () {
            $(`.screen--${current} .popup`).removeClass('active');
            $(`.screen--${current} .js-hide-popup-btn`).removeClass('active');
        })
    }

    function choosePatients() {


        function choose(event) {
            event.stopPropagation();
            let y = event.changedTouches[0].pageY;
            let x = event.changedTouches[0].pageX;
            let obj = document.elementFromPoint(x, y);
            if (obj.classList.contains('patients__patient') && !obj.classList.contains('active')) {
                if (obj.hasAttribute('data-row')) {
                    $(`.screen--${current} .js-clear-btn`).addClass('colored');
                    let chosenRow = obj.getAttribute('data-row');
                    $(`.screen--${current} .patients__patient.row-${chosenRow}`).addClass('active');
                    console.log(quantity);
                    quantity[`${current}`].push(obj);
                    let abc = declOfNum(quantity[`${current}`].length, ['пациент', 'пациента', 'пациентов']);
                    document.querySelector(`.js-figure-${current}`).textContent = `${quantity[`${current}`].length * 5}`;
                    counterText.textContent = `${abc}`;
                }
                return false;
            }
        }

        function declOfNum(number, titles) {
            let cases = [2, 0, 1, 1, 1, 2];
            return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
        }


        // document.body.addEventListener('touchstart', choose.bind(event));
        // document.body.addEventListener('touchmove', choose.bind(event));
    }

    function clearResult() {
        clearBtn.on('click touchend', function() {
            quantity[`${current}`] = [];
            $(`.screen--${current} .patients__patient`).removeClass('active');
            document.querySelector(`.js-figure-${current}`).textContent = `0`;
            counterText.textContent = `пациентов`;
            $(`.screen--${current} .js-clear-btn`).removeClass('colored');


        })
    }

    function links() {
        linkBtn.on('click touchend', function () {
            if (!opened) {
                $(`.screen--${current} .js-links`).addClass('active');
                opened = true;
            }
            else {
                linksBlock.removeClass('active');
                opened = false;
            }
        })
    }

    slide();
    choosePatients();
    checkData();
    tableScreen();
    links();
    clearResult();
    initAction();

}

let slide = new Slider();

$('#left-range').slider({
    range: "min",
    value: '',
    max: 105,
    step: 5,
    slide: function (event, ui) {
        for (let i = 1; i < ui.value + 1; i++) {
            slide.quantity["left"] = i - 5;
            console.log(slide.quantity);
            $(`.screen--left .patients__patient-${i - 5}`).addClass('active');
            document.querySelector(`.js-figure-left`).textContent = slide.quantity["left"];
        }
        for (let i = ui.value + 1; i < 110; i++) {
            $(`.screen--left .patients__patient-${i - 5}`).removeClass('active');
        }
    }
});
$('#right-range').slider({
    range: "min",
    value: '',
    max: 105,
    step: 5,
    slide: function (event, ui) {
        for (let i = 1; i < ui.value + 1; i++) {
            slide.quantity["right"] = i - 5;
            console.log(slide.quantity);
            $(`.screen--right .patients__patient-${i - 5}`).addClass('active');
            document.querySelector(`.js-figure-right`).textContent = slide.quantity["right"];
        }
        for (let i = ui.value + 1; i < 110; i++) {
            $(`.screen--right .patients__patient-${i - 5}`).removeClass('active');
        }
    }
});