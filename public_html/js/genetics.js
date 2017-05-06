genetics = {
    createNewRandomFenotype : () => {
        return [
            Math.floor(Math.random() * 2),            // gender (0,1)            
            Math.random() * 2 + 3.0,                  // speed (2-5)
            Math.random() * 50 + 100,                 // maxFulnesss (50-150)
            Math.random() * 50 + 30,                  // lifeSpan (30-80 year)
            Math.random() * 5 + 12,                   // minimum mating age
            Math.random() * 10 + 5                    // bush reach range (5-15)
        ];                    
    },
    recombine :(dadFeno, mumFeno) => {
        var childFeno = [];
        for (var i=0; i<dadFeno.length; i++){
            if (Math.random() < 0.5){
                childFeno.push(dadFeno[i]);
            } else {
                childFeno.push(mumFeno[i]);
            }
        }
        return childFeno;
    }    
}


