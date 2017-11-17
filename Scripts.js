/*GLOBAL VARIABLES*/

var player1=1, player2=2;
var turn=1;
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
  var i=6
  var placement=6;
  if(gameOver==false){
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
  if(checkDraw(board)){
    draw=true;
  }
  if(checkHor(board,column, placement)){
    winningMove=true;
  }
  if(checkVer(board,column, placement)){
    winningMove=true;
  }
  if(checkDia1(board,column, placement)){
    winningMove=true;
  }
  if(checkDia2(board,column, placement)){
    winningMove=true;
  }
  if(winningMove===true){
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
      if (namep1.length<25){
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

  if(draw===true && winningMove===false){
    document.getElementById('winDraw').style.visibility='visible';
    document.getElementById('winDraw').innerHTML='A Draw!' ;
    playAgain();
    gameOver=true;
  }
}

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

function checkHor(board,column,placement){
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
function checkVer(board,column,placement){
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


function checkDia1(board,column,placement){
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
function checkDia2(board,column,placement){
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

function checkDraw(board){
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
  "\nHover above the board and click to drop your piece into place. Good Luck!" +
  "\n \nReplace 'Red/Yellow player' with whichever name you desire. Please keep it under 25 characters though.");
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

document.getElementById("1c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("1c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("1c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("1c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("1c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("1c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("1c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("1c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("1c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("1c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("1c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("1c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("1c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("1c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("1c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("1c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("1c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("1c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("1c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("1c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("1c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("1c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("1c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("1c6").addEventListener("click", function (){placePiece(6)});

document.getElementById("2c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("2c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("2c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("2c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("2c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("2c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("2c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("2c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("2c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("2c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("2c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("2c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("2c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("2c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("2c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("2c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("2c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("2c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("2c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("2c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("2c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("2c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("2c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("2c6").addEventListener("click", function (){placePiece(6)});

document.getElementById("3c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("3c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("3c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("3c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("3c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("3c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("3c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("3c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("3c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("3c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("3c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("3c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("3c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("3c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("3c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("3c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("3c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("3c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("3c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("3c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("3c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("3c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("3c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("3c6").addEventListener("click", function (){placePiece(6)});

document.getElementById("4c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("4c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("4c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("4c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("4c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("4c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("4c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("4c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("4c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("4c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("4c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("4c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("4c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("4c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("4c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("4c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("4c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("4c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("4c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("4c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("4c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("4c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("4c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("4c6").addEventListener("click", function (){placePiece(6)});

document.getElementById("5c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("5c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("5c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("5c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("5c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("5c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("5c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("5c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("5c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("5c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("5c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("5c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("5c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("5c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("5c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("5c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("5c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("5c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("5c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("5c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("5c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("5c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("5c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("5c6").addEventListener("click", function (){placePiece(6)});

document.getElementById("6c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("6c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("6c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("6c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("6c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("6c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("6c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("6c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("6c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("6c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("6c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("6c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("6c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("6c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("6c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("6c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("6c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("6c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("6c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("6c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("6c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("6c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("6c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("6c6").addEventListener("click", function (){placePiece(6)});

document.getElementById("7c1").addEventListener("mousemove", function (){hoverPiece(1)});
document.getElementById("7c2").addEventListener("mousemove", function (){hoverPiece(2)});
document.getElementById("7c3").addEventListener("mousemove", function (){hoverPiece(3)});
document.getElementById("7c4").addEventListener("mousemove", function (){hoverPiece(4)});
document.getElementById("7c5").addEventListener("mousemove", function (){hoverPiece(5)});
document.getElementById("7c6").addEventListener("mousemove", function (){hoverPiece(6)});
document.getElementById("7c1").addEventListener("mouseout", function (){removeHover(1)});
document.getElementById("7c2").addEventListener("mouseout", function (){removeHover(2)});
document.getElementById("7c3").addEventListener("mouseout", function (){removeHover(3)});
document.getElementById("7c4").addEventListener("mouseout", function (){removeHover(4)});
document.getElementById("7c5").addEventListener("mouseout", function (){removeHover(5)});
document.getElementById("7c6").addEventListener("mouseout", function (){removeHover(6)});
document.getElementById("7c1").addEventListener("click", function (){removeHover(1)});
document.getElementById("7c2").addEventListener("click", function (){removeHover(2)});
document.getElementById("7c3").addEventListener("click", function (){removeHover(3)});
document.getElementById("7c4").addEventListener("click", function (){removeHover(4)});
document.getElementById("7c5").addEventListener("click", function (){removeHover(5)});
document.getElementById("7c6").addEventListener("click", function (){removeHover(6)});
document.getElementById("7c1").addEventListener("click", function (){placePiece(1)});
document.getElementById("7c2").addEventListener("click", function (){placePiece(2)});
document.getElementById("7c3").addEventListener("click", function (){placePiece(3)});
document.getElementById("7c4").addEventListener("click", function (){placePiece(4)});
document.getElementById("7c5").addEventListener("click", function (){placePiece(5)});
document.getElementById("7c6").addEventListener("click", function (){placePiece(6)});

}
