var canvas, scene, renderer;

var tr;

var player;
var lights;

var gameState = 0;
var score = 0;
var startTime;
var timeLasted;


function init() {
    prepareRenderer();
    prepareMenu();

    // Start the loop
    update();
}

function prepareMenu() {
    tr = new TextRenderer(canvas);
    // Need to ensure sounds are available
    lights = new Lights(canvas.width, canvas.height);
}

function prepareRenderer() {
    // Get html canvas element
    canvas = document.getElementById("canvas");
    // Initialise the scene
    scene = new LE.Scene();
    // Finally initialise the renderer with the canvas and scene
    renderer = new LE.WebGLRenderer( { canvas: canvas, scene: scene } );
}

function startGame() {
    startTime = new Date().getTime();
    score = 0;

    renderer.scene.lights = [];
    renderer.scene.shadowObjects = [];
    renderer.scene.objects = [];
    player = new Player(canvas.width /2, canvas.height / 2, 35, 35);
    player.addToScene(scene);

    lights = new Lights(canvas.width, canvas.height);
    lights.generate(scene);
}

function update() {
    render();

    // Game running game state
    if(gameState == 1) {
        if(!player.checkEndCondition(canvas.width, canvas.height)) {
            player.checkInputs(canvas.width, canvas.height);
            player.rotate();
            lights.spawnLight(scene);
            lights.move();
            lights.flicker();
            lights.checkCollision(player, scene);
            score += Math.floor(lights.calculateScore() * player.checkIfOnEdge(canvas.width, canvas.height));

        } else {
            tr.reset();
            timeLasted = Math.round(((new Date().getTime() - startTime) / 1000) * 100) / 100
            render.scene = new LE.Scene();
            gameState = 2;
        }
    } else if(gameState == 2) {
        tr.animateGameOver();
    }


    requestAnimationFrame(update);
}

function render() {
    renderer.clear();

    if(gameState == 0) {
        tr.renderMenu();
    } else if(gameState == 1) {
        renderer.render();
        tr.renderGameText(score, Math.round(((new Date().getTime() - startTime) / 1000) * 100) / 100, player.checkIfOnEdge(canvas.width, canvas.height));
    } else if(gameState == 2) {
        tr.renderEndGameScreen(score, timeLasted);
    }
}




var spacePressedSound = new SoundEffect('sound/space-pressed.wav');
document.addEventListener('keypress', function(event) {

    var kc = event.which || event.keyCode;
    if(kc == 32) {      
        // Menu gamestate
        if(gameState == 0) {
            spacePressedSound.play();
            gameState = 1;
            startGame();
        } else if(gameState == 2) {
            spacePressedSound.play();
            gameState = 0;
        }
    }

});


function gameHelp() {
    alert("--Game Controls--\n" +
        "W A S D - To move\n" +
        "Spacebar - Proceed on menu\n" + 
        "--Objective--\n" +
        "Last as long as possible to get the highest score. Score is calculated based on the number of stars visible and where the player is on the screen.\n" +
        "--Game Info--\n" +
        "If a star makes contact with you, you will get bigger and another two stars will spawn in its place. If you get too big the game ends.");
}

function muteAllSound() {
    tr.mute();
    spacePressedSound.mute();
    if(lights != null) {
        lights.mute();
    }

}
