let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
const reloadNeeded = false;
// load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "unicorn.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "lollipopNorth.png";
pipeSouth.src = "lollipopSouth.png";

             
// some variables

let gap = 130;
let constant;

let bX = 10;
let bY = 150;

let gravity = 1.0;

let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds_fly.mp3";
scor.src = "sounds_score.mp3";

// on key down

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 20;
    fly.play();
}

// pipe coordinates

let pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};


// draw images

function draw(){
    
    
    ctx.drawImage(bg,0,0);
    
    
    for(let i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
  

        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){reloadNeeded = true;

        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }


 
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-10);

    requestAnimationFrame(draw);
    
    if (!reloadNeeded) {
    window.location.reload(); // reload the page
    }
}


draw();