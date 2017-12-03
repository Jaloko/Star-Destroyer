var Light = function(x, y, colour) {
    this.light = new LE.PointLight( { x: x, y: y, colour: colour, intensity: 0.02 });
    this.currentFlicker = 0;
    this.maxFlicker = Math.random() * 30;
    this.increaseFlicker = true;
    this.flickerIncrements = Math.random() * 0.001;
    this.speed = 3;
    this.xDirToMove = 0;
    this.yDirToMove = 0;
    this.ticksToMoveFor = 0;

}

Light.prototype.addToScene = function() {
    scene.addLight(this.light);
}

Light.prototype.move = function(canvasWidth, canvasHeight) {

    if(this.ticksToMoveFor <= 0) {
        this.xDirToMove = Math.floor(Math.random() * 6);
        this.yDirToMove = Math.floor(Math.random() * 6);
        this.ticksToMoveFor = Math.floor(Math.random() * 120);
    } else {
        this.ticksToMoveFor--;
    }

    this.checkMovementDir(true, this.xDirToMove, canvasWidth, canvasHeight);
    this.checkMovementDir(false, this.yDirToMove, canvasWidth, canvasHeight);
}


Light.prototype.checkMovementDir = function(xDir, dir, canvasWidth, canvasHeight) {
    var xMove = 1 * this.speed;
    var yMove = 1 * this.speed;
    switch(dir) {
        case 1 || 2 || 3:
            if(xDir) {
                this.light.x = this.enforceBounds((this.light.x + xMove), canvasWidth);
            } else {
                this.light.y = this.enforceBounds((this.light.y + yMove), canvasHeight);
            }
            break;
        case 4 || 5 || 6:
            if(xDir) {
                this.light.x = this.enforceBounds((this.light.x - xMove), canvasWidth);
            } else {
                this.light.y = this.enforceBounds((this.light.y - yMove), canvasHeight);
            }
            break;
    }
}

Light.prototype.enforceBounds = function(pos, max) {
    if(pos <= 0) {
        return 0;
    } else if(pos >= (max)) {
        return max;
    } else {
        return pos
    }
}

Light.prototype.flicker = function() {
    if(this.increaseFlicker && this.currentFlicker >= this.maxFlicker) {
        this.increaseFlicker = false;
    } else if(!this.increaseFlicker && this.currentFlicker == 0) {
        this.increaseFlicker = true;
    }

    if(this.increaseFlicker) {
        this.light.intensity += this.flickerIncrements;
        this.currentFlicker++;
    } else {
        this.light.intensity -= this.flickerIncrements;
        this.currentFlicker--;
    }
}