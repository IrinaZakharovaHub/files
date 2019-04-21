var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|Android)/i) != null;
var mdown = "mousedown";
var mmove = "mousemove";
var mup = "mouseup";

if (isMobile) {
    mdown = "touchstart";
    mmove = "touchmove";
    mup = "touchend";
}
var num = -1;
var criteria_y = 0;
var criteria_y_new = 0;

$(function() {

  //  $(document).bind('touchmove', function(e) {
 //       return e.preventDefault();
  //  });

 //   window.storyCLMNavigation = new StoryCLMNavigation({
   //     threshold: 200,
   //     swipePointsCount: 2
  //  });


    /**
     * Обработка перехода на предыдущий слайд
     */
   // window.storyCLMNavigation.onSwipePrev = function(direction) {
        //        if ($("#slider-line").length > 0 && diag_json_terapevt[0]["people"] > 0){
     //   CommunicateEmbedded.fireEvent(direction, 'left');
        //        }else{
        //            $(".alert").addClass("active");
        //        }
   // }


    /**
     * Обработка перехода на следующий слайд
     */
   // window.storyCLMNavigation.onSwipeNext = function(direction) {
        //        if ($("#slider-line").length > 0 && $("#slider").position().left > 0){
      //  CommunicateEmbedded.fireEvent(direction, 'right');
        //        }else if ($("#meds").length > 0 && $(".med.active").length > 0){
        //            CommunicateEmbedded.navigate(direction, 'right');
        //        } else if ($("#meds-count-list").length > 0)
        //           // && $("#slide-full-count span").html() == "0")
        //        {
        //            CommunicateEmbedded.navigate(direction, 'right');
        ////        }else if ($("#criteria-meds-items").length > 0){
        ////            CommunicateEmbedded.navigate(direction, 'right');
        //        }else{
        //            $(".alert").addClass("active");
        //        }
   // }

    /**
     * Обработка перехода назад по истории
     */
   // window.storyCLMNavigation.onSwipeBackward = function(count) {
   //     CommunicateEmbedded.navigateBackward(count);
   // }


    CommunicateEmbedded.ready(function() {
        var astellasFooter = new AstellasFooter({
            json: CommunicateEmbedded.presentationContext.config,
            isFullSizeLib: true
        });

        $(".alert__ok").click(function() {
            $(".alert").removeClass("active");
        });


        if ($("#slider-line").length > 0) {

            //diag_json_terapevt_test = JSON.parse(CommunicateEmbedded.getData('diag_json_terapevt'));
            try {
                if (CommunicateEmbedded.getData('diag_json_terapevt') != undefined) {
                    diag_json_terapevt = JSON.parse(CommunicateEmbedded.getData('diag_json_terapevt'));
                    $("#big-count-circ span").html(diag_json_terapevt[0]["people"]);
                    $("#slider-progress").width(diag_json_terapevt[0]["people"] * 585 / 150);
                    $("#slider").css({
                        "left": diag_json_terapevt[0]["people"] * 585 / 150
                    });
                }
            } catch (e) {

            }

            var press = false;
            $("#slider-line").on(mdown, function(e) {
                press = true;
            });
            $("#slider-line").on(mmove, function(e) {
                if (press) {
                    pagex = e.pageX;
                    if (isMobile) {
                        pagex = e.originalEvent.touches[0].pageX;
                    }

                    pos_x = pagex - $("#slider-line").offset().left - 10;

                    num = Math.round((pos_x / 585) * 150);

                    if (num > 150) {
                        num = 150;
                    } else if (num < 0) {
                        num = 0;
                    }

                    $("#slider-progress").width(num * 585 / 150);
                    $("#slider").css({
                        "left": num * 585 / 150
                    });
                    $("#big-count-circ span").html(num);
                }
            });
            $("body").on(mup, function(e) {
                press = false;
                if (num >= 0) {
                    diag_json_terapevt[0]["people"] = num;
                    try {
                        for (var i = 0; i < diag_json_terapevt[0]["medications"].length; i++) {
                            diag_json_terapevt[0]["medications"][i]["select"] = false;
                            diag_json_terapevt[0]["medications"][i]["people"] = 0;
                        }
                    } catch (ex) {}
                }
                CommunicateEmbedded.setData('diag_json_terapevt', JSON.stringify(diag_json_terapevt));
            });
        }

        $("#big-count-right").on(mup, function() {
            var new_count = $("#big-count-circ span").html() * 1;
            new_count++;
            if (new_count > 150) {
                new_count = 150;
            }
            $("#big-count-circ span").html(new_count);
            $("#slider-progress").width(new_count * 585 / 150);
            $("#slider").css({
                "left": new_count * 585 / 150
            });
            diag_json_terapevt[0]["people"] = new_count;
            CommunicateEmbedded.setData('diag_json_terapevt', JSON.stringify(diag_json_terapevt));
        });
        $("#big-count-left").on(mup, function() {
            var new_count = $("#big-count-circ span").html() * 1;
            new_count--;
            if (new_count < 0) {
                new_count = 0;
            }
            $("#big-count-circ span").html(new_count);
            $("#slider-progress").width(new_count * 585 / 150);
            $("#slider").css({
                "left": new_count * 585 / 150
            });
            diag_json_terapevt[0]["people"] = new_count;
            CommunicateEmbedded.setData('diag_json_terapevt', JSON.stringify(diag_json_terapevt));
        });


        if ($("#meds").length > 0) {
            diag_json_terapevt = JSON.parse(CommunicateEmbedded.getData('diag_json_terapevt'));

            for (i = 0; i < diag_json_terapevt[0]["medications"].length; i++) {
                act = "";
                if (diag_json_terapevt[0]["medications"][i]["select"]) {
                    act = "active";
                }
                $("#view").append('<div class="med ' + act + '"><div class="middle"></div><span>' + diag_json_terapevt[0]["medications"][i]["title"] + '</span></div>');
            }
            $("#view").append('<div class="minus-margin"></div>');
            $("#meds").removeClass("scroll");
            if ($("#view .med").length > 10) {
                $("#meds").addClass("scroll");
            }

            var vt = 0;
            $(".med").on(mdown, function() {
                vt = $("#view").offset().top;
            });
            $(".med").on(mup, function() {
                if (vt == $("#view").offset().top) {
                    if (!$(this).hasClass("active")) {
                        $(this).addClass("active");
                        diag_json_terapevt[0]["medications"][$(this).index()]["select"] = true;
                    } else {
                        $(this).removeClass("active");
                        diag_json_terapevt[0]["medications"][$(this).index()]["select"] = false;
                    }

                    try {
                        for (var i = 0; i < diag_json_terapevt[0]["medications"].length; i++) {
                            diag_json_terapevt[0]["medications"][i]["people"] = 0;
                            console.log(diag_json_terapevt[0]["medications"][i]["people"]);
                        }
                    } catch (ex) {}

                    CommunicateEmbedded.setData('diag_json_terapevt', JSON.stringify(diag_json_terapevt));
                }
            });
            /*if ($("#view").height() > 600){
                useScroll(document.getElementById("view"), 600);
            }*/

            $("#meds-arrow").on(mup, function() {
                if ($(this).hasClass("rotate")) {
                    $(this).removeClass("rotate");
                    $("#view").stop().animate({
                        "top": 0
                    });
                } else {
                    $(this).addClass("rotate");
                    $("#view").stop().animate({
                        "top": 600 - $("#view").height()
                    });
                }
            });
        }


        if ($("#meds-count-list").length > 0) {
            diag_json_terapevt = JSON.parse(CommunicateEmbedded.getData('diag_json_terapevt'));
            var cnt = diag_json_terapevt[0]["people"] * 1;
            for (i = 0; i < diag_json_terapevt[0]["medications"].length; i++) {
                if (diag_json_terapevt[0]["medications"][i]["select"]) {
                    sel = "";
                    if (diag_json_terapevt[0]["medications"][i]["people"] * 1 > 0) {
                        sel = "select";
                    }
                    cnt -= diag_json_terapevt[0]["medications"][i]["people"] * 1;
                    $("#meds-count-list").append('<div class="med-count ' + sel + '" item-index="' + i + '"><div class="med-count-number">' + diag_json_terapevt[0]["medications"][i]["people"] + '</div><span>' + diag_json_terapevt[0]["medications"][i]["title"] + '</span></div>');
                }
            }


            $("#slide-full-count").html('Осталось: <span>' + cnt + '</span> из ' + diag_json_terapevt[0]["people"]);

            for (i = 0; i <= diag_json_terapevt[0]["people"] * 1; i++) {
                $("#count-list-items").append('<span>' + i + '</span>');
            }
            var full = diag_json_terapevt[0]["people"] * 1;

            $("#count-white").click(function() {
                $(".med-count").removeClass("open");
                $("#meds-count").removeClass("open");
                $("#count-list").removeClass("open");
                var sum = 0;
                for (var i = 0; i < $(".med-count").length; i++) {
                    sum += $(".med-count").eq(i).find(".med-count-number").html() * 1;
                }
                $("#slide-full-count span").html(full - sum);
                var str = "";
                for (var i = 0; i < full - sum + 1; i++) {
                    str += "<span>" + i + "</span>";
                }
                $("#count-list-items").html(str);
            });
            var vt = 0;
            $(".med-count").on(mdown, function() {
                vt = $("#meds-count-list").offset().top;
            });
            var vt1 = 0;
            $("#count-list-items").on(mdown, function() {
                vt1 = $("#count-list-items").offset().top;
            });
            $(".med-count").on(mup, function() {
                if (vt == $("#meds-count-list").offset().top) {
                    if (!$(this).hasClass("open")) {
                        if ($(this).find(".med-count-number").html() * 1 > 0) {
                            var str = "";
                            var cnt = $("#slide-full-count span").html() * 1 + 1 + $(this).find(".med-count-number").html() * 1;
                            for (var i = 0; i < cnt; i++) {
                                act1 = "";
                                if ($(this).find(".med-count-number").html() == i) {
                                    act1 = "active";
                                }
                                str += "<span class='" + act1 + "'>" + i + "</span>";
                            }
                            $("#count-list-items").html(str);
                        }
                        $(this).addClass("open");
                        $("#meds-count").addClass("open");
                        $("#count-list").addClass("open");
                        var topp = $(this).offset().top - $(".container").offset().top - $("#count-list").height() / 2 + 48;
                        if (topp + $("#count-list").height() > 730) {
                            topp = 730 - $("#count-list").height();
                        }
                        if (topp < 95) {
                            topp = 95;
                        }
                        $("count-list-items").css({
                            "-webkit-transform": "translateY(0px)"
                        });
                        $("#count-list").css({
                            "left": $(this).position().left + 65,
                            "top": topp
                        });
                        //                    if ($("#count-list-items span").length > 8){
                        useScroll(document.getElementById("count-list-items"), $("#count-list").height());
                        //                    }
                        $("#count-list-items span").on(mup, function() {
                            if (vt1 == $("#count-list-items").offset().top) {
                                $(".med-count.open .med-count-number").html($(this).html());
                                ind = $(".med-count.open").attr("item-index");
                                diag_json_terapevt[0]["medications"][ind]["people"] = $(this).html() * 1;
                                CommunicateEmbedded.setData('diag_json_terapevt', JSON.stringify(diag_json_terapevt));

                                if ($(this).html() != 0) {
                                    $(".med-count.open").addClass("select");
                                } else {
                                    $(".med-count.open").removeClass("select");
                                }
                                $("#count-white").click();
                            }
                        });
                    }
                }
            });



            if ($("#meds-count-list").height() > 500) {
                useScroll(document.getElementById("meds-count-list"), 500);
            }
        }



        if ($("#criteria-meds-items").length > 0) {
            diag_json_terapevt = JSON.parse(CommunicateEmbedded.getData('diag_json_terapevt'));
            var first_iter = true;
            $("#criteria-chb-items-list").html("");
            for (i = 0; i < diag_json_terapevt[0]["medications"].length; i++) {
                if (diag_json_terapevt[0]["medications"][i]["select"]) {
                    sel = "";
                    for (var j = 0; j < diag_json_terapevt[0]["medications"][i]["criteria"].length; j++) {
                        act = "";
                        if (diag_json_terapevt[0]["medications"][i]["criteria"][j]["select"]) {
                            sel = "select";
                            act = "active";
                        }
                        if (first_iter) {
                            $("#criteria-chb-items-list").append('<div class="criteria-item ' + act + '"><div class="criteria-item-g"></div><span>' + diag_json_terapevt[0]["medications"][i]["criteria"][j]["title"] + '</span><div class="criteria-item-arrow"></div></div>');
                        }
                    }
                    $("#criteria-meds-items-list").append('<div class="criteria-med ' + sel + '" item-index="' + i + '"><div class="middle"></div><span>' + diag_json_terapevt[0]["medications"][i]["title"] + '</span></div>');
                    first_iter = false;
                }
            }
            $(".criteria-med").eq(0).addClass("active");

            var vt = 0;
            $(".criteria-med").on(mdown, function() {
                vt = $("#criteria-meds-items-list").offset().top;
            });
            $(".criteria-med").on(mup, function() {
                if (vt == $("#criteria-meds-items-list").offset().top) {
                    if (!$(this).hasClass("active")) {
                        $(".criteria-med").removeClass("active");
                        $(this).addClass("active");
                        if ($(this).offset().top < $("#criteria-meds-items").offset().top) {
                            st = $(this).offset().top - $("#criteria-meds-items").offset().top;
                            tp = $("#criteria-meds-items").offset().top - $("#criteria-meds-items-list").offset().top;
                            $("#criteria-meds-items-list").css({
                                "-webkit-transform": "translateY(" + (-tp - st) + "px)"
                            });
                        }
                        $("#criteria-items-arrow").css({
                            "top": $(this).offset().top - $("#criteria-meds-items").offset().top + 60
                        });
                        $("#criteria-chb-items-list").html('');
                        for (var j = 0; j < diag_json_terapevt[0]["medications"][$(this).attr("item-index")]["criteria"].length; j++) {
                            act = "";
                            if (diag_json_terapevt[0]["medications"][$(this).attr("item-index")]["criteria"][j]["select"]) {
                                act = "active";
                            }
                            $("#criteria-chb-items-list").append('<div class="criteria-item ' + act + '"><div class="criteria-item-g"></div><span>' + diag_json_terapevt[0]["medications"][$(this).attr("item-index")]["criteria"][j]["title"] + '</span><div class="criteria-item-arrow"></div></div>');
                        }
                        criteriaButtons();
                    }
                }
            });
            $("#criteria-meds").removeClass("scroll");
            if ($("#criteria-meds-items-list").height() > 465) {
                $("#criteria-meds").addClass("scroll");
                useScroll(document.getElementById("criteria-meds-items-list"), 465);
            }
            criteriaButtons();

            function criteriaButtons() {
                var vt1 = 0;
                $(".criteria-item-g").on(mdown, function(e) {
                    e.stopPropagation();
                    vt1 = $("#criteria-chb-items-list").offset().top;
                });
                $(".criteria-item-g").on(mup, function(e) {
                    e.stopPropagation();
                    if (vt1 == $("#criteria-chb-items-list").offset().top) {
                        if (!$(this).parent().hasClass("active")) {
                            $(this).parent().addClass("active");
                            diag_json_terapevt[0]["medications"][$(".criteria-med.active").attr("item-index")]["criteria"][$(this).parent().index()]["select"] = true;
                            $(".criteria-med.active").addClass("select");
                        } else {
                            diag_json_terapevt[0]["medications"][$(".criteria-med.active").attr("item-index")]["criteria"][$(this).parent().index()]["select"] = false;
                            $(this).parent().removeClass("active");
                            if ($(".criteria-item.active").length == 0) {
                                $(".criteria-med.active").removeClass("select");
                            }
                        }
                        CommunicateEmbedded.setData('diag_json_terapevt', JSON.stringify(diag_json_terapevt));
                    }
                });
                $("#criteria-items").removeClass("scroll");
                if ($("#criteria-chb-items-list").height() > 465) {
                    $("#criteria-items").addClass("scroll");
                    useScroll(document.getElementById("criteria-chb-items-list"), 465);
                }
                var triggered = false;
                
                $(".criteria-item-arrow")
                .on('touchstart', function () {
                    $(this).attr('data-moved', '0');
                })
                .on('touchmove', function () {
                    $(this).attr('data-moved', '1');
                })
                .on('touchend', function () {
                    if($(this).attr('data-moved') == 0){
                        if ( triggered ) {
                            return;
                        }
                        triggered = true;

                        var criteriaName = $(this).siblings('span').html();
                        //                    if ($(".criteria-med.select").length > 0)
                        //                    {
                        if ($(".criteria-med.active span").html() == "ВОЗ") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('56', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Флемоксин Солютаб") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('01', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Флемоклав Солютаб") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('14', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Супракс Солютаб") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('24', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Вильпрафен Солютаб") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('39', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "ИМП") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('suprax_imp_01.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Фторхинолоны") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('82', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Спектрацеф") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('80', 'right');
                            }
                        }

                        else if ($(".criteria-med.active span").html() == "Амоксициллин не брендированный") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('Flemoxin_09-1.html', 'right');
                                // window.location = 'pediatrist_15-1.html';
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                CommunicateEmbedded.fireEvent('Flemoxin_09-2.html', 'right');
                            } else if (criteriaName == "Следование стандартам") {
                                CommunicateEmbedded.fireEvent('pediatrist_16-1.html', 'right');
                            } else if (criteriaName == "Низкая частота нежелательных реакций со стороны ЖКТ") {
                                CommunicateEmbedded.fireEvent('pediatrist_04-4.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Амоксиклав/Аугментин") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_20-1.html', 'right');
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                CommunicateEmbedded.fireEvent('pediatrist_20-1.html', 'right');
                            } else if (criteriaName == "Риск неэффективности эмпирической терапии") {
                                CommunicateEmbedded.fireEvent('pediatrist_20-2.html', 'right');
                            } else if (criteriaName == "Следование стандартам") {
                                //как спектр действия
                                //CommunicateEmbedded.navigate('pediatrist_20-2.html', 'right');
                                CommunicateEmbedded.fireEvent('pediatrist_20-1.html', 'right');
                            } else if (criteriaName == "Активность в отношении измененной флоры (у курильщиков)") {
                                CommunicateEmbedded.fireEvent('Suprax_30-1.html', 'right');
                            } else if (criteriaName == "Низкая частота рецидивов обострений ХОБЛ") {
                                CommunicateEmbedded.fireEvent('Suprax_30-5.html', 'right');
                            } else if (criteriaName == "Низкая частота нежелательных реакций со стороны ЖКТ") {
                                CommunicateEmbedded.fireEvent('pediatrist_20-5.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Сумамед (Азитромицин)") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-1.html', 'right');
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                //Терапевты: Сумамед: Эффективность. Ветка "высокая концентрация" должна быть такая же как ветка "Спектр действия"
                                //CommunicateEmbedded.navigate('pediatrist_09-11.html', 'right');
                                CommunicateEmbedded.fireEvent('pediatrist_03-1.html', 'right');
                            } else if (criteriaName == "Риск неэффективности эмпирической терапии") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-1.html', 'right');
                            } else if (criteriaName == "Следование стандартам") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-1.html', 'right');
                            } else if (criteriaName == "Активность в отношении измененной флоры (у курильщиков)") {
                                CommunicateEmbedded.fireEvent('Suprax_30-2.html', 'right');
                            } else if (criteriaName == "Низкая частота рецидивов обострений ХОБЛ") {
                                CommunicateEmbedded.fireEvent('Suprax_30-6.html', 'right');
                            } else if (criteriaName == "Низкая частота нежелательных реакций со стороны ЖКТ") {
                                CommunicateEmbedded.fireEvent('Wilprafen_12-1.html', 'right');
                            } else if (criteriaName == "Другие нежелательные явления") {
                                CommunicateEmbedded.fireEvent('Wilprafen_11.html', 'right');
                            } else if (criteriaName == "Удобство приема") {
                                CommunicateEmbedded.fireEvent('Suprax_18-4.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Клацид (Кларитромицин)") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-2.html', 'right');
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                CommunicateEmbedded.fireEvent('pediatrist_09-12.html', 'right');
                            } else if (criteriaName == "Риск неэффективности эмпирической терапии") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-2.html', 'right');
                            } else if (criteriaName == "Следование стандартам") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-2.html', 'right');
                            } else if (criteriaName == "Активность в отношении измененной флоры (у курильщиков)") {
                                CommunicateEmbedded.fireEvent('Suprax_30-3.html', 'right');
                            } else if (criteriaName == "Низкая частота рецидивов обострений ХОБЛ") {
                                CommunicateEmbedded.fireEvent('Suprax_30-7.html', 'right');
                            } else if (criteriaName == "Низкая частота нежелательных реакций со стороны ЖКТ") {
                                CommunicateEmbedded.fireEvent('Wilprafen_12-2.html', 'right');
                            } else if (criteriaName == "Другие нежелательные явления") {
                                CommunicateEmbedded.fireEvent('Wilprafen_14.html', 'right');
                            } else if (criteriaName == "Удобство приема") {
                                CommunicateEmbedded.fireEvent('Suprax_18-5.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Фторхинолоны") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-3.html', 'right');
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-4.html', 'right');
                            } else if (criteriaName == "Риск неэффективности эмпирической терапии") {
                                CommunicateEmbedded.fireEvent('pediatrist_03-3.html', 'right');
                            } else if (criteriaName == "Активность в отношении измененной флоры (у курильщиков)") {
                                CommunicateEmbedded.fireEvent('Suprax_30-4.html', 'right');
                            } else if (criteriaName == "Низкая частота рецидивов обострений ХОБЛ") {
                                CommunicateEmbedded.fireEvent('Suprax_30-8.html', 'right');
                            } else if (criteriaName == "Удобство приема") {
                                CommunicateEmbedded.fireEvent('Suprax_18-3.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Зиннат (Цефуроксим)") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_09-7.html', 'right');
                            } else if (criteriaName == "Риск неэффективности эмпирической терапии") {
                                CommunicateEmbedded.fireEvent('pediatrist_09-7.html', 'right');
                            } else if (criteriaName == "Низкая частота нежелательных реакций со стороны ЖКТ") {
                                CommunicateEmbedded.fireEvent('Suprax_13-2.html', 'right');
                            } else if (criteriaName == "Удобство приема") {
                                CommunicateEmbedded.fireEvent('Suprax_18-2.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Цедекс (Цефтибутен)") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_09-8.html', 'right');
                            } else if (criteriaName == "Риск неэффективности эмпирической терапии") {
                                CommunicateEmbedded.fireEvent('pediatrist_09-8.html', 'right');
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                CommunicateEmbedded.fireEvent('pediatrist_09-8.html', 'right');
                            } else if (criteriaName == "Удобство приема") {
                                CommunicateEmbedded.fireEvent('Suprax_18-1.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Цефтриаксон") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('Suprax_12-1.html', 'right');
                            } else if (criteriaName == "Высокая концентрация в очаге инфекции") {
                                CommunicateEmbedded.fireEvent('Suprax_12-2.html', 'right');
                            } else if (criteriaName == "Следование стандартам") {
                                CommunicateEmbedded.fireEvent('Suprax_35.html', 'right');
                            } else if (criteriaName == "Удобство приема") {
                                CommunicateEmbedded.fireEvent('Suprax_36-3.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Амписид (Ампициллин + Сульбактам)") {

                            if (criteriaName == "Спектр действия") {
                                CommunicateEmbedded.fireEvent('pediatrist_20-3.html', 'right');
                            } else if (criteriaName == "Другие нежелательные эффекты") {
                                CommunicateEmbedded.fireEvent('pediatrist_20-4.html', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Спектрацеф") {

                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('Breffi_Astelas_1.html', 'right');
                            }
                        }else if ($(".criteria-med.active span").html() == "Циститы") {

                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('slide__25', 'right');
                            }
                        } else if ($(".criteria-med.active span").html() == "Рекомендации 2016") {
                            if (criteriaName == "Продолжить") {
                                CommunicateEmbedded.fireEvent('recommendation_01.html', 'right');
                            }
                        }
                        //                    }
                        //                    else
                        //                    {
                        //                        $(".alert").addClass("active");
                        //                    }
                    }
                });
            }
        }
    });
});



function useScroll(element, hh) {
    var view, indicator, relative,
        min, max, offset, reference, pressed, xform,
        velocity, frame, timestamp, ticker,
        amplitude, target, timeConstant;

    function ypos(e) {
        // touch event
        if (e.targetTouches && (e.targetTouches.length >= 1)) {
            return e.targetTouches[0].clientY;
        }

        // mouse event
        return e.clientY;
    }

    function scroll(y) {
        offset = (y > max) ? max : (y < min) ? min : y;
        view.style[xform] = 'translateY(' + (-offset) + 'px)';
        indicator.style[xform] = 'translateY(' + (offset * relative) + 'px)';
    }

    function track() {
        var now, elapsed, delta, v;

        now = Date.now();
        elapsed = now - timestamp;
        timestamp = now;
        delta = offset - frame;
        frame = offset;

        v = 1000 * delta / (1 + elapsed);
        velocity = 0.8 * v + 0.2 * velocity;
    }

    function autoScroll() {
        var elapsed, delta;

        if (amplitude) {
            elapsed = Date.now() - timestamp;
            delta = -amplitude * Math.exp(-elapsed / timeConstant);
            if (delta > 0.5 || delta < -0.5) {
                scroll(target + delta);
                requestAnimationFrame(autoScroll);
            } else {
                scroll(target);
            }
        }
    }

    function tap(e) {
        pressed = true;
        reference = ypos(e);

        velocity = amplitude = 0;
        frame = offset;
        timestamp = Date.now();
        clearInterval(ticker);
        ticker = setInterval(track, 100);

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function drag(e) {
        var y, delta;
        if (pressed) {
            y = ypos(e);
            delta = reference - y;
            if (delta > 2 || delta < -2) {
                reference = y;
                scroll(offset + delta);
            }
        }
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function release(e) {
        pressed = false;

        clearInterval(ticker);
        if (velocity > 10 || velocity < -10) {
            amplitude = 0.8 * velocity;
            target = Math.round(offset + amplitude);
            timestamp = Date.now();
            requestAnimationFrame(autoScroll);
        }

        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    view = element;
    if (typeof window.ontouchstart !== 'undefined') {
        view.addEventListener('touchstart', tap);
        view.addEventListener('touchmove', drag);
        view.addEventListener('touchend', release);
    }
    view.addEventListener('mousedown', tap);
    view.addEventListener('mousemove', drag);
    view.addEventListener('mouseup', release);

    max = parseInt(getComputedStyle(view).height, 10) - hh;
    offset = min = 0;
    pressed = false;
    timeConstant = 325; // ms

    indicator = document.getElementById('indicator');
    relative = (hh - 30) / max;

    xform = 'transform';
    ['webkit', 'Moz', 'O', 'ms'].every(function(prefix) {
        var e = prefix + 'Transform';
        if (typeof view.style[e] !== 'undefined') {
            xform = e;
            return false;
        }
        return true;
    });
    view.style[xform] = 'translateY(0px)';
    indicator.style[xform] = 'translateY(0px)';
};