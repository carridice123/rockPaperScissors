let plScore = document.querySelector('.e-score');
let compScore = document.querySelector('.a-score');
let playerScore = 0;
let computerScore = 0;
//setting choice buttons in variables to hide them after pressing stop button
const button1 = document.getElementById('btn-1');
const button2 = document.getElementById('btn-2');
const button3 = document.getElementById('btn-3');

const  imgs1 = document.getElementById('imgs-1');
const  imgs2 = document.getElementById('imgs-2');
const  imgs3 = document.getElementById('imgs-3');


//showing the contents of the page
const contents = document.querySelector('.content');

//variable for start and stop buttons
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
// const resetEl = document.getElementById("reset");
const timerEl = document.getElementById("timer");

let interval;
let timeLeft = 90;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  timerEl.innerHTML = formattedTime;
}

function startTimer() {
  interval = setInterval(() => {
    timeLeft--;
    showContents()
    updateTimer();
    enableButtons()
    if (timeLeft === 0) {
      clearInterval(interval);
      alert("Time's up! restart the game?");
      location.reload()
      timeLeft = 90;
      updateTimer();
    }
  }, 1000);
}
function stopTimer() {
  disableButtons()
  clearInterval(interval);

}
// function resetTimer() {
//   clearInterval(interval);
//   timeLeft = 90;
//   updateTimer();
// }

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
// resetEl.addEventListener("click", resetTimer);

// ----------------------------------------------------

// Nav bar section
// const body = document.querySelector(".body")
const bars = document.querySelector(".fa-bars");
const sidebar = document.querySelector(".sidebar");
const closingButton = document.querySelector(".fa-times");

bars.addEventListener("click", () => {
    // body.classList.toggle('clear')
  sidebar.classList.toggle("show-sidebar");
});

closingButton.addEventListener("click", () => {
  sidebar.classList.remove("show-sidebar");
});

// disable buttons when game paused to prevent cheating

function disableButtons(){
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
}



function enableButtons(){
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;



}

function showContents(){
    contents.classList.add('show-contents')
}

// SETTING DARK MODE

const inputEl = document.querySelector(".input");

const bodyEl = document.querySelector("#body");

inputEl.checked = JSON.parse(localStorage.getItem("mode"));

updateBody();

function updateBody() {
  if (inputEl.checked) {
    bodyEl.style.background = "black";
    startEl.style.color = "red";
    stopEl.style.color = "red";
    contents.style.color = "white";


  } else {
    bodyEl.style.background = "#86efac";
    startEl.style.color = "black";
    stopEl.style.color = "black";
    contents.style.color = "black";

    
  }
}

inputEl.addEventListener("input", () => {
  updateBody();
  updateLocalStorage();
});

function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}




//getting access to the choice the buttons
const rockBtn = document.querySelector(".btns1");
const paperBtn = document.querySelector(".btns2");
const scissorsBtn = document.querySelector(".btns3");
const resultes = document.querySelector("#results");

// Array of available choices
const choice = ["rock", "paper", "scissors"];

//using length of array choice to randomly select and return computer choice
// set interval to couple sections before print Compchoice
function getComputerChoice() {
   const compChoice = choice[Math.floor(Math.random() * choice.length)];
   console.log(compChoice);
   return compChoice;

}

function checkWinner(playerSelection, compSelection) {
    if(playerSelection == compSelection) {
        return "Tie";

    }
    else if(
        (playerSelection == "rock" && compSelection == "scissors") || 
        (playerSelection == "scissors" && compSelection == "paper") ||
        (playerSelection == "paper" && compSelection == "rock")
        
        ) { 
            return "Player!";
        } 
        else {
            return "Computer";
        }
        
    


}

function playRound(playerSelection, compSelection) {
    const result = checkWinner(playerSelection, compSelection);
    if(result == "Tie") {
        const paragh1 = document.createElement("p");
        paragh1.innerText = `It's a tie! stop thinking like the aliens`;
       resultes.appendChild(paragh1);
    }
    else if(result == "Player!") {
        const paragh2 = document.createElement("div"); // the back tick allows variables in them
        paragh2.innerText = `You Win! the aliens choosed ${compSelection}`
        resultes.appendChild(paragh2);
        playerScore++;
        plScore.innerText = playerScore;
        console.log(plScore)
       
    }  else if (result == "Computer"){
        const paragh3 = document.createElement("p");
        paragh3.innerText = `you Lose! ${compSelection} beats ${playerSelection}`;
        resultes.appendChild(paragh3);
        computerScore++;
        compScore.innerText = computerScore;
      
        console.log(compScore)
    }                             
        
    }
    function checkForWinner(playerScore, computerScore){
        if(playerScore < 5 && computerScore == 5){
            const heade2 = document.createElement("p");
            heade2.innerText = "GAME OVER THE ALIENS WON";
            resultes.appendChild(heade2);
            resultes.removeChild(paragh3)
            resultes.removeChild(paragh2)
            resultes.removeChild(paragh1)
        }
        else if(playerScore == 5 && computerScore < 5){
            const heade3 = document.createElement("p");
            heade3.innerText = "YOU WON THE GAME";
            resultes.appendChild(heade3);
            resultes.removeChild(paragh3)
            resultes.removeChild(paragh2)
            resultes.removeChild(paragh1)
        }
        // if(playerScore == 3 ) {
        //     const heade2 = document.createElement("p");
        //     heade2.innerText = "game Over!!!";
        //     resultes.appendChild(heade2);
        // }
        // else if (computerScore == 3) {
        //     const heade3 = document.createElement("p");
        //     heade3.innerText = "GAme EEnds";
        //     resultes.appendChild(heade3);
            
        // }
       
    }
   
    

rockBtn.addEventListener("click", () => {
    checkForWinner(playerScore, computerScore)
    const compSelection = getComputerChoice();
    const playerSelection = "rock";
    rockData()
});

paperBtn.addEventListener("click", () => {
    checkForWinner(playerScore, computerScore)
    const compSelection = getComputerChoice();
    const playerSelection = "paper";
    paperData()
});

scissorsBtn.addEventListener("click", () => {
    checkForWinner(playerScore, computerScore)
    const compSelection = getComputerChoice();
    const playerSelection = "scissors";
    checkForWinner(playerScore, computerScore)
    scissorsData()
});

// these delays the computer choice by one second
const rockData = () =>
    new Promise(resolve => {
    const compSelection = getComputerChoice();
    const playerSelection = 'rock';
    setTimeout(() => resolve(playRound(playerSelection, compSelection)), 1000);
  });

const paperData = () =>
    new Promise(resolve => {
    const compSelection = getComputerChoice();
    const playerSelection = 'paper';

    setTimeout(() => resolve(playRound(playerSelection, compSelection)), 1000);
  });

const scissorsData = () =>
    new Promise(resolve => {
    const compSelection = getComputerChoice();
    const playerSelection = 'scissors';

    setTimeout(() => resolve(playRound(playerSelection, compSelection)), 1000);
  });






/* 


function getPlayerChoice() {
    let userChoice = false;
    while (userChoice == false) {
        const userInput = prompt("Rock Paper Scissors"); // this ask or prompt the player for an input.
        if(userInput == null) {
            continue;
        }
        const choiceInLower = userInput.toLowerCase();
        if(choice.includes(choiceInLower)) { // this line here i need to look OVER THIS.
            userChoice = true;
            return choiceInLower;
        }
    }



}

function game() {
    let playerScore = 0;
    let compScore = 0;
    for (let i = 0; i < 5; i++) {
    const playerSelection = getPlayerChoice();
    const compSelection = getComputerChoice();
    console.log(playRound(playerSelection, compSelection));
    console.log("----------------------"); // this is to create space.

    if (checkWinner(playerSelection, compSelection) == "Player!") {
        playerScore++;
        
    }
    else if (checkWinner(playerSelection, compSelection) == "Computer") {
        compScore++;
    }


    }
    console.log("Game Over")
    if (playerScore > compScore) {
        console.log("You win!");
    }
    else if (playerScore < compScore) {
        console.log("You Lose");
    }
    else
    function game() {
        let playerScore = 0;
        let compScore = 0;
        for (let i = 0; i < 5; i++) {
        const playerSelection = getPlayerChoice();
        const compSelection = getComputerChoice();
        console.log(playRound(playerSelection, compSelection));
        console.log("----------------------"); // this is to create space.
    
        if (checkWinner(playerSelection, compSelection) == "Player!") {
            playerScore++;
            
        }
        else {
        console.log("its a tie");
    }
   
    
}


game();

 */