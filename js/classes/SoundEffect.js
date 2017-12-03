var SoundEffect = function(src) {
    this.src = src;
    this.instances = [];
    this.muted = false;
}

SoundEffect.prototype.play = function() {
    var len = this.instances.length - 1;
    if(len < 25) {
        this.instances.push(new Audio(this.src));
        if(!this.muted) {
            this.instances[len + 1].volume = 1;
        } else {
            this.instances[len + 1].volume = 0;
        }
        this.instances[len + 1].play();
        // Capture the object
        var _this = this;
        // Remove instance when done
        this.instances[len + 1].onended = function() {
            _this.instances.splice(len + 1, 1);
        } 
    }

}

SoundEffect.prototype.mute = function() {
    for(var i = 0; i < this.instances.length; i++) {
        if(this.muted) {
            this.instances[i].volume = 1;    
        } else {
            this.instances[i].volume = 0;  
        }   
        console.log(this.instances[i].volume);
    }
    if(this.muted) {
        this.muted = false;
    } else {
        this.muted = true; 
    }
}
