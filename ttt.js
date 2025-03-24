const boxAll = document.querySelectorAll(".box");
const statuse = document.querySelector(".status");
const restartBtn = document.querySelector(".restartBtn");

let x ="<img src='X-Player.png'>";
let o ="<img src='O-Player.png'>";
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
// We will initialise the game stage when all the boxes are empty.

let options =["","","","","","","","",""];

// initially the x player starts.

let currentPlayer =x;
let player ="X";

// Game Running State

let running = false;

//  initialising the game by setting eventListeners and updating status.

init();

// creating the function to initialise the game

function init(){

    // Let's add a EventClick to every box and we will call box click function whenever the box is clicked.

    boxAll.forEach(box=>box.addEventListener('click',boxClick));

    // Add a clickEvent to the restart button and we will call the restart game function when clicked.

    restartBtn.addEventListener('click',restartGame);

    // Set the initial status message.

    statuse.textContent = `Now "${player}" Turn`;

    // Set the game to running.

    running = true;
}

// function to handle box click events.
function boxClick(e){
    // get the index of the clicked box

    const index = e.target.dataset.index;

    // if the boxes are already filled, or the game is not running, that means you can't play

    // !running is same as running = false
    if(options[index]!="" || !running){
        return;
    }

    // Otherwise update the clickbox

    updateBox(e.target,index);

    // check if the game has a winner after the move.

    checkWinner();
}

// function to update a box with the current player's symbol.

function updateBox(box,index){
    // storing the player's symbol in the options array.

    options[index] = 

    // update the inner HTML of the box with the corresponding image. \\

    box.innerHTML = currentPlayer;
}
// function to switch the turn between x and o \\
function changePlayer(){
    // toggle player between x and o \\

    player = (player == 'X') ?"O":"X";
    
    // we have changed the player name, but we have to also toggle the corresponding image. \\

    currentPlayer = (currentPlayer == x) ? o:x;

    //update the status message with the next player's turn\\

    statuse.textContent = `Now "${player}" Turn`;

    //reset the colour status to default(black).\\

    statuse.style.color = "black";
}

function restartGame(){
    // We are resetting all the boxes to empty.\\

    options =["","","","","","","","",""];

    //reset the player to x\\

    currentPlayer =x;
    player ="X";

    //we are restarting the game so running = true.

    running=true;

    //we are resetting the status message.

    statuse.textContent = `Now "${player}" Turn`;
    statuse.style.color = "black";

    //resetting the restart button text.

    restartBtn.textContent = "Restart 🔁";

    // let's clear all the box content and remove the win class.

    boxAll.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
}

// function to check for a winner

function checkWinner(){
    let isWon= false;

    // we are going to itreate(travel) all the winning combinations.

    for(let i=0; i<win.length; i++){
        // getting the current winning combinations.

        const condition= win[i];
        const box1= options[condition[0]];
        const box2= options[condition[1]];
        const box3= options[condition[2]];

        // if any box in the combination is empty, then we will skip this iteration.
        // bar sign is the "or" sign.
        if(box1=="" || box2=="" || box3==""){
            continue;
        }
        // if all the 3 boxes are filled and it's a match then it's a win.
        // and in coding is &&
        if(box1==box2 && box2==box3){
            isWon=true;

            // let's highlight the winning boxes by adding the winning class.

            boxAll[condition[0]].classList.add('win');
            boxAll[condition[1]].classList.add('win');
            boxAll[condition[2]].classList.add('win');
        }
    }
    // if a player has won

    if(isWon==true){
        statuse.textContent=`hooray...!"${player}" Won the game! 😊😊😊`;
        statuse.styleColor="green";
        restartBtn.textContent="Play Again? 😉";
        running = false;

    }

    // if all the boxes are filled but nobody has won, it's a draw.

    else if(options.includes("")==false)
    {
        statuse.textContent=`Oops! It's a draw!`;
        statuse.styleColor="red";
        restartBtn.textContent="Play Again? 😉";
        running=false;
    }

    // otherwise continue playing by switching turns.

    else{
        changePlayer();
    }
}