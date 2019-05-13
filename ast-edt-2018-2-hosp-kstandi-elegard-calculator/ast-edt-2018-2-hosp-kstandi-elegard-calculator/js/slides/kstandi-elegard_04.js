'use strict';
CommunicateEmbedded.ready(function () {
    $(function() {
        var e7count = CommunicateEmbedded.getData('e7count');
        var e22count = CommunicateEmbedded.getData('e22count');
        var e45count = CommunicateEmbedded.getData('e45count');
        var kcount = CommunicateEmbedded.getData('kcount');

        var totalSumm = CommunicateEmbedded.getData('totalSumm');
        var totalReturn = CommunicateEmbedded.getData('totalReturn');
        var totalBalance = CommunicateEmbedded.getData('totalBalance');

        var base = CommunicateEmbedded.getData('base');


        let koeff17 = CommunicateEmbedded.getData('koeff1-7');
        let koeff27 = CommunicateEmbedded.getData('koeff2-7');

        let koeff122 = CommunicateEmbedded.getData('koeff1-22');
        let koeff222 = CommunicateEmbedded.getData('koeff2-22');

        let koeff145 = CommunicateEmbedded.getData('koeff1-45');
        let koeff245 = CommunicateEmbedded.getData('koeff2-45');

        let koeffKs1 =  CommunicateEmbedded.getData('kstandi1');
        let koeffKs2 =  CommunicateEmbedded.getData('kstandi2');



        $('.js-e7-count').text(e7count);
        $('.js-e22-count').text(e22count);
        $('.js-e45-count').text(e45count);
        $('.js-kstandi').text(kcount);


        $('.js-summ').text(totalSumm);
        $('.js-return').text(totalReturn);
        $('.js-balance').text(totalBalance);
        function parce(str) {
            return parseFloat(str.replace(",",".").replace(/[^0-9.]/gim, ""));
        }

        var e7val = Math.round(7499.56 * +$('.js-e7-count').text());
        var e22val = Math.round(18749.85 * +$('.js-e22-count').text());
        var e45val = Math.round(28712.41 * +$('.js-e45-count').text());
        var ksval = Math.round(11314 * +$('.js-kstandi').text()) + '';

        $('.js-e7-val').text((e7val + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e22-val').text((e22val + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e45-val').text((e45val + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-ks-val').text((ksval + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

        var e7cost = Math.round(+base * +koeff17 * +koeff27 * 0.76);
        var e22cost =  Math.round(+base * +koeff122 * +koeff222 * 1.51);
        var e45cost =  Math.round(+base * +koeff145 * +koeff245 * 2.4);
        var kscost =  Math.round(+base * +koeffKs1 * +koeffKs2 * 20.01);

        $('.js-e7-cost').text((e7cost+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e22-cost').text((e22cost+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e45-cost').text((e45cost+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-ks-cost').text((kscost+ '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));

        var e7return = Math.round(+base * +koeff17 * +koeff27 * 0.76 * +e7count);
        var e22return = Math.round(+base * +koeff122 * +koeff222 * 1.51 * +e22count);
        var e45return = Math.round(+base * +koeff145 * +koeff245 * 2.4 * +e45count);
        var ksreturn = Math.round(+base * +koeffKs1 * +koeffKs2 * 20.01 * +kcount);


        $('.js-e7-return').text((e7return + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e22-return').text((e22return + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e45-return').text((e45return + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-kstandi-return').text((ksreturn + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));


        function countBal(ret, val) {
            if (ret > val) {
                return '+' + (ret - val);
            }
            else return ret - val;
        }

        $('.js-e7-bal').text(countBal(e7return, e7val) + ''.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e22-bal').text(countBal(e22return, e22val) + ''.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-e45-bal').text(countBal(e45return, e45val) + ''.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.js-ks-bal').text(countBal(ksreturn, ksval) + ''.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));


    });



});
