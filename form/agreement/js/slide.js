'use strict';
new Image().src = '../agreement/images/00/btn_dark.png';
new Image().src = '../agreement/images/00/input_invalid.png';
new Image().src = '../agreement/images/00/input_valid.png';
var wrapper = document.getElementById('contentWrapper');
var myScroll = new iScroll(wrapper, {
    mouseWheel: true,
    scrollbars: true
});
var phoneMask = new IMask(
    document.querySelector('.field[name="phone"]'), {
        mask: '+{7} (000) 000-00-00'
    });
CommunicateEmbedded.ready(function() {
        $('.js-back').on('touchend', function () {
        CommunicateEmbedded.navigateBackward(1);
    });
    CommunicateEmbedded.onslideflip = function(ev) {
        if (ev.direction === 'next') {
            ev.preventDefault();
            CommunicateEmbedded.nextCallPresentation();
        }
        if (ev.direction === 'prev') {
            ev.preventDefault();
        }
    }
});
CommunicateEmbedded.ready(function() {
    var emailStorage = localStorage.getItem('$$client.email') ? localStorage.getItem('$$client.email') : 0;
    var phoneStorage = localStorage.getItem('$$client.phone') ? localStorage.getItem('$$client.phone') : '';
    if (emailStorage !== 0 && emailStorage !== 'null' && emailStorage !== null && emailStorage.length !== 0 && emailStorage !== undefined && typeof emailStorage !== 'object') {
        fillFields();
    }
    function fillFields() {
        $('#email').val(emailStorage);
        $('#phone').val(phoneStorage);
        $('#agreement').attr('checked', true);
        emailCheck.call($('#email'));
        phoneCheck.call( $('#phone'));
    }
    var amountArticles1 = 'amountArticles';
    CommunicateEmbedded.onslideflip = function(ev) {
        if (ev.direction === 'next') {
            ev.preventDefault();

            $('.articles__item').each(function() {
                var $this = $(this);
                var fieldName1 = ($this.hasClass('articles__item--chosen')) ? $this.find('span').first().text() : '';
                var nameQuiz1 = 'article' + $(this).data('order');

                CommunicateEmbedded.fillQuestionary(nameQuiz1, fieldName1);
                CommunicateEmbedded.setData(nameQuiz1, fieldName1);
            });

            CommunicateEmbedded.setData(amountArticles1, $('.articles__item--chosen').length);
        }
    }

    var amountArticles = 'amountArticles',
        email = 'email',
        phone = 'phone',
        inBase = 'inBase',
        am = 0;

    var myElement = document.getElementById('slide1');

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

    // listen to events...
    mc.on("swipeleft", function(ev) {
        $('#slide1').css('top', '-800px').css('opacity', 0);
        $('.js-background').addClass('opacity');
        $('#slide2').css('top', '0px').css('opacity', 1);
    });

    $('.articles__item').on('touchend', function() {
        $(this).toggleClass('articles__item--chosen');
        if ($('.articles__item--chosen').length > 0) {
            $('.js-btn-1').addClass('btn--active');
            $('.js-btn-1').text('ПРОДОЛЖИТЬ');

        } else {
            $('.js-btn-1').removeClass('btn--active');
            $('.js-btn-1').text('ВЫБЕРИТЕ СТАТЬИ');
        }

    })

    $('.js-btn-1').on('touchend', function() {
        if ($(this).hasClass('btn--active')) {
            $(this).addClass('btn--pressed');
            $('#slide1').css('top', '-800px').css('opacity', 0);
            $('.js-background').addClass('opacity');
            $('#slide2').css('top', '0px').css('opacity', 1);
            $('.articles__item').each(function() {
                var $this = $(this);
                var fieldName = ($this.hasClass('articles__item--chosen')) ? $this.find('.js-name').text().replace(/\s{2,}/g, ' ') : '';
                if (fieldName) {
                    var nameQuiz = 'article' + $(this).data('order');
                    CommunicateEmbedded.fillQuestionary(nameQuiz, fieldName);
                    am = $('.articles__item--chosen').length + '';
                    $('.form__articles-total').text(am);
                    var title = declOfNum(am, ['публикацию', 'публикации', 'публикаций']);
                    $('.form__articles-name').text(title);
                }
            });
        }
        return false;

    });

    $('.step--2 .js-btn').on('touchend', function(ev) {
        ev.preventDefault();
        if (!$(this).hasClass('btn--active')) return;
        var emailVal = $('input[name="email"]').val();
        var phoneVal = $('input[name="phone"]').val();
        var inBaseVal = ($('#in_base').is(':checked')) ? 'зарегистрирован' : ' не зарегистрирован';
        $(this).addClass('btn--pressed');
        CommunicateEmbedded.fillQuestionary(email, emailVal);
        CommunicateEmbedded.fillQuestionary(phone, phoneVal);
        CommunicateEmbedded.fillQuestionary(inBase, inBaseVal);
        CommunicateEmbedded.setClientData({
            "phone": phoneVal,
            "email": emailVal,
            "personalInfoApproval": "true"
        });



        setTimeout(function() {
            $('.step--2 .js-btn').addClass('btn--disable').text('Отправлено');
            $('.form').addClass('form--disable');
            $('input').addClass('disable');
            $('input').attr('disabled', true);
            // $('.btn-reset').show();
        }, 200);

    });

    $('.step--3 .btn').on('touchend', function() {
        $(this).addClass('btn--pressed');
        setTimeout(function() {
            $('.step--3').removeClass('step--visible');
            $('.step--3').find('.btn').removeClass('btn--pressed');
        }, 500)
    });



    $('.btn-info-popup').on('touchend', function() {
        $('.step--3').addClass('step--visible')
    });

    $('input[name="email"]').blur(emailCheck);
    function emailCheck() {
        console.log('emailCheck');
        console.log($(this).val());
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        $(this).removeClass('field--valid field--error');
        $(this).next().removeClass('valid error');
        if ($(this).val() != '' && pattern.test($(this).val())) {
            
            $(this).addClass('field--valid');
            $(this).next().addClass('valid');
            $(this).css('color', '#007cea');
            if ($('input[type="checkbox"]:checked').length > 1 && !$('input[name="phone"]').hasClass('field--error')) {
                $('.step--2 .btn').text('Готово. Отправить!').addClass('btn--active');
            } else if (!$('input[name="phone"]').hasClass('field--valid')) {
                $('.step--2 .btn').text('Введите номер телефона');
            } else {
                $('.step--2 .btn').text('Продолжите заполнение');
            }
        } else {
            $(this).addClass('field--error');
            $(this).next().addClass('error');
            $(this).css('color', '#fe4073');
            $(this).addClass('shake');
            $('.step--2 .btn').text('Исправьте ошибки').removeClass('btn--active');
            setTimeout(() => {
                $(this).removeClass('shake');
            }, 1000)
        }
    }

    $('input[name="phone"]').blur(phoneCheck);
    function phoneCheck() {
               $(this).removeClass('field--valid field--error');
        if ($('input[name="phone"]').val().length !== 18 && $('input[name="phone"]').val().length > 0) {
            $(this).addClass('field--error');
            $(this).addClass('shake');
            $(this).css('color', '#fe4073');
            setTimeout(() => {
                $(this).removeClass('shake');
            }, 1000);
            if (!$('input[name="phone"]').hasClass('field--valid')) $('.step--2 .btn').text('Исправьте ошибки').removeClass('btn--active');;
        } else {
            $(this).addClass('field--valid');
            $(this).css('color', '#007cea');
            if ($('input[name="email"]').hasClass('field--valid') && $('input[type="checkbox"]:checked').length > 1 && $('#agreement').is(':checked')) {
                $('.step--2 .btn').text('Готово. Отправить!').addClass('btn--active');;
            } else {
                $('.step--2 .btn').text('Продолжите заполнение');
            }

        }
    }

    $('input[type="checkbox"]').change(function() {
        var thisProp = $(this).prop('checked');
        if ($(this).is(':checked') && $(this).attr('id') === 'in_base') {
            $('#out_base').prop("checked", false)
        } else if ($(this).is(':checked') && $(this).attr('id') === 'out_base') {
            $('#in_base').prop("checked", false)
        }
        if ($('input[name="email"]').hasClass('field--valid') && $('input[type="checkbox"]:checked').length > 1 && $('#agreement').is(':checked') && !$('input[name="phone"]').hasClass('field--error')) {
            $('.step--2 .btn').text('Готово. Отправить!').addClass('btn--active');
        } else {
            $('.step--2 .btn').text('Продолжите заполнение').removeClass('btn--active');
        }
    });

    function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    function resetAll() {
        $('#slide1').css('top', '0px').css('opacity', 1);
        $('#slide2').css('top', '800px').css('opacity', 0);
        $('input').attr('disabled', false);
        $('input').val('');
        $('.field').removeClass('field--valid disable field--error');
        $('.symb').removeClass('valid error');
        $('.btn').removeClass('btn--active btn--pressed btn--disable');
        $('.js-btn').text('Введите почту');
        $("input:checkbox").removeAttr("checked");
        $('.btn-reset').hide();
        $('.articles__item').removeClass('articles__item--chosen');
        $('.js-btn-1').removeClass('btn--active');
        $('.btn--3').addClass('btn--active');
    }

    // $('.btn-reset').on('touchend', resetAll);
    $('.btn-info-popup').on('touchend', function() {
        $('.step--3').removeClass('hidden');
    });
    $('.btn--3').on('touchend', function() {
        $('.step--3').addClass('hidden');
    })
});