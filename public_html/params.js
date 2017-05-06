params = {       
    schedulerSleepTime: 40,                             // ms 
    schedulerFastSleepTime: 1,                          // ms 
    
    worldWidth : 340,
    worldHeight: 250,
    initInhabCount: 22,
    bushDensity: 0.3,                                   // qty / kiloPixel
    
    inhabStartingLocation: 'random',                    // 'central', 'random'
    inhabitantFullnessReductionPerStep: 0.05,
    //inhabitantBushReachRange: 10,                     // px                   --> moved to genetics        
    inhabitantMateReachRange: 10,
    inhabitantEatTimePerNutrition: 2,                   // steps
    inhabitantMatingPeriod: 600,                        // steps        
    // inhabSpeed: 2,                                   // px/step              --> moved to genetics        
    // inhabitantMaxFullness: 100,                      // nutrition            --> moved to genetics
    
    inhabReproducingConfidencyIncreaseRatio: 0.6,
    inhabReproducingConfidencyTreshold: 1000,           // consequent turns
    
    
    bushRegrowTime: 500,                                // step
    bushNutrition: 45,                                  // nutrition    
}
