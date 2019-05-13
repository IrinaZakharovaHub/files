'use strict';
CommunicateEmbedded.ready(function () {

    var region = CommunicateEmbedded.getData('region');
    var rate = CommunicateEmbedded.getData('rate');

    let koeff17 = CommunicateEmbedded.getData('koeff1-7');
    let koeff27 = CommunicateEmbedded.getData('koeff2-7');

    let koeff122 = CommunicateEmbedded.getData('koeff1-22');
    let koeff222 = CommunicateEmbedded.getData('koeff2-22');

    let koeff145 = CommunicateEmbedded.getData('koeff1-45');
    let koeff245 = CommunicateEmbedded.getData('koeff2-45');

    let koeffKs1 =  CommunicateEmbedded.getData('kstandi1');
    let koeffKs2 =  CommunicateEmbedded.getData('kstandi2');



    $('.region').text(region);
    $('.base').text(rate);
    $('.koeff17').text(koeff17);
    $('.koeff27').text(koeff27);
    $('.koeff122').text(koeff122);
    $('.koeff222').text(koeff222);
    $('.koeff145').text(koeff145);
    $('.koeff245').text(koeff245);
    $('.koeff-ks1').text(koeffKs1);
    $('.koeff-ks2').text(koeffKs2);

    function parce(str) {
        return parseFloat(str.replace(",",".").replace(/[^0-9.]/gim, ""));
    }

    console.log($('.koeff122').text());
    console.log($('.koeff222').text());

    var summ1 = Math.round(parce($('.js-base').text()) * 0.76 * parce($('.koeff17').text()) * parce($('.koeff27').text()));
    var summ2 = Math.round(parce($('.js-base').text()) * 1.51 * parce($('.koeff122').text()) * parce($('.koeff222').text()));
    var summ3 = Math.round(parce($('.js-base').text()) * 2.4 * parce($('.koeff145').text()) * parce($('.koeff245').text()));
    var summ4 = Math.round(parce($('.js-base').text()) * 20.01 * parce($('.koeff-ks1').text()) * parce($('.koeff-ks2').text()));

    $('.js-summ-1').text(summ1);
    $('.js-summ-2').text(summ2);
    $('.js-summ-3').text(summ3);
    $('.js-summ-4').text(summ4);

});
