var Lights = function(canvasWidth, canvasHeight) {
    this.lights = [];
    this.colourGenerator = new LE.ColourSpectrum();
    this.canvasWidth = canvasWidth;
    this.canvasHeight =  canvasHeight;
    this.hitSound = new SoundEffect('sound/hit.wav');
    this.spawnTimer = 0;
}


Lights.prototype.generate = function(scene) {
    var lightsToSpawn = 15;
    for(var i = 0; i < lightsToSpawn; i++) {
        this.generateOne(this.canvasWidth, this.canvasHeight, scene);
    }

}

Lights.prototype.generateOne = function(scene) {
    var x = this.generatePos(this.canvasWidth);
    var y = this.generatePos(this.canvasHeight); 
    var l = new Light(x, y, this.colourGenerator.random()); 
    this.lights.push(l);
    l.addToScene(scene);
}

Lights.prototype.generatePos = function(max) {
    return this.newNumber(max);
}


Lights.prototype.newNumber = function(max) {
    var number = Math.floor(Math.random() * max);
    return number;
}


Lights.prototype.move = function() {
     for(var i = 0; i < this.lights.length; i++) {
        this.lights[i].move(this.canvasWidth, this.canvasHeight);
    }   
}

Lights.prototype.flicker = function() {
    for(var i = 0; i < this.lights.length; i++) {
        this.lights[i].flicker();
    }  
}

Lights.prototype.checkCollision = function(player, scene) {
    if(this.lights.length <= 250) {
        var lightsToRemove = [];
        var renderedLightsToRemove = [];
        var lightsToGenerate = 0;
        for(var i = 0; i < this.lights.length; i++) {
            if(player.checkCollision(this.lights[i].light)) {
                this.hitSound.play();
                lightsToRemove.push(i);
                renderedLightsToRemove.push(this.lights[i].light);
                player.addSize(scene);
                lightsToGenerate+=2;
            }
        }

        for(var i = 0; i < lightsToRemove.length; i++) {
            this.lights.splice(lightsToRemove[i],1);
            scene.removeLight(renderedLightsToRemove[i]);
        }
        
        for(var i = 0; i < lightsToGenerate; i++) {
            this.generateOne(this.canvasWidth, this.canvasHeight);
        }
    } else {
        for(var i = 0; i < this.lights.length; i++) {
            scene.removeLight(this.lights[i].light);
            this.lights.splice(i,1);  
        }
    }

}

Lights.prototype.calculateScore = function() {
    return this.lights.length;
}

Lights.prototype.spawnLight = function(scene) {
    if(new Date().getTime() > this.spawnTimer + 5000) {
        this.generateOne(scene);
        this.spawnTimer = new Date().getTime();
    }
}


Lights.prototype.mute = function() {
    this.hitSound.mute();
}
