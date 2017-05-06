function Inhabitant (id, x, y) {
    this.id = id;
    this.name = "John Doe " + id;
    this.hunger = 100;
    this.x = x;
    this.y = y;
    this.dom =  "<div id='inhabitant_" + id + "' class='inhabitant opaque'></div>";
    this.log = () => {
        console.log(this);
    };
    this.step = () => {        
        this.x += 4*(Math.random()-0.5)*2;
        this.y += 4*(Math.random()-0.5)*2;
        this.x += (this.x%20-10);
        this.y += (this.y%20-10);
        /*this.x+= 3 * Math.random() * ((Math.random()-0.5)*2);
        this.y+= 3 * Math.random() * ((Math.random()-0.5)*2);*/
    };
    this.adjustDom = () => {
        var inhJQ = $("#inhabitant_" + this.id);
        inhJQ.css("left", Math.floor(this.x) + "px");
        inhJQ.css("top", Math.floor(this.y+40) + "px");
    };
}