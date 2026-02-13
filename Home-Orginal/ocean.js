const trash = [
"bag.png",
"seabottle.png",
"can.png",
"anchor.png",
"plastic.png",
"tire.png"
];

const animals = [
"fish.png",
"turtle.png",
"starfish.png",
"dolphin.png",
"seal.png",
"jellyfish.png"
];

let score=0;
let time=30;
let gameActive=false;
let spawnInterval;
let timerInterval;

const ocean=document.getElementById("ocean");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame(){

document.getElementById("startScreen").classList.add("hidden");
document.getElementById("gameUI").classList.remove("hidden");

score=0;
time=30;
gameActive=true;

document.getElementById("score").textContent=score;
document.getElementById("time").textContent=time;

spawnInterval=setInterval(spawnObject,800);
timerInterval=setInterval(updateTimer,1000);
}

function spawnObject(){
if(!gameActive) return;

let img=document.createElement("img");

let isTrash=Math.random()>0.4;
let src=isTrash
? trash[Math.floor(Math.random()*trash.length)]
: animals[Math.floor(Math.random()*animals.length)];

img.src=src;
img.className="object";

img.style.left=Math.random()*88+"%";
img.style.top=Math.random()*78+"%";

img.onclick=()=>{
    if(!gameActive) return;

    if(isTrash){
        score+=10;
    }else{
        score-=5;
    }

    document.getElementById("score").textContent=score;
    img.remove();
};

ocean.appendChild(img);

setTimeout(()=>{img.remove()},7000);
}

function updateTimer(){
time--;
document.getElementById("time").textContent=time;

if(time<=0){
endGame();
}
}

function endGame(){
gameActive=false;

clearInterval(spawnInterval);
clearInterval(timerInterval);

document.getElementById("gameUI").classList.add("hidden");
document.getElementById("endScreen").classList.remove("hidden");

document.getElementById("finalScore").textContent=
"Final Score: "+score;

// Appreciation messages
let message="";
if(score < 50)
message="Nice start! Every small action helps the ocean 💙";

else if(score < 150)
message="Great job! Marine life appreciates your effort 🐢";

else if(score < 300)
message="Amazing cleanup! You're protecting the ecosystem 🌱";

else
message="Legendary Ocean Guardian! The sea is proud of you 🌊✨";

document.getElementById("message").textContent=message;
}
