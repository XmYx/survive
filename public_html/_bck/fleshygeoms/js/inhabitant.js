function Inhabitant (id, x, y, angle) {
    this.id = id;
    this.name = "John Doe " + id;
    this.hunger = 100;
    this.x = x;
    this.y = y;
    this.speed = params.inhabSpeed;
    this.dx = this.speed * Math.cos(angle);
    this.dy = this.speed * Math.sin(angle);
    this.dom =  "<div id='inhabitant_" + id + "' class='inhabitant'></div>";
    this.log = () => {
        console.log(this);
    };
    this.step = () => {        
        this.x += this.dx;
        this.y += this.dy;
        /*this.x+= 3 * Math.random() * ((Math.random()-0.5)*2);
        this.y+= 3 * Math.random() * ((Math.random()-0.5)*2);*/
    };
    this.adjustDom = () => {
        var inhJQ = $("#inhabitant_" + this.id);
        inhJQ.css("left", Math.floor(this.x) + "px");
        inhJQ.css("top", Math.floor(this.y+40) + "px");
    };
}