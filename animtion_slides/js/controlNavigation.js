function controlNavigation(arg) {
    if (arg === 1) {
        CommunicateEmbedded.onslideflip = function(ev) {
            ev.preventDefault();
        }
    }
    else {
        let nav = 'slide_' + arg;
        console.log(nav);
        CommunicateEmbedded.onslideflip = function(ev) {
            if (ev.direction === 'next') {
                ev.preventDefault();
                CommunicateEmbedded.navigate(nav);
            }
        }
    }
}