world = {
    width : 800,  //px
    height : 600, //px  
    inhabitants : [],
    init : (inhabitantCount, screenJQ) => {        
        for (var i=0; i<inhabitantCount; i++){           
            //var x = Math.random() * world.width;
            //var y = Math.random() * world.height;
            var x = world.width / 2;
            var y = world.height / 2;
            console.log(x + ' ' + y);
            var inh = new Inhabitant(i,x,y);           
            world.inhabitants.push(inh);
            screenJQ.append($(inh.dom));
            inh.adjustDom();
        }
    },
    reset : () => {
        world.inhabitants = [];    
    },
}

