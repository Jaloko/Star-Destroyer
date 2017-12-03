var Player =  function(x, y, width, height) {
    this.light = new LE.PointLight( { x: x, y: y, colour: new LE.Colour(0, 255, 255, 255), intensity: 0.001 });
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.hitBox = new LE.Polygon( { 
        x: x - (width/2), 
        y: y - (height/2), 
        vertices: LE.Vertices.regularPolygon(width, 8),
        colour: new LE.Colour(0, 0, 0, 255)
    } );
    this.speed = 3;
}

Player.prototype.addToScene = function(scene) {
    //scene.addLight(this.light);
    scene.addShadowObject(this.hitBox);
}

// Make sure the inputs.js file is defined before this method is called
Player.prototype.checkInputs = function(canvasWidth, canvasHeight) {
    
    var move = (1 * this.speed);
    if(keys['W'] == true) {
        this.changeY(move,canvasWidth, canvasHeight);
    }
    if(keys['S'] == true) {
        this.changeY(-move,canvasWidth, canvasHeight);
    }
    if(keys['A'] == true) {
        this.changeX(-move,canvasWidth, canvasHeight);
    }
    if(keys['D'] == true) {
        this.changeX(move,canvasWidth, canvasHeight);
    }
}

Player.prototype.changeX = function(amount, canvasWidth, canvasHeight) {
    if(LE.Utilities.checkScreenBounds(0, 0, canvasWidth, canvasHeight, 0, 0, this.light.x + amount, this.light.y)) {
        this.light.x += amount;
        this.hitBox.x += amount;
    }
}

Player.prototype.changeY = function(amount, canvasWidth, canvasHeight) {
    if(LE.Utilities.checkScreenBounds(0, 0, canvasWidth, canvasHeight, 0, 0, this.light.x, this.light.y + amount)) {
        this.light.y += amount;
        this.hitBox.y += amount;
    }
}

Player.prototype.checkIfOnEdge = function(canvasWidth, canvasHeight) {
   if(LE.Utilities.checkScreenBounds((canvasWidth / 8) * 3, (canvasHeight / 8) * 3, (canvasWidth / 8) * 2, (canvasHeight / 8) * 2, 0, 0, this.light.x, this.light.y)) {
        return 20;
   } else if(LE.Utilities.checkScreenBounds(0, 0, canvasWidth, canvasHeight, -(this.width / 2),-(this.height / 2), this.light.x, this.light.y)) {
        return 10;
   } else {
        return 1;
   }
}

Player.prototype.checkCollision = function(light) {
    if(LE.Utilities.checkPointCollision(light.x, light.y, this.hitBox)) {
        return true;
    } else {
        return false;
    }
}


Player.prototype.rotate = function() {
    this.rotation = this.rotation >= 360 ? 0 : this.rotation +=5;
    this.hitBox.rotation = this.rotation;
}

Player.prototype.addSize = function(scene) {
    this.light.intensity += 0.01;
    this.width += 6;
    this.height += 6;
    this.hitBoxFaces += 2;
    // Lighting engine does not support changing polygon size once it has been added
    // So we have to completely remove the old hitbox and add another.
    scene.removeShadowObject(this.hitBox);
    this.hitBox = new LE.Polygon( { 
        x: this.light.x - (this.width/2), 
        y: this.light.y - (this.height/2), 
        vertices: LE.Vertices.regularPolygon(this.width, 8),
        colour: new LE.Colour(0, 0, 0, 255)
    } );
    scene.addShadowObject(this.hitBox);
}

Player.prototype.checkEndCondition = function(canvasWidth, canvasHeight) {
    if(this.width >= canvasWidth || this.height >= this.canvasHeight) {
        return true;
    } else {
        return false;
    }
}