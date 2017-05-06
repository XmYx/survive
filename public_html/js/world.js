world = {
    width : params.worldWidth,  //px
    height : params.worldHeight, //px  
    inhabitants : [],
    bushes :  [],
    screenJQ : null,
    init : (screenJQ) => {       
        world.screenJQ = screenJQ;
        for (var i=0; i<params.initInhabCount; i++){    
            if (params.inhabStartingLocation == 'random'){
                var x = Math.random() * world.width;
                var y = Math.random() * world.height;  
            } else if (params.inhabStartingLocation == 'central'){
                var x = world.width / 2;
                var y = world.height / 2; 
            }           
            var fenoType = genetics.createNewRandomFenotype();
            var gender = fenoType[0] === 0 ? 'male' : 'female';
            var name = world.getInitialInhabitantName(gender);
            var inh = new Inhabitant(i,x,y, Math.random()*365, 1, name.firstName, name.familyName, fenoType);            
            world.addInhab(inh);
        }
        $(".population-counter").html(world.inhabitants.length);
        var bushCount = params.bushDensity * world.width * world.height / 1000;
        for (var i=0; i<bushCount; i++){    
            var x = Math.random() * world.width;
            var y = Math.random() * world.height;              
            var bus = new Bush(i,x,y);           
            world.bushes.push(bus);
            screenJQ.append($(bus.dom));
            bus.adjustDom();
        }
        
    },
    step : () => {
        var avgLifeSpan = 0;
        for (var i=0; i<world.inhabitants.length; i++){
            var inh = world.inhabitants[i];
            inh.step();
            inh.adjustDom();
            avgLifeSpan += inh.lifeSpan / world.inhabitants.length;
            world.applyTorus(inh);
        }
        $(".avg-lifespan-bar").height(avgLifeSpan);
        for (var i=0; i<world.bushes.length; i++){
            var bus = world.bushes[i];
            bus.step();
        }
        $(".population-counter").html(world.inhabitants.length);
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
    getInhabById: (id) => {
        for (var i=0; i<world.inhabitants.length; i++){
            var inh = world.inhabitants[i];
            if (inh.id == id) return inh;
        }
        return null;
    },
    getMaxInhabId: () => {
        var ret = 0;
        for (var i=0; i<world.inhabitants.length; i++){
            var inh = world.inhabitants[i];
            if (inh.id > ret) ret = inh.id;
        }
        return ret;
    },
    addInhab: (inh) => {
        world.inhabitants.push(inh);
        world.screenJQ.append($(inh.dom));
        inh.adjustDom();
    },
    familyNameModificator : 0,
    /*unique family names*/
    getInitialInhabitantName: (gender) => {      
        this.duplicate = true;
        this.familyNameModificator = 0;
        var familyName;
        while (duplicate){
            duplicate = false;
            familyName = names.familyNames[Math.floor(Math.random()*names.familyNames.length)];        
            // check if this family name is already taken, if 
            for (var i=0; i<world.inhabitants.length; i++){
                var inhab = world.inhabitants[i];
                if (inhab.familyName == familyName) {
                    duplicate = true;
                    break;
                }
            }
        }                              
        return {
            firstName: world.getRandomFirstName(gender),
            familyName: familyName
        }
    },
    getRandomFirstName: (gender) => {
        if (gender == 'male') return names.firstNames.male[Math.floor(Math.random()*names.firstNames.male.length)];        
        else return names.firstNames.female[Math.floor(Math.random()*names.firstNames.female.length)];   
    }
    
}

