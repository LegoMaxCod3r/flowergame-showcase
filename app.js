var rounds = 1;
var timeleft = 180; // 3 minutes
var score = 0;
var enemies = 20;
var lenghtofEnemies = 20;
let extraScore = 10;
let savetime = 180;

var states = 
{
    state: 'play' //if play the games play, if over the game ends, if paused yknow
}

let canvas;
class Flower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.img = loadImage("../Assets/plants/flower1.png");
        this.isAlive = true;
    }

    display() {
        if(this.isAlive){
            if (this.img.width > 200 || this.img.height > 200) {
                this.img.resize(200,200);
            }
            image(this.img, this.x, this.y, 45, 80);
        }
    }
    // method to remove the flower from the game
    remove() {
        this.isAlive = false;
        enemies--;
        score+=5
    }
}
var f;
let flowers = [];

function createFlowers() {
    for (let i = 0; i < lenghtofEnemies; i++) {
        let x = random(width - 50);
        let y = random(height - 30);
        flowers.push( f=new Flower(x, y));
    }
}

function setup() {
    canvas = createCanvas(525,525);
    createFlowers();
    setInterval(countdown, 1000); // start the countdown
}

function draw() {

    //key events
    /*if(keyDown===32)
    {
        console.log("game paused")
        states.state='pause';
    }*/



    //
    if(states.state === 'play')
    {
        background('#2F911E');
        // draw the flowers on the canvas
        flowers.forEach(flower => flower.display());
        updateScore();
        updateLimit();
        updateRound();
        mousePressed();
        flowerMultypler();
    }

    /*if(states.state === 'pause')
    {
        background('#fff')
    }*/
    
}

function mousePressed() {
    flowers.forEach(flower => {
        if (mouseX >= flower.x && mouseX <= flower.x + flower.img.width &&
            mouseY >= flower.y && mouseY <= flower.y + flower.img.height) {
            flower.remove();
            flowers = flowers.filter(f => f.isAlive);
            
            console.log('The flower has been removed.')
        }
    });
}

// function to handle the countdown timer
function countdown() {
    timeleft--;
    if (timeleft <= 0) {
        clearInterval(timeleft);
        //alert("Time's up! Your final score is: " + score);
        states.state = 'over';
        
    }
}

function flowerMultypler()
{

    if(flowers.length===0)
    {
       //score += extraScore;
       rounds++;
       timeleft=savetime+20;
       for(var r=0; r<lenghtofEnemies*rounds; r++)
       {
        let x = random(width - 50);
        let y = random(height - 50);
        flowers.push( f=new Flower(x, y));
       }
       console.log('NEXT ROUND! ' + flowers.length);
    }

}

function updateScore() {
    let scoreText = document.getElementById("gamescore-");
    scoreText.innerText = score;
}

function updateLimit() {
    let limitText = document.getElementById("lim1t");
    limitText.innerText = timeleft;
}

function updateRound() {
    let textbar = document.getElementById("barText");
    textbar.innerText = 'Round: ' + rounds;
}