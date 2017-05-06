function Bush (id, x, y) {
    this.id = id;
    this.nutrition = params.bushNutrition;
    this.x = x;
    this.y = y;      
    this.dom =  "<div id='bush_" + id + "' class='bush full'></div>";
    this.regrowTimer = 0;
    this.log = () => {
        console.log(this);
    };
    this.step = () => {
        if (this.regrowTimer != 0) {
            //console.log(this.regrowTimer)
            this.regrowTimer--;
            if (this.regrowTimer == 0) this.addBerries();
        }
    }
    this.removeBerries = () => {
        this.nutrition = 0;
        $("#bush_" + this.id).removeClass('full');      
        this.regrowTimer = params.bushRegrowTime;
    }
    this.addBerries = () => {
        this.regrowTimer = 0;        
        this.nutrition = params.bushNutrition;
        $("#bush_" + this.id).addClass('full');
    }
    this.adjustDom = () => {
        var inhJQ = $("#bush_" + this.id);
        inhJQ.css("left", Math.floor(this.x+10) + "px");
        inhJQ.css("top", Math.floor(this.y+40) + "px");
    };
}