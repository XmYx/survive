geomath = {
    distance : (obj1, obj2) => {
        return (
            Math.sqrt(
                (obj1.x - obj2.x) * (obj1.x - obj2.x) +
                (obj1.y - obj2.y) * (obj1.y - obj2.y)
            )
        )
    },
    getXFromAngle : (angle) => {
        return Math.cos(angle)
    },
    getYFromAngle : (angle) => {
        return Math.sin(angle)
    }    
}

worldMath = {
    tickToYear : (tick) => {
        return tick / 200;
    }
}

