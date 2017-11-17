/*GLOBAL VARIABLES*/

var player1=1, player2=2;
var currentPlayer=1;
var win=0;
var winningPlayer=0;
var pieceLocation=-1;
var winners=[];
var gameOver=false;

var board = [[0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0]];


/*FUNCTIONS*/
function placePiece(column){
  var winningMove=false;
  var draw=false;

  var placement=6;
  if(gameOver==false){
    placePieceLowest(placement,column);

    if(checkDraw()){
      draw=true;
    }
    if(checkHor(column, placement) || checkVer(column, placement) ||
          checkDia1(column, placement)|| checkDia2(column, placement)){
      winningMove=true;
    }
    if(winningMove===true){
      declareWinner();
    }

    if(draw===true && winningMove===false){
      document.getElementById('winDraw').style.visibility='visible';
      document.getElementById('winDraw').innerHTML='A Draw!' ;
      playAgain();
      gameOver=true;
    }
  }
}

function placePieceLowest(placement,column){
  var i=6
  for(i;i>=0;i--){
    if(board[i][column-1]===0){

        board[i][column-1]=currentPlayer;
        var id= i +" "+ column; /*sets up the variable as a string*/

        if(currentPlayer===1){
          document.getElementById(id).src='red1.png';
          currentPlayer=2;
          document.getElementById('p1').src='redplayer2.png';
          document.getElementById('p2').src='yellowplayer1.png';
        }
        else {
          document.getElementById(id).src='yellow1.png';
          currentPlayer=1;
          document.getElementById('p1').src='redplayer1.png';
          document.getElementById('p2').src='yellowplayer2.png';

        }
        placement=i;
        i=0;
      }
    else if(i===0){
      /*no placement allowed*/
      alert("Please click on a valid placement.");
      }
  }
}
function declareWinner(){
  var winPlayer;
  gameOver=true;
  document.getElementById('winDraw').style.visibility='visible';
  if(currentPlayer===1){
      var namep2=document.getElementById('input2').value ;
      if (namep2.length<25){
        winPlayer=namep2;
      }
      else {
        winPlayer='Yellow Player';
        document.getElementById('input2').value='Yellow Player';
      }
    winners.push(2);
  }
  else {
    var namep1=document.getElementById('input1').value ;
    if (namep1.length<25 && namep1.length>0){
      winPlayer=namep1;
    }
    else {
      winPlayer='Red Player';
      document.getElementById('input1').value='Red Player';
    }
       winners.push(1);
  }
  document.getElementById('winDraw').innerHTML= winPlayer + " Wins!";
  playAgain();
}

function playAgain(){
  document.getElementById('topRow').style.visibility='hidden';
  document.getElementById('playAgain').style.visibility='visible';
  document.getElementById("playAgain-yes").addEventListener("click", function(){ clearBoard()});
  document.getElementById("playAgain-no").addEventListener("click", function(){ thankYou()});
  var p1Wins=0;
  var p2Wins=0;
  for(var i=0;i<winners.length;i++){
    if(winners[i]===1){
      p1Wins++;
    }
    else {
      p2Wins++;
    }
  }
  document.getElementById('playerOneWins').innerHTML="Wins: " + p1Wins;
  document.getElementById('playerTwoWins').innerHTML="Wins: " + p2Wins;
}

function thankYou(){
  document.getElementById('playAgain').style.visibility='hidden';
  document.getElementById('winDraw').style.visibility='visible';
  document.getElementById('winDraw').innerHTML='Thanks for playing!';
  document.getElementById('board').style.visibility='hidden';
  document.getElementById('p1').src='redplayer2.png';
  document.getElementById('p2').src='yellowplayer2.png';
}

function checkHor(column,placement){
  /*horizontal win check*/
    var piece=board[placement][column-1];
    for (var j=0;j<=2;j++){
      var val=board[placement][j];
      if (val!==0 && board[placement][j+1]===val && board[placement][j+2]===val
        && board[placement][j+3]===val){
          return true;
      }
    }
    return false;
  }
function checkVer(column,placement){
  /*vertical win check*/
    var piece=board[placement][column-1];
    for (var j=0;j<=3;j++){
      var val=board[j][column-1];
      if (val!==0 && board[j+1][column-1]===val && board[j+2][column-1]===val
        && board[j+3][column-1]===val){
          return true;
      }
    }
    return false;
  }


function checkDia1(column,placement){
    /*diagonal down and right win check*/
      var piece=board[placement][column-1];
      for (var j=0;j<=2;j++){
        for (var y=0;y<=3;y++){
        var val=board[y][j];
        if (val!==0 && board[y+1][j+1]===val && board[y+2][j+2]===val
          && board[y+3][j+3]===val){
            return true;
        }
      }
    }
  return false;
  }
function checkDia2(column,placement){
  /*up and right /// */
  var piece=board[placement][column-1];
  for (var j=0;j<=2;j++){
    for (var y=3;y<=6;y++){
    var val=board[y][j];
    if (val!==0 && board[y-1][j+1]===val && board[y-2][j+2]===val
      && board[y-3][j+3]===val){
        return true;
    }
  }
}
return false;
}

function checkDraw(){
  var check=0;
  for (var i=0;i<=5;i++){
    for (var j=0; j<=6;j++){
      if (board[j][i]===0)
        check=1;
    }
  }
  if(check===0)
    return true;
  return false;
}

function removeHover(column){
  var id='ic'+column;
  document.getElementById(id).src='blankWhite.png';
}

function theRules() {
    alert("Object:    To win Connect Four you must be the first player to get four of your colored checkers in a row either horizontally, vertically or diagonally. \n"+
  "\nHover above the board and click to drop your piece into place. " +
  "\n \nReplace 'Red/Yellow player' with whichever name you desire. Please keep it under 25 characters though." +
  "\n \n Good Luck!");
  }

function clearBoard(){
  document.getElementById('winDraw').style.visibility='hidden';
  document.getElementById('playAgain').style.visibility='hidden';
  document.getElementById('topRow').style.visibility='visible';

  board = [[0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0]];
  gameOver=false;
    for(var i=0;i<=6;i++){
      for(var j=1;j<=6;j++){
        var id= i +" "+ j; /*sets up the variable as a string*/
        document.getElementById(id).src='blank.png';
      }
    }
}

function hoverPiece(column){
  var id='ic'+column;
  if(currentPlayer===1){
    var check= document.getElementById(id).src='redhover.png';
  }
  else {
    document.getElementById(id).src='yellowhover.png';
  }
}


/*LISTENERS

Adds listeners to every div element in the board
listeners for mouse move, mouse exit, and click  */
function gameStart(){
  var id="";
  for(var i=1;i<=6;i++){/*top row event listeners*/
    id="c"+i;
    gameStartExt(id,i);
  }
  for(var i=1;i<=7;i++){/* Event listeners by Row*/
    for(var j=1;j<=6;j++){/*Event listeners by column*/
      id=i+"c"+j;
      gameStartExt(id,j);
    }
  }
}

function gameStartExt(id,i){
  document.getElementById(id).addEventListener("mousemove", function (){hoverPiece(i)});
  document.getElementById(id).addEventListener("mouseout", function (){removeHover(i)});
  document.getElementById(id).addEventListener("click", function (){removeHover(i)});
  document.getElementById(id).addEventListener("click", function (){placePiece(i)});
}
