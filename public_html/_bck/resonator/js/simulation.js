simulation = {
    running : false,
    scheduler : null,
    init : (screenJQ) => {
        world.init(2000, screenJQ);
    },
    start : () => {
        this.running = true;
        this.scheduler = setInterval(function () {
            for (var i=0; i<world.inhabitants.length; i++){
                var inh = world.inhabitants[i];
                inh.step();
                inh.adjustDom();
            }
        }, 10);
    },
    stop : () => {
        clearTimeout(this.scheduler);
    }
}

