simulation = {
    running : false,
    scheduler : null,
    tick: 0,    
    init : (screenJQ) => {
        this.tick = 0;
        world.init(screenJQ);
        $(".tick-counter").html(simulation.tick);
    },
    step : () => {
        simulation.tick++;
        world.step(); 
        infoDisplay.updateInhabDisplay();
        $(".tick-counter").html(worldMath.tickToYear(simulation.tick).toFixed(0));
    },
    start : () => {
        this.stop();
        simulation.running = true;
        simulation.scheduler = setInterval(function () {
            simulation.step();
        }, params.schedulerSleepTime);
    },
    fastStart : () => {
        this.stop();
        simulation.running = true;
        simulation.scheduler = setInterval(function () {
            simulation.step();
        }, params.schedulerFastSleepTime);
    },
    stop : () => {
        simulation.running = false;
        clearTimeout(simulation.scheduler);
    }
}

