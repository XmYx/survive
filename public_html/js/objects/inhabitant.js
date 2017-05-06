function Inhabitant (id, x, y, angle, generation, firstName, familyName, fenoType) {
    this.id = id;    

    // set naming
    this.firstName = firstName;
    this.familyName = familyName;
    
    // apply genetics
    this.fenoType = fenoType;
    this.gender = fenoType[0] === 0 ? 'male' : 'female';
    this.speed = fenoType[1];
    this.maxFullness = fenoType[2];
    this.lifeSpan = fenoType[3];                                                // year
    this.minimumMatingAge = fenoType[4]; 
    this.bushReachRange = fenoType[5]; 
    this.generation = generation;
    this.descendentCounter = 0;    

    // set geometry
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.dx = this.speed * geomath.getXFromAngle(angle);
    this.dy = this.speed * geomath.getYFromAngle(angle);

    // init states
    this.tickCount = 0;
    this.fullness = this.maxFullness;
    this.state = 'wandering';           // 'wandering', 'eating'
    this.eatWait = 0;               
    this.reproducingConfidency = 0;
    this.sexActive = false;
    this.matingCounter = 0;
    this.matingPartner = null;               
    
    // init dom
    this.dom = 
        "<div id='inhabitant_" + id + "' class='inhabitant " + this.gender + "' onclick='infoDisplay.displayInhab(" + id + ")'>" +
        "   <div class='body'></div>"
        "   <div class='name'>" + this.firstName.charAt(0) + ". " + this.familyName + "</div>"
        "</div>";

    console.log(this)

    
    this.log = () => {
        console.log(this);
    };
    this.step = () => {   
        this.tickCount++;
        
        // DIE of old age
        if (worldMath.tickToYear(this.tickCount) > this.lifeSpan) this.die();
        
        if (this.fullness > this.maxFullness * params.inhabReproducingConfidencyIncreaseRatio && worldMath.tickToYear(this.tickCount) >= this.minimumMatingAge) {
            this.reproducingConfidency++;
            if (this.reproducingConfidency >= params.inhabReproducingConfidencyTreshold) {      
                this.reproducingConfidency = params.inhabReproducingConfidencyTreshold;
                this.sexuallyActive(true);
            }
        } else {
            this.sexuallyActive(false);
        }
        
        if (this.state == 'wandering') {            
            this.x += this.dx;
            this.y += this.dy;            
            this.fullness -= params.inhabitantFullnessReductionPerStep;
            
            // in range of a full bush? and hungry?
            for (var i=0; i<world.bushes.length; i++){
                var b = world.bushes[i];                
                if (geomath.distance(this, b) < this.bushReachRange && this.fullness < this.maxFullness - params.bushNutrition && b.regrowTimer == 0){
                    //console.log("!!")
                    this.state = 'eating';
                    this.eatWait = b.nutrition * params.inhabitantEatTimePerNutrition;
                    this.eatBush = b;
                    return;
                }
            }
            
            // in range of an opposite sexed active inhabitand and im horny too and above minimum mating age?
            if (this.sexActive ){
                for (var i=0; i<world.inhabitants.length; i++){
                    var inh = world.inhabitants[i];
                    if (this.id == inh.id) continue; // speed optimization
                    if (geomath.distance(this, inh) < params.inhabitantMateReachRange && inh.sexActive && this.gender != inh.gender && inh.state == 'wandering'){
                        this.state = 'mating';
                        inh.state = 'mating';
                        this.matingPartner = inh;
                        inh.matingPartner = this;
                        return;
                    }
                }
            }                        
        } else if (this.state == 'eating') {      
            if (this.eatWait == 0) {
                this.fullness += this.eatBush.nutrition;
                this.eatBush.removeBerries();
                this.state = 'wandering'
                //console.log("inhabitant " + this.id + " has eaten bush " + this.eatBush.id)
            } else {
                this.eatWait--;
            }
        } else if (this.state == 'mating') {            
            this.fullness -= params.inhabitantFullnessReductionPerStep;
            this.matingCounter++;            
            if (this.matingCounter >= params.inhabitantMatingPeriod){
                this.matingCounter = 0;
                this.state = 'wandering';    
                this.sexuallyActive(false)
                this.descendentCounter++;
                if (this.gender === 'female') {
                    // GIVE BIRTH!!!!           
                    var fenoType = genetics.recombine(this.fenoType, this.matingPartner.fenoType);
                    var gender = fenoType[0] === 0 ? 'male' : 'female';
                    var newBorn = new Inhabitant(
                        world.getMaxInhabId()+1,
                        this.x,
                        this.y,
                        Math.random() * (364+0.999999),
                        this.generation+1,
                        world.getRandomFirstName(gender),
                        this.matingPartner.familyName,               // name from father
                        fenoType        
                    );
                    world.addInhab(newBorn);                  
                }                
            }
        }
        
        // DIE of starvation
        if (this.fullness <= 0) this.die();
        
    };
    
    this.sexuallyActive = (b) => {
        this.sexActive = b;
        var djq = this.getDomJQ();
        if (b) {
            djq.addClass('active')
        } else {
            djq.removeClass('active')
            this.reproducingConfidency = 0;
            
        }
    }
    
    
    this.die = () => {
        var i = world.inhabitants.indexOf(this);
        this.fullness = 0;
        this.adjustDom();
        // if (world.screenJQ.find(this.getDomJQ()).length) $("#screen").remove(this.getDomJQ());
        if (i > -1) {
            world.inhabitants.splice(i, 1);
        }           
    }
    
    this.getDomJQ = () => {
        return $("#inhabitant_" + this.id);
    }
    this.adjustDom = () => {
        var inhJQ = this.getDomJQ();
        inhJQ.css("left", Math.floor(this.x+10) + "px");
        inhJQ.css("top", Math.floor(this.y+40) + "px");
        inhJQ.css("opacity", this.fullness/100);
    };
}