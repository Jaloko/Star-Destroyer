var TextRenderer = function(canvas) {
    this.canvas = canvas;
    this.fr = new FontRenderer(canvas); 
    this.fr.init(); 
    this.gameOverXPos = 1000;
    this.scoreXpos = 1000;
    this.timeXpos = 1000;
    this.pressSpaceXpos = 1000;
    this.textHitSound = new SoundEffect('sound/text-hit.wav');
}

TextRenderer.prototype.reset = function() {
    this.gameOverXPos = 1000;
    this.scoreXpos = 1000;
    this.timeXpos = 1000;
    this.pressSpaceXpos = 1000;
}

TextRenderer.prototype.renderMenu = function() {
    this.fr.setFont("Verdana");
    this.fr.setFontSize(50);
    this.fr.setColour(255, 255, 255);

    this.fr.drawString("Star Destroyer", 296.5, 170, 512, 64);


    this.fr.setFontSize(32);
    this.fr.drawString("Press space to start!", 318, 420, 512, 64);
}

TextRenderer.prototype.renderGameText = function(score, time, checkScoreModifier) {
    this.fr.setFont("Verdana");
    this.fr.setFontSize(15);
    this.fr.setColour(255, 255, 255);
    this.fr.drawString("Score: " + score, 5, 33, 512, 32);
    if(checkScoreModifier == 20) {
        this.fr.setColour(0, 255, 0);  
    } else if(checkScoreModifier == 1){
        this.fr.setColour(255, 0, 0); 
    }
    this.fr.drawString("Score Modifier: x" + checkScoreModifier, 5, 53, 1024, 32);
    this.fr.setColour(255, 255, 255);
    this.fr.drawString("Time: " + time + "s", 5, 73, 512, 32);
}

TextRenderer.prototype.renderEndGameScreen = function(score, timeLasted) {
    this.fr.setFont("Verdana");
    this.fr.setFontSize(50);
    this.fr.setColour(255, 255, 255);

    this.fr.drawString("Game Over!", this.gameOverXPos, 100, 512, 64);
    this.fr.setFontSize(32);
    this.fr.drawString("Score: " + score, this.scoreXpos, 250, 512, 32);
    this.fr.drawString("Time Lasted: " + timeLasted + "s", this.timeXpos, 300, 512, 32);

    this.fr.drawString("Press space for menu!", this.pressSpaceXpos, 450, 512, 64);
}

TextRenderer.prototype.animateGameOver = function() {
    if(this.gameOverXPos > 10) {
        this.gameOverXPos -= 31;
    } else if(this.gameOverXPos < 10) {
        this.textHitSound.play();
        this.gameOverXPos = 10;
    }


    if(this.gameOverXPos == 10) {
        if(this.scoreXpos > 10) {
            this.scoreXpos -= 31;
        } else if(this.scoreXpos < 10) {
            this.textHitSound.play();
            this.scoreXpos = 10;
        }
    }

    if(this.scoreXpos == 10) {
        if(this.timeXpos > 10) {
            this.timeXpos -= 31;
        } else if(this.timeXpos < 10){
            this.textHitSound.play();
            this.timeXpos = 10;
        } 
    }


    if(this.timeXpos == 10) {
        if(this.pressSpaceXpos > 10) {
            this.pressSpaceXpos -= 31;
        } else if(this.pressSpaceXpos < 10) {
            this.textHitSound.play();
            this.pressSpaceXpos = 10;
        }  
    }

}

TextRenderer.prototype.mute = function() {
    this.textHitSound.mute();
}