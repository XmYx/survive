simulation = {
    running : false,
    scheduler : null,
    init : (screenJQ) => {
        world.init(params.initInhabCount, screenJQ);
    },
    start : () => {
        this.running = true;
        this.scheduler = setInterval(function () {
            world.step();            
        }, 1);
    },
    stop : () => {
        clearTimeout(this.scheduler);
    }
}

