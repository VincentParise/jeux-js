const newGame=document.querySelector('.new-game');
const rollDice=document.querySelector('.roll-dice');
const hold=document.querySelector('.hold');

const scoreGlobals=document.querySelectorAll('.score-global');
const scoreCurrents=document.querySelectorAll('.score-current');

const cellsDice=document.querySelectorAll('.cell');
const titles=document.querySelectorAll('.title');

const modal=document.querySelector('.modal-text');
const overlay=document.querySelector('.overlay');

// Initialisation
let players=[0,1];
let currentPlayer=0;
progressPlayer(currentPlayer);
let scoreCurrentPlayers=[0,0];
let scoreGlobalPlayers=[0,0];

newGame.addEventListener('click', initializeGame);

rollDice.addEventListener('click',rollDiceRound);

hold.addEventListener('click',holdRound);

// Change title
function progressPlayer(current) {
  titles[current].innerHTML=`PLAYER ${current+1} JOUE`
  titles[current].style.color="rgba(209, 72, 72, 0.8)"; 
}
// Change title
function removePlayer(current) {
  titles[current].innerHTML=`PLAYER ${current+1}`
  titles[current].style.color="rgba(47, 44, 44, 0.8)"; 
}
// Ope change Player
function changePlayer(current){
  removePlayer(current);
  // change current Player
  current = current ? 0 : 1;
  progressPlayer(current);
  return current;
}
// Delete active class in cell
function deleteActiveCells () {
  cellsDice.forEach((item)=>{
    item.classList.remove('active');
  })  
}

function initializeGame() {

  currentPlayer=0;
  progressPlayer(currentPlayer);
  removePlayer(currentPlayer+1);
  // for each players
  players.forEach((item)=>{
    scoreCurrentPlayers[item]=0;
    scoreCurrents[item].innerHTML="0";
    scoreGlobalPlayers[item]=0;
    scoreGlobals[item].innerHTML="0";
  });
  deleteActiveCells();
}

function rollDiceRound() {
  const valueDice= Math.floor(Math.random()*(7-1)+1); // Value Dice random
  
  cellsDice.forEach((item)=>{
    item.classList.remove('active');
  })  

  // Active view dice
  switch (valueDice) {
    case 1:
       cellsDice[4].classList.add('active');
       break;
    case 2:
      cellsDice[1].classList.add('active');
      cellsDice[7].classList.add('active');
      break;
    case 3:
      cellsDice[0].classList.add('active');
      cellsDice[4].classList.add('active');
      cellsDice[8].classList.add('active');
      break;
    case 4:
      cellsDice[0].classList.add('active');
      cellsDice[2].classList.add('active');
      cellsDice[6].classList.add('active');
      cellsDice[8].classList.add('active');
      break;
    case 5:
      cellsDice[0].classList.add('active');
      cellsDice[2].classList.add('active');
      cellsDice[4].classList.add('active');
      cellsDice[6].classList.add('active');
      cellsDice[8].classList.add('active');
      break;
    case 6:
      cellsDice[0].classList.add('active');
      cellsDice[3].classList.add('active');
      cellsDice[6].classList.add('active');
      cellsDice[2].classList.add('active');
      cellsDice[5].classList.add('active');
      cellsDice[8].classList.add('active');
      break;
    default:
      break;           
  }
  scoreCurrentPlayers[currentPlayer]=scoreCurrentPlayers[currentPlayer]+valueDice;
  scoreCurrents[currentPlayer].innerHTML=`${scoreCurrentPlayers[currentPlayer]}`;
  // Round next
  if (valueDice===1) {
    scoreCurrentPlayers[currentPlayer]=0;
    scoreCurrents[currentPlayer].innerHTML="0";
    setTimeout(deleteActiveCells,500);
    currentPlayer=changePlayer(currentPlayer);
  }
}

function holdRound() {
  // Add Score Globals
  scoreGlobalPlayers[currentPlayer]=scoreGlobalPlayers[currentPlayer]+scoreCurrentPlayers[currentPlayer];
  scoreGlobals[currentPlayer].innerHTML=`${scoreGlobalPlayers[currentPlayer]}`;
  // Winner
  if(scoreGlobalPlayers[currentPlayer]>=100){
    overlay.style.display="block";
    modal.textContent=`LE JOUEUR ${currentPlayer+1} A GAGNE LA PARTIE`;
  }
  // Reset Score Current
  scoreCurrentPlayers[currentPlayer]=0;
  scoreCurrents[currentPlayer].innerHTML="0";
  currentPlayer=changePlayer(currentPlayer);
  deleteActiveCells();
}

function onModal(){
  overlay.style.display="none";
  modal.textContent="";
  initializeGame();
  return;
}
