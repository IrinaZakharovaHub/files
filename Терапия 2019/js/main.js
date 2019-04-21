var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');
var dragging = false;
$("body").on("touchmove", function(){
    dragging = true;
});
$("body").on("touchstart", function(){
    dragging = false;
});

(function() {
    // $(document).bind('touchmove', function(e) {
    // 	return e.preventDefault();
    // });

    CommunicateEmbedded.ready(function() {
        /*$.getJSON('structure.json', function(data) {
         var astellasFooter = new AstellasFooter({
         json: data,
         isFullSizeLib: true
         });
         });*/
        var astellasFooter = new AstellasFooter({
            json: CommunicateEmbedded.presentationContext.config,
            isFullSizeLib: true
        });
    });

    // window.storyCLMNavigation = new StoryCLMNavigation({
    // 	threshold: 200,
    // 	swipePointsCount: 2
    // });


    // /**
    //  * Обработка перехода на предыдущий слайд
    //  */
    // window.storyCLMNavigation.onSwipePrev = function(direction) {
    // 	CommunicateEmbedded.navigate(direction, 'left');
    // 	// window.location = direction;
    // };

    // /**
    //  * Обработка перехода на следующий слайд
    //  */
    // window.storyCLMNavigation.onSwipeNext = function(direction) {
    // 	CommunicateEmbedded.navigate(direction, 'right');
    // 	// window.location = direction;
    // };

    // /**
    //  * Обработка перехода назад по истории
    //  */
    // window.storyCLMNavigation.onSwipeBackward = function(count) {
    // 	CommunicateEmbedded.navigateBackward(count);
    // };

    // CommunicateEmbedded.onslideflip = function (ev) {
    // 	ev.preventDefault();
    // 	return;
    // }
}).call(this);

function tapCursors(blocks, timeout) {
    var index = 0,
        length = blocks.length;

    if (window.clearTaps) { //если кнопку уже нажали - стоп анимации
        clearInterval(cursors);
    }

    var cursors = setInterval(function() {
        $('.js-tap-ui').removeClass('show');

        var topPos = $(blocks[index]).position().top,
            leftPos = $(blocks[index]).position().left,
            halfWidth = $(blocks[index]).width() / 2,
            halfHeight = $(blocks[index]).height() / 2;

        if (window.clearTaps) { //если кнопку уже нажали - стоп анимации
            clearInterval(cursors);
        }

        $('.js-tap-ui').css({
            top: topPos + halfHeight,
            left: leftPos + halfWidth
        })

        $('.js-tap-ui').addClass('show');
        index++;

        if (index >= length) {
            clearInterval(cursors);
            setTimeout(function() {
                $('.js-tap-ui').removeClass('show');
            }, 600)
        }
    }, timeout);
};
var triggered = false;
$('[data-fire-event]').on(clickEvent, function(){
    if (dragging) return;
    if ( triggered ) {
        return;
    }
    triggered = true;
    CommunicateEmbedded.fireEvent($(this).attr('data-fire-event'));
});
