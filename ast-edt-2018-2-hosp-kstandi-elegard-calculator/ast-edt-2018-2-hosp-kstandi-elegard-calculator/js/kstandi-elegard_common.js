// (function () {
//     CommunicateEmbedded.ready(function() {
//         var astellasFooter = new AstellasFooter({
//             json: CommunicateEmbedded.presentationContext.config,
//             isFullSizeLib: true
//         });
//     });
// })();

var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');

var triggered = false;
$('[data-fire-event]').on(clickEvent, function(){
    if ( triggered ) {
        return;
    }
    triggered = true;
    CommunicateEmbedded.fireEvent($(this).attr('data-fire-event'));
});
