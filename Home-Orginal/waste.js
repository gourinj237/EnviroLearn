const items = [
    {name:"Banana Peel", type:"wet", img:"banana.jpeg"},
    {name:"Plastic Bottle", type:"dry", img:"bottle.jpeg"},
    {name:"Old Mobile", type:"ewaste", img:"mobile.jpeg"},
    {name:"Paper", type:"dry", img:"paper.jpeg"},
    {name:"Vegetable Scraps", type:"wet", img:"veggies.jpeg"}
];

let score = 0;
let index = 0;

const itemImg = document.getElementById("wasteItem");
const itemName = document.getElementById("itemName");
const scoreText = document.getElementById("score");
const feedback = document.getElementById("feedback");
const bins = document.querySelectorAll(".bin");

function loadItem(){
    if(index >= items.length){
        endGame();
        return;
    }

    itemImg.src = items[index].img;
    itemName.textContent = items[index].name;
    feedback.textContent = "";
}

itemImg.addEventListener("dragstart", e=>{
    e.dataTransfer.setData("type", items[index].type);
});

bins.forEach(bin=>{

    bin.addEventListener("dragover", e=>{
        e.preventDefault();
        bin.classList.add("hovered");
    });

    bin.addEventListener("dragleave", ()=>{
        bin.classList.remove("hovered");
    });

    bin.addEventListener("drop", e=>{
        e.preventDefault();
        bin.classList.remove("hovered");

        const correct = e.dataTransfer.getData("type");
        const chosen = bin.dataset.type;

        if(correct === chosen){
            score += 10;
            feedback.textContent = "✔ Correct! Great sorting!";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "✖ Not quite — try the next one!";
            feedback.style.color = "red";
        }

        scoreText.textContent = score;
        index++;

        setTimeout(loadItem, 900);
    });

});

function endGame(){
    document.getElementById("gameArea").style.display = "none";

    document.getElementById("finalMessage").innerHTML =
        `🌱 Amazing Work! 🌱<br><br>
        Final Score: ${score}<br><br>
        You helped protect our planet! ♻`;

    document.getElementById("finalScreen").classList.remove("hidden");
}

function restartGame(){
    score = 0;
    index = 0;
    scoreText.textContent = score;

    document.getElementById("finalScreen").classList.add("hidden");
    document.getElementById("gameArea").style.display = "block";

    loadItem();
}

loadItem();