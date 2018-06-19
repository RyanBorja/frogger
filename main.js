// Initialize canvas element
var game = document.getElementById('game');
var ctx = game.getContext('2d');

// Include sprites
var sprites = new Image();
var deathSprite = new Image();
var gameOverSprite = new Image();

sprites.src = 'assets/frogger-sprites.png';
deathSprite.src = 'assets/skull-sprite.png'
gameOverSprite.src = 'assets/gameOverSprite.png';

// Set score variables
// currentScore is used to ensure you only gain points when you reach a
// new max row, it's a running total at any point and can decrement.
var score = 0;
var currentScore = 0;
var highScore = 0;
if (window.localStorage['highScore']) {
    highScore = localStorage['highScore'];
} 

var lives = 3;

// Original Frog Size from Sprite Sheet
var frogWidth = 30;
var frogHeight = 22;

// Frog position
var frogX = 200;
var frogY = 530;
var facing = 'up';

// Sets game speed by rendering a frame every xx milliseconds
var gameSpeed = 30;

var logbreakpoint = [527, 621, 560];
var logstartpoint = [-87, -320, -553, -181, -508, -835, -120, -386, -652];

var breakpoint = [-27, 470, -30, 470, -50, -33, -33];

var startpoint1 = [440, -30, 440, -30, 440, 440, 440];
var startpoint2 = [613, -206, 616, -206, 636, 473, 473];
var startpoint3 = [759, -382, 792, -382, 832, 506, 506];




// OBSTACLES
// first row: purple yello car, right to left, slow [0]
// second row: bulldozer car, left to right, slow [1]
// third row: purple car, right to left, medium speed [2]
// fourth row: green and white car, left to right, medium speed [3]
// fifth row: freight truck car, right to left, fast [4]
// sixth row: turts x 3, slow [5]
// seventh row: small log, slow [6]
// eith row: large log, fast [7]
// ninth row: turts x 2, fast [8]
// tenth row: medium logs, medium speed [9]

var obstacleArray = [
    // road obstacles
    // car row 1
    new Obstacle(sprites, 80, 262, 27, 28, startpoint1[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
    new Obstacle(sprites, 80, 262, 27, 28, startpoint2[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
    new Obstacle(sprites, 80, 262, 27, 28, startpoint3[0], 490, 27, 28, 'from right to left', 'slow', breakpoint[0]),
    // car row 2
    new Obstacle(sprites, 70, 300, 30, 23, startpoint1[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
    new Obstacle(sprites, 70, 300, 30, 23, startpoint2[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
    new Obstacle(sprites, 70, 300, 30, 23, startpoint3[1], 450, 30, 23, 'from left to right', 'slow', breakpoint[1]),
    // car row 3
    new Obstacle(sprites, 10, 265, 30, 23, startpoint1[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
    new Obstacle(sprites, 10, 265, 30, 23, startpoint2[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
    new Obstacle(sprites, 10, 265, 30, 23, startpoint3[2], 410, 30, 23, 'from right to left', 'medium', breakpoint[2]),
    // car row 4
    new Obstacle(sprites, 45, 263, 30, 27, startpoint1[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
    new Obstacle(sprites, 45, 263, 30, 27, startpoint2[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
    new Obstacle(sprites, 45, 263, 30, 27, startpoint3[3], 370, 30, 27, 'from left to right', 'medium', breakpoint[3]),
    // car row 5
    new Obstacle(sprites, 105, 300, 50, 21, startpoint1[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
    new Obstacle(sprites, 105, 300, 50, 21, startpoint2[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
    new Obstacle(sprites, 105, 300, 50, 21, startpoint3[4], 330, 50, 21, 'from right to left', 'fast', breakpoint[4]),
    // water obstacles
    // water row 1
    new Obstacle(sprites, 14, 405, 33, 25, startpoint1[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint2[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint3[5], 250, 33, 25, 'from right to left', 'slow', breakpoint[5]),
    // water row 2
    new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[0], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
    new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[1], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
    new Obstacle(sprites, 6, 228, 87, 24, logstartpoint[2], 210, 87, 24, 'from left to right', 'slow', logbreakpoint[0]),
    // water row 3
    new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[3], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
    new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[4], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
    new Obstacle(sprites, 6, 164, 181, 24, logstartpoint[5], 170, 181, 24, 'from left to right', 'fast', logbreakpoint[1]),
    // water row 4
    new Obstacle(sprites, 14, 405, 33, 25, startpoint1[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint2[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
    new Obstacle(sprites, 14, 405, 33, 25, startpoint3[6], 130, 33, 25, 'from right to left', 'fast', breakpoint[6]),
    // water row 5
    new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[6], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2]),
    new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[7], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2]),
    new Obstacle(sprites, 6, 196, 120, 24, logstartpoint[8], 90, 120, 24, 'from left to right', 'medium', logbreakpoint[2])
];

window.addEventListener('keydown',
    function(event) {
        if (lives > 0) {
        var keypress = event.keyCode;
        move(keypress);
        }
    })

function Obstacle(source, sourcex, sourcey, sourcewidth, sourceheight, destx, desty, destwidth, destheight, direction, speed, reset) {
    this.s = source;
    this.sx = sourcex;
    this.sy = sourcey;
    this.sw = sourcewidth;
    this.sh = sourceheight;
    this.dx = destx;
    this.dy = desty;
    this.dw = destwidth;
    this.dh = destheight;
    this.direction= direction;
    this.speed= speed;
    this.resetAtXvalue= reset;
    // draws the obstacle
    this.draw= function(){
        ctx.drawImage(this.s, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }
    // updates the obstacle to show movement
    this.update= function(){
        if(this.direction == 'from left to right'){
            if(this.speed == 'slow'){
                this.dx += .5;
                if (this.dx > this.resetAtXvalue && this.resetAtXvalue === logbreakpoint[0]){
                    this.dx = -174;
                }
                if(this.dx > this.resetAtXvalue && this.resetAtXvalue != logbreakpoint[0]){
                    this.dx = -30;
                }
            }
            if(this.speed == 'medium'){
                this.dx += 1;
                if (this.dx > this.resetAtXvalue && this.resetAtXvalue === logbreakpoint[2]){
                    this.dx = -240;
                }
                if(this.dx > this.resetAtXvalue && this.resetAtXvalue != logbreakpoint[2]){
                    this.dx = -30;
                }
            }
            if(this.speed == 'fast'){
                this.dx += 1.25;
                if (this.dx > this.resetAtXvalue && this.resetAtXvalue === logbreakpoint[1]){
                    this.dx = -362;
                }
                if(this.dx > this.resetAtXvalue && this.resetAtXvalue != logbreakpoint[1]){
                    this.dx = -30;
                }
            }
        }
        if(this.direction == 'from right to left'){
            if(this.speed == 'slow'){
                this.dx -= .5;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 470;
                }
            }
            if(this.speed == 'medium'){
                this.dx -= 1;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 470;
                }
            }
            if(this.speed == 'fast'){
                this.dx -= 1.25;
                if(this.dx < this.resetAtXvalue){
                    this.dx = 490;
                }
            }
        }
        this.draw();
    }
}

// TODO
    // onREadyState function
        // Load background and frog in starting position
        // Object movement function
        // Collision function
        // Reset function
        // Play function
            // Allows frog movement from user input
            // Refreshes score
            // Run collision function
setInterval(gameTime, gameSpeed);

function gameTime() {
    if (facing != 'dead') {
        animate();
    }
    else {
        reset();
    }
}

function animate() {
    // Game loop, runs every frame,

    // clears the canvas every before rendering new frame.
    ctx.clearRect(0, 0, game.width, game.height);

    // calls these functions every frame
    drawBackground();
    // draws the obstacles
    for(var i =0; i < obstacleArray.length; i++){
        obstacleArray[i].update();
    }
    // checks game logic
    gameLogic();
    drawFrog();
    car_collision();
    water_collision();
    logRide();
    gameLogic();
    winner();
}

// Render background
function drawBackground() {
    // water
    ctx.fillStyle = '#4d94ff';
    ctx.fillRect(0, 40, game.width, 240);
    // road
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 320, game.width, 200);
    // safe zone bottom
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 520, game.width, 44);
    // safe zone middle
    ctx.drawImage(sprites, 0, 120, 399, 35, 0, 280, game.width, 44);
    // grass
    ctx.drawImage(sprites, 0, 54, 399, 56, 0, 38, game.width, 44);
    // top black stripe
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, game.width, 40);
    // bottom black stripe
    ctx.fillRect(0, 560, game.width, 40);
    //  Score and high score text
    ctx.font = 'bold 24px VT323';
    ctx.fillStyle = "white";
    ctx.fillText('SCORE', 10, 18);
    ctx.fillText('HIGH SCORE', 300, 18);
}

function drawFrog() {
    // If alive draws the frog with it's new position values
    if ( facing == 'left' ) {
        ctx.drawImage(sprites, 80, 335, 30, 22, frogX, frogY, 30, 22);
    }

    else if ( facing == 'up' ) {
        ctx.drawImage(sprites, 10, 365, 30, 22, frogX, frogY, 30, 22);
    }

    else if ( facing == 'right' ) {
        ctx.drawImage(sprites, 12, 335, 30, 22, frogX, frogY, 30, 22);
    }

    else if ( facing == 'down' ) {
        ctx.drawImage(sprites, 74, 365, 30, 22, frogX, frogY, 30, 22);
    }

    // If collion occurs draw deathSprite in that position
    else if ( facing == 'dead' ) {
        ctx.drawImage(deathSprite, frogX, frogY, 30, 22);
    }
}

// Frog movement
function move(keypress) {

    if (keypress == 37 && isMoveValid(frogX-32, frogY)) {
        frogX -= 40;
        facing = 'left';
        ctx.drawImage(sprites, 80, 335, 23, 17, frogX, frogY, 19, 23);
    }
    else if (keypress == 38 && isMoveValid(frogX, frogY-40)) {
        frogY -= 40;
        facing = 'up';
        currentScore += 10;
        ctx.drawImage(sprites, 12, 369, 23, 17, frogX, frogY, 23, 17);

    }
    else if (keypress == 39 && isMoveValid(frogX+32, frogY)) {
        frogX += 40;
        facing = 'right';
        ctx.drawImage(sprites, 12, 335, 23, 17, frogX, frogY, 19, 23);
    }
    else if (keypress == 40 && isMoveValid(frogX, frogY+40)) {
        frogY += 40;
        facing = 'down';
        currentScore -= 10;
        ctx.drawImage(sprites, 12, 369, 23, 17, frogX, frogY, 23, 17);
    }
}

// Check if proposed move is valid (on screen)
function isMoveValid(x,y) {
    if (x >= 0 && x < 420 && y > 89 && y < 560 ) {
        return true;
    } else if(y > 30 && y < 90 && (x < 50)){
        console.log('score1');
        return true;
    } else if(y > 30 && y < 90 && (100 < x < 150)){
        console.log('score2');
        return true;
    } else if(y > 30 && y < 90 && (250 < x < 280)){
        console.log('score3');
        return true;
    } else if(y > 30 && y < 90 && (335 < x < 385)){
        console.log('score4');
        return true;
    }
    else{
        console.log('false', x, y);
        return false;
    }
}


// GAME LOGIC
function gameLogic() {
    // If statement to prevent score from decrementing, currentScore
    // is never shown.
    if (currentScore > score) {
        score = currentScore;
    }

    if (score > highScore) {
        localStorage['highScore'] = score;
        highScore = score;
    }

    ctx.fillText('' + score + '', 10, 38);
    ctx.fillText('' + highScore + '', 300, 38);

    for (var i = 0; i < lives; i++) {
        ctx.drawImage(sprites, 10, 365, 30, 22, 5+(30*i), 565, 30, 22)
    }
}

function car_collision() {

     // For loop to check every obstacleX
    for (var i = 0; i < 15; i++) {
        var obs = obstacleArray[i];
        if (frogY == obs.dy && ((frogX < obs.dx + obs.dw/2) && (frogX > obs.dx - obs.dw/2))) {

           // Decrement lives
           lives--;

           facing = 'dead';
           ctx.drawImage(deathSprite, frogX, frogY, 30, 22);
        }
    }
}

function water_collision() {
    for (var i = 15; i < 30; i = i+3) {
        var obs = obstacleArray[i];
        var count = 0;

        // With three objects on every row we have to check for collisions with
        // all three to see if frog is in the water
        for (var j = 0; j < 3; j++) {
            obs = obstacleArray[i+j];
            if (i >= 15 && frogY == obs.dy && ((frogX > obs.dx + obs.dw) || (frogX < obs.dx - obs.dw/2))) {
                count++;
            }
            // If frog is not on any of the three objects in a row then frog
            // is dead
            if (count == 3) {
                facing = 'dead';
                lives--;
                ctx.drawImage(deathSprite, frogX, frogY, 30, 22);
            }
        }
    }
}

function logRide() {

    // For loop to check every obstacleX
    for (var i = 15; i < 30; i++) {
        var obs = obstacleArray[i];

        // If frog is on an object in the water
        if (frogY == obs.dy && ((frogX < obs.dx + obs.dw) && (frogX > obs.dx))) {

            // Increment frog position according to object speed
            if(obs.direction == 'from left to right'){
                if(obs.speed == 'slow'){
                    frogX += .5;
                }
                if(obs.speed == 'medium'){
                    frogX += 1;
                }
                if(obs.speed == 'fast'){
                    frogX += 1.25;
                }
            }
            if(obs.direction == 'from right to left'){
                if(obs.speed == 'slow'){
                    frogX -= .5;
                }
                if(obs.speed == 'medium'){
                    frogX -= 1;
                }
                if(obs.speed == 'fast'){
                    frogX -= 1.25;
                }
            }
        }
    }
}


function reset() {

    frogX = 200;
    frogY = 530;
    if (!winner()) {
        score = 0;
        currentScore = 0;
    }
    if (lives == 0) {
        // Display losing message
        ctx.drawImage(gameOverSprite, 85, 170, 280, 280);
    }
}

function winner() {
    if (frogY == 50) {
        currentScore = score + 300;

        console.log("Congratu-freaking-lations!");
        reset();

    }
    return true;
}
