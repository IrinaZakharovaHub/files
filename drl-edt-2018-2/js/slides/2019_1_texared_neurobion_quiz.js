'use strict';
localStorage.clear();
let app = document.getElementById('app');
let questions = document.getElementById('questions');
//
let results = $('.results');
let answers = $('.js-answer');
let answersOnQuest1 = $('.js-answer-on-quest-1');
let answersOnQuest = $('.js-answer-on-quest');
//
let current = 0;
let left = [0, -1280, -1792, -2304, -2816, -3328, -3840];
let images = ['', $('.img-nails'), $('.img-mongenstern'), $('.img-collar'), $('.img-pitchfork'), $('.img-shackle'), $('.img-trap')];
let screens = ['.screen--welcome', '.screen--question--1', '.screen--question--2', '.screen--question--3', '.screen--question--4', '.screen--question--5', '.screen--question--6'];
let img;

let rightAnswers = {
    question1: ["B1", "B6", "B12"],
    question2: ["tenoksikam"],
    question3: ["75"],
    question4: ["1"],
    question5: ["no"],
    question6: ["15"]
};
let userAnswers = {
    question1: [],
    question2: [],
    question3: [],
    question4: [],
    question5: [],
    question6: []
};

let userResults = {
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: ''
};


CommunicateEmbedded.ready(function() {
    CommunicateEmbedded.suppressNavigation();
    CommunicateEmbedded.onslideflip = function(ev) {
        ev.preventDefault();
    };
    function RepeatingFill(name, val) {
        //var prop = CommunicateEmbedded.getData(name) || '';
        let prop = localStorage.getItem(name) || '';
        let arr = [];
        if (prop !== '') {
            arr.push(prop);
        }
        arr.push(val);
        let newData = arr.join(' $ ');
        //CommunicateEmbedded.setData(name, newData);
        localStorage.setItem(name, newData);
        CommunicateEmbedded.fillQuestionary(name, newData);
    }
    function FillRightdata(name, val) {
        let prop = localStorage.getItem(name);
        let arr = prop.split(' $ ');
        let value = val;
        arr[arr.length - 1] = value;
        let newData = arr.join(' $ ');
        localStorage.setItem(name, newData);
        CommunicateEmbedded.fillQuestionary(name, newData);
    }
    function insernNulls() {
        let ins1 = new RepeatingFill('question1', '0');
        let ins2 = new RepeatingFill('question2', '0');
        let ins3 = new RepeatingFill('question3', '0');
        let ins4 = new RepeatingFill('question4', '0');
        let ins5 = new RepeatingFill('question5', '0');
        let ins6 = new RepeatingFill('question6', '0');
        let ins1_correct = new RepeatingFill('question1_correct', '0');
        let ins2_correct = new RepeatingFill('question2_correct', '0');
        let ins3_correct = new RepeatingFill('question3_correct', '0');
        let ins4_correct = new RepeatingFill('question4_correct', '0');
        let ins5_correct = new RepeatingFill('question5_correct', '0');
        let ins6_correct = new RepeatingFill('question6_correct', '0');
    }
    insernNulls();

    answers.on('click touchend', function () {
        $(app).css('transition', '1s');
        let currentSlide = $(`.${$(this).parent().find('.answers').attr('data-screen')}`);
        let thisSlide = $(this).attr('data-next-screen') - 1;
        let string = screens[+$(this).attr('data-next-screen') - 1];
        let quest = string.substring(9);
        let userQuest = quest.replace(/-/g, '');
        let chosen = $(`.screen--${quest}`).find('.answers__answer').hasClass('chosen');
        if (thisSlide < 6 && thisSlide > 0 && !$(this).attr('disabled') && chosen) {
            currentSlide.find('.right-answer').addClass('active');
            currentSlide.find('.false-answer').addClass('active');
            currentSlide.addClass('blocked');
            $(this).attr('disabled', 'disabled');
            $(this).addClass('hidden');
            for (let i = 0; i < $(`.screen--${quest}`).find('.chosen').length; i++) {
                userAnswers[`${userQuest}`].push($(`.screen--${quest}`).find('.chosen').eq(i).attr('data-answer'));
            }
            userResults[`${userQuest}`] = true;
            for (let i = 0; i < rightAnswers[`${userQuest}`].length; i++) {
                if (rightAnswers[`${userQuest}`][i] !== userAnswers[`${userQuest}`][i]) {
                    userResults[`${userQuest}`] = false;
                }
            }
            if (userResults[`${userQuest}`] === false) {
                $(this).parent().find('.answers__result').addClass('wrong');
                $(`.js-result-${thisSlide}`).addClass('wrong');
            }
            else if (userResults[`${userQuest}`] === true) {
                $(this).parent().find('.answers__result').addClass('correct');
                $(`.js-result-${thisSlide}`).addClass('correct');
            }
            let userData = new FillRightdata(userQuest, userAnswers[`${userQuest}`].join(','));
            let rightData = new FillRightdata(`${userQuest}_correct`, userResults[`${userQuest}`]);

            setTimeout(() => {
                img.hide();
                rebootAnimation(img);
                img = new AnimateImg(images[+$(this).attr('data-next-screen')]);
                setTimeout(() => {
                    $(app).css('transform', `translateX(${left[+$(this).attr('data-next-screen') - 1]}px)`);
                    unblockScreen(screens[+$(this).attr('data-next-screen')]);
                    img.show();
                }, 800);
                current = +$(this).attr('data-next-screen') - 1;
            }, 1000);
        }
        if (thisSlide === 6 && !$(this).attr('disabled') && chosen) {
            currentSlide.find('.right-answer').addClass('active');
            currentSlide.find('.false-answer').addClass('active');
            currentSlide.addClass('blocked');
            $(this).attr('disabled', 'disabled');
            $(this).addClass('hidden');
            for (let i = 0; i < $(`.screen--${quest}`).find('.chosen').length; i++) {
                userAnswers[`${userQuest}`].push($(`.screen--${quest}`).find('.chosen').eq(i).attr('data-answer'));
            }
            for (let i = 0; i < rightAnswers[`${userQuest}`].length; i++) {
                userResults[`${userQuest}`] = rightAnswers[`${userQuest}`][i] === userAnswers[`${userQuest}`][i];
            }
            if (userResults[`${userQuest}`] === false) {
                $(this).parent().find('.answers__result').addClass('wrong');
                $(`.js-result-${thisSlide}`).addClass('wrong');
            }
            else if (userResults[`${userQuest}`] === true) {
                $(this).parent().find('.answers__result').addClass('correct');
                $(`.js-result-${thisSlide}`).addClass('correct');
            }
            img.hide();
            rebootAnimation(img);
            let userData = new FillRightdata(userQuest, userAnswers[`${userQuest}`].join(','));
            let rightData = new FillRightdata(`${userQuest}_correct`, userResults[`${userQuest}`]);

            let summ = 0;
            for (let key in userResults) {
                if (userResults[key] === true) {
                    summ += 1;
                }
            }
            let result = (summ > 4) ? 'Отличный результат!' : 'Хороший результат!';
            $('.js-result').text(`${summ}/6`);
            $('.js-total-content').text(result);

            setTimeout(()=> {
                $('.screen--results').addClass('active');
                results.removeClass('active');
            }, 2000)

        }
    });
    $('.js-repeat').on('click touchend', function() {
        insernNulls();
        current = 0;
        $(app).css('transition', '0s');
        $(app).css('transform', `translateX(${left[current]}px)`);
        $('.screen--results').removeClass('active');
        userAnswers = {
            question1: [],
            question2: [],
            question3: [],
            question4: [],
            question5: [],
            question6: []
        };

        userResults = {
            question1: '',
            question2: '',
            question3: '',
            question4: '',
            question5: '',
            question6: ''
        };
        $('.answers__answer').removeClass('chosen');
        answers.removeAttr('disabled');
        $('.lock').css('opacity', '1');
        $('.blur-wrapper').addClass('active');
        $('.js-start').removeClass('active');
        answersOnQuest1.removeClass('active');
        answersOnQuest.removeClass('active');
        answers.removeClass('active').removeClass('hidden');
        $('.answers__result').removeClass('wrong').removeClass('correct');
        $('.screen').removeClass('blocked');
        $('.results__result').removeClass('wrong').removeClass('correct');

    });

});

let mc = new Hammer(questions);

function commonAction() {

    mc.on("swipeleft", function (ev) {
        if (current < 6 && current > 0) {
            $(app).css('transform', `translateX(${left[current + 1]}px)`);
            current += 1;
        }
    });

    mc.on("swiperight", function (ev) {
        if (current > 1) {
            $(app).css('transform', `translateX(${left[current - 1]}px)`);
            current -= 1;
        }
    });
}


answersOnQuest1.on('click touchend', function() {
    let currentSlide = $(this).parent().attr('data-screen');
    if (!$(`.${currentSlide}`).hasClass('blocked')) {
    $(this).toggleClass('chosen');
    }
    $(`.${currentSlide}`).find('.js-answer').addClass('active');
});
answersOnQuest.on('click touchend', function() {
    let screen = $(this).parent().attr('data-screen');
    if (!$(`.${screen}`).hasClass('blocked')) {
        $(`.${screen} .js-answer-on-quest`).removeClass('chosen');
        $(this).addClass('chosen');
        $(`.${screen}`).find('.js-answer').addClass('active');
    }
});

function unblockScreen(current) {
    // let i = 0;
    $(`${current} .blur-wrapper`).removeClass('active');
    // let interval = setInterval(()=> {
    //     $(`${current} .blur-wrapper`).css('filter', `blur(${10 - i}px)`).css('-webkit-filter', `blur(${10 - i}px)`);
    //     if (i > 10) {
    //         clearInterval(interval);
    //     }
    //     i++;
    // }, 50);
}

function rebootAnimation(img) {
    setTimeout(function() {
        img.reboot();
    }, 3000)
}

function welcomeAction() {
    $('.js-start').on('click touchend', welcomeEvents);
    function welcomeEvents() {
        $('.screen--results').removeClass('active');
        $(this).addClass('active');
        img = new AnimateImg(images[current + 1]);
        setTimeout(() => {
            img.show();
        }, 1000);
        setTimeout(() => {
            $(app).css('transform', `translateX(${left[current + 1]}px)`);
            current += 1;
            results.addClass('active');
        }, 1500);
    }
}

function AnimateImg(container) {
    let animate_container = container,
        t = 0,
        H = 608, // Высота кадра и самого контейнера
        sprH = 27900, // Высота спрайта
        speed = 150, // Скорость анимации
        frame = 0;

    this.show = function () {
        animate_container.addClass('active');
    };

    this.hide = function () {
        animate_container.addClass('hide');
        let setAnimate = setInterval(function () {

            t += H;
            if (t > sprH) t = 0;
            animate_container.css({'background-position': '0 -' + t + 'px'});
            frame++;
            if (frame === 7) {
                clearInterval(setAnimate);
            }
        }, speed);
    };

    this.temp = function() {
        return animate_container;
    };

    this.reboot = function() {
        t = 0;
        animate_container.removeClass('hide').removeClass('active');
        animate_container.css('transition-duration', '0s');
        animate_container.css('background-position', '0px 0px');
    }
}


commonAction();
welcomeAction();
