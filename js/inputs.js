var keys = { };


document.addEventListener('keydown', function(event) {
    isKeyPressed(event, true); 
});

document.addEventListener('keyup', function(event) {
    isKeyPressed(event, false); 
});

function isKeyPressed(event, isPressed) {
    var kc = event.which || event.keyCode;
    switch(kc) {
        case 87:
            keys['W'] = isPressed;
            break;
        case 83:
            keys['S'] = isPressed;
            break;
        case 65:
            keys['A'] = isPressed;
            break;
        case 68:
            keys['D'] = isPressed;
            break;
        default:
            keys[event.keyCode] = isPressed;
    } 
}