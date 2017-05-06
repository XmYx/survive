world = {
    width : 600,  //px
    height : 600, //px  
    inhabitants : [],
    init : (inhabitantCount, screenJQ) => {        
        for (var i=0; i<inhabitantCount; i++){           
            //var x = Math.random() * world.width;
            //var y = Math.random() * world.height;
            var x = world.width / 2;
            var y = world.height / 2;
            console.log(x + ' ' + y);
            var inh = new Inhabitant(i,x,y,Math.random()*365);           
            world.inhabitants.push(inh);
            screenJQ.append($(inh.dom));
            inh.adjustDom();
        }
    },
    step : () => {
        for (var i=0; i<world.inhabitants.length; i++){
            var inh = world.inhabitants[i];
            inh.step();
            inh.adjustDom();
            world.applyTorus(inh);
        }
    },
    reset : () => {
        world.inhabitants = [];    
    },
    applyTorus : (inh) => {
        if (inh.x < 0) {
            inh.x += world.width;
            return;
        } 
        if (inh.x > world.width) {
            inh.x -= world.width;
            return;
        } 
        if (inh.y < 0) {
            inh.y += world.height;
            return;
        } 
        if (inh.y > world.height) {
            inh.y -= world.height;
            return;
        } 
    }, 
}

