/*GLOBAL VARIABLES*/

var player1=1, player2=2;
var turn=1;
var currentPlayer=1;
var win=0;
var winningPlayer=0;
var pieceLocation=-1;
var winners=[];


var board = [[0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0]];

/*LISTENERS*/
function gameStart(){
document.getElementById("c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("c6").addEventListener("mousemove", function (){hoverPiece(6)});

document.getElementById("c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("c6").addEventListener("mouseout", function (){removeHover(6)});

document.getElementById("c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("c6").addEventListener("click", function (){removeHover(6)});

document.getElementById("c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("c6").addEventListener("click", function (){placePiece(6)});
}



/*FUNCTIONS*/
function placePiece(column){
  var winningMove=false;
  var draw=false;
  var i=6
  var placement=6;
  for(i;i>=0;i--){
    if(board[i][column-1]==0){

        board[i][column-1]=currentPlayer;
        var id= i +" "+ column; /*sets up the variable as a string*/

        if(currentPlayer==1){
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
    else if(i==0){
      /*no placement allowed*/
      alert("Please click on a valid placement.");
    }
  }
  if(checkDraw(board)==true){
    draw=true;
  }
  /*check board for winner ()*/

  if(checkHor(board,column, placement)){
    winningMove=true;
  }
  if(checkVer(board,column, placement)){
    winningMove=true;
  }
  if(checkDia1(board,column, placement)==true){
    winningMove=true;
  }
  if(checkDia2(board,column, placement)){
    winningMove=true;
  }


  if(winningMove==true){
    var winPlayer;
    document.getElementById('winDraw').style.visibility='visible';
    if(currentPlayer==1)
      winPlayer='Yellow';
    else {
      winPlayer='Red';
    }
    document.getElementById('winDraw').innerHTML= winPlayer + " Player Wins!";
    playAgain();
    /*make a html element that displays the most recent winner
    ask for a new game
    wipes the board to a new one
    and updates the score board*/
  }
  if(draw==true){
    document.getElementById('winDraw').style.visibility='visible';
    document.getElementById('winDraw').innerHTML='A Draw!' ;
    playAgain();

    /*display in the previous winner html element a draw
    ask for a new game
    no update to score board
    consider combinging the wipe board function and a new game question*/

  }

/*
TRY TO MAKE WHOLE COLUMS HOVER ABLE INSTEAD OF JUST TOP row
SCORE BOARD AND RESETTING THE BOARD BY REPLACING INNER HTML WITH ORIG code
*/
}

function playAgain(){
  document.getElementById('playAgain').style.visibility='visible';
  document.getElementById("playAgain-yes").addEventListener("click", function(){ clearBoard()});
  document.getElementById("playAgain-no").addEventListener("click", function(){ thankYou()});

}
function thankYou(){
  document.getElementById('playAgain').style.visibility='hidden';
  document.getElementById('winDraw').style.visibility='visible';
  document.getElementById('winDraw').innerHTML='Thanks for playing!';
  document.getElementById('board').style.visibility='hidden';




}

function checkHor(board,column,placement){
  /*horizontal win check*/
    var piece=board[placement][column-1];
    for (var j=0;j<=2;j++){
      var val=board[placement][j];
      if (board[placement][j+1]==val && board[placement][j+2]==val
        && board[placement][j+3]==val && val!=0){
          return true;
      }
    }
    return false;
  }
function checkVer(board,column,placement){
  /*vertical win check*/
    var piece=board[placement][column-1];
    for (var j=0;j<=3;j++){
      var val=board[j][column-1];
      if (board[j+1][column-1]==val && board[j+2][column-1]==val
        && board[j+3][column-1]==val && val!=0){
          return true;
      }
    }
    return false;
  }


function checkDia1(board,column,placement){
    /*diagonal down and right win check*/
      var piece=board[placement][column-1];
      for (var j=0;j<=2;j++){
        for (var y=0;y<=3;y++){
        var val=board[y][j];
        if (board[y+1][j+1]==val && board[y+2][j+2]==val
          && board[y+3][j+3]==val && val!=0){
            return true;
        }
      }
    }
  return false;
  }
function checkDia2(board,column,placement){
  /*up and right /// */
  var piece=board[placement][column-1];
  for (var j=0;j<=2;j++){
    for (var y=3;y<=6;y++){
    var val=board[y][j];
    if (board[y-1][j+1]==val && board[y-2][j+2]==val
      && board[y-3][j+3]==val && val!=0){
        return true;
    }
  }
}
return false;
}

function checkDraw(board){
  var check=0;
  for (var i=0;i<=5;i++){
    for (var j=0; j<=6;j++){
      if (board[j][i]==0)
        check=1;
    }
  }
  if(check==0)
    return true;
  return false;
}

function removeHover(column){
  var id='ic'+column;
  document.getElementById(id).src='blankWhite.png';

}

function removeBoardEvents(){
/*make board unresponsive*/
  clearBoard();
}

function clearBoard(){
  document.getElementById('winDraw').style.visibility='hidden';
  document.getElementById('playAgain').style.visibility='hidden';
  /*switch player so loser starts*/
  if(currentPlayer==1)
    currentPlayer=2;
  else {
    currentPlayer=1;
  }

  board = [[0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0],
               [0,0,0,0,0,0]];
    for(var i=0;i<=6;i++){
      for(var j=1;j<=6;j++){
        var id= i +" "+ j; /*sets up the variable as a string*/
        document.getElementById(id).src='blank.png';
      }
    }
}

function hoverPiece(column){

  var id='ic'+column;
  if(currentPlayer==1){
    var check= document.getElementById(id).src='redhover.png';
  }
  else {
    document.getElementById(id).src='yellowhover.png';
  }

}

/*START OF FUNCTIONS*/
  /*highlight current players piece*/

/*

-add to the board text wise
-change image to whatever is highest
#check for victory
-check for Draw
-switch current player2

use this once columns fill up
  "column_id".removeEventListener("click", myFunction);
*/


/*
  if(checkDraw(board)==true){
    alert("A Draw! Play again to determine the winner!");
  }

  currentPlayer= nextPlayer(player1, player2, currentPlayer);
  highlightPlayer(currentPlayer);


function placePiece( board, currentPlayer ){



}

function highlightPlayer(currentPlayer){
  if(currentPlayer=='p1'){
    document.getElementById('p1').src='redplayer1.png';
    document.getElementById('p2').src='yellowplayer2.png';
  }
  if(currentPlayer=='p2'){
    document.getElementById('p1').src='redplayer2.png';
    document.getElementById('p2').src='yellowplayer1.png';
  }
}

function nextPlayer( player1,  player2,  currentPlayer){
  if(currentPlayer==player1)
    currentPlayer=player2;
  else{
    currentPlayer=player1;
  }
  return currentPlayer;
}

function checkDraw( board){
  var i=0, j=0;
  for (i,i<5;i++){
    for (j,j<6;j++){
      if (board[i][j]==0)
        return true;
      else {
        return false;
      }
    }
  }
}


{
/* and prompt for a new game..
document.getElementById('play').innerHTMl='Play again?';
document.getElementById('play').style.display='inline';
/*need a score board update function
}




/* upon a winner, html play again prompts at the bottom

*/
