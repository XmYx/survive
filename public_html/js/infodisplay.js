infoDisplay = {
    screenJQ: null,
    
    init : (screenJQ) => {
        infoDisplay.screenJQ = screenJQ;   
    },
    inhabOnDisplay : null,
    displayInhab : (inhId) => {
        infoDisplay.screenJQ.css("display", "block");
        infoDisplay.inhabOnDisplay = world.getInhabById(inhId);
        infoDisplay.updateInhabDisplay();
    },
    updateInhabDisplay() {        
        var inh = infoDisplay.inhabOnDisplay;
        if (!inh) return;
        var genderDiv = (inh.gender == "male") ? "<div class='male ico'></div>" : "<div class='female ico'></div>"
        var htmlString =
            genderDiv + 
            "<b class='name " +  inh.gender + "'>" + inh.firstName + " " + inh.familyName + "</b><br/>" +
            "<br/>" +
            "<br/>" +
            "<b>age:</b> " + worldMath.tickToYear(inh.tickCount).toFixed(2) + "<br/>" +
            "<b>generation:</b> " + inh.generation + "<br/>" +
            "<b>descendants:</b> " + (inh.descendentCounter) + "<br/>" +
            "<br/>" +
            "<b>lifespan:</b> " + inh.lifeSpan.toFixed(2) + "<br/>" +
            "<b>speed:</b> " + inh.speed.toFixed(2) + "<br/>" +
            "<b>stomach:</b> " + inh.maxFullness.toFixed(2) + "<br/>" +
            "<b>min mate age:</b> " + inh.minimumMatingAge.toFixed(2) + "<br/>" +
            "<b>bush range:</b> " + inh.minimumMatingAge.toFixed(2) + "<br/>" +
            "<br/>" +       
            "<b>fullness:</b> " + inh.fullness.toFixed(2) + "<br/>" +
            "<b>conf (" + params.inhabReproducingConfidencyTreshold + "):</b> " + (inh.reproducingConfidency) + "<br/>" +
            "<b>mating:</b> " + (inh.matingCounter) + "<br/>"
        ;
        infoDisplay.screenJQ.html(htmlString);
    }
}

