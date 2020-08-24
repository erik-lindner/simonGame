//INFO OVER THE GAME
var info = document.querySelectorAll(".info > *");

//4 CELLS OF THE GAME
var cells = document.querySelectorAll(".cell");
//ADD EVENT LISTENER TO EVERY CELL
cells.forEach((item, index)=>{
  item.addEventListener("click", reDo);
});

//ACTION REQUERID TO CONTINUE TO NEXT ROUND
var nextRound = document.querySelector(".nextRound");
//ADD EVENT LISTENER TO nextRound BUTTON
nextRound.children[0].addEventListener("click", ()=>{
  nextRound.style.display = "none";
  vorgabe();
});

//STAUS beneath game -> REMEMBER OR REPEAT
var stat = document.querySelector(".status");

//GAMEOVER
var gameOver = document.querySelector(".gameOver");
//ADD EVENT LISTENER TO gameOver BUTTON
gameOver.children[1].addEventListener("click" , playAgain);

//IS THE SEQUENCE PLAYING
var vorgabeRunning = true;

//ARRAY OF RANDOM INDEXES
var sequence = [];

//COUNTER TO KEEP TRACK OF INDEX -> IN reDo() Function
var reCounter = 0;

//ROUNDS PLAYED
var round = 1;

//START FIRST ROUND
const startButton = document.querySelector('.startButton button');
startButton.addEventListener('click', () => {
  stat.style.display = 'block';
  startButton.style.display = 'none';
  vorgabe();
});

//VORGABE
function vorgabe(){
  sequence.push(randomNumber());
  var counter = 0;

  loop();

  function loop(){
    setTimeout(function(){
      cells[sequence[counter]].style.opacity = 1;
    }, 300);

    setTimeout(function(){
      cells[sequence[counter]].style.opacity = 0.4;
      counter++;
      if(counter < sequence.length){
        loop();
      }
      else{
        vorgabeRunning = false;
        stat.style.color = "green";
        stat.children[0].innerHTML = "REPEAT";
      }
    }, 1300);
  }
}

//NACH MACHEN
function reDo(){
  if(vorgabeRunning == false){
    var position = parseInt(this.innerHTML);
    if(sequence[reCounter] == position){
      console.log("yes");
    }
    else{
      gameOver.style.display = "block";
      console.log("no");
    }

    reCounter++;

    if(sequence.length == reCounter){
      reCounter = 0;
      round++;
      info[0].innerHTML = "Runde: " + round;

      nextRound.style.display = "block";

      stat.style.color = "red";
      stat.children[0].innerHTML = "REMEMBER";

      vorgabeRunning = true;
    }
  }
}

//NOCHMAL SPIELEN
function playAgain(){
  sequence = [];
  reCounter = 0;

  vorgabeRunning = true;

  round = 1;
  info[0].innerHTML = "Runde: " + round;

  stat.style.color = "red";
  stat.children[0].innerHTML = "REMEMBER";

  nextRound.style.display = "none";

  gameOver.style.display = "none";

  vorgabe();
}

//RANDOM INDEX
function randomNumber(){
  return Math.floor(Math.random() * 4);
}
