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
    if(currentPlayer==1){
      winPlayer='Yellow';
      winners.push(2);
    }
    else {
      winPlayer='Red';
      winners.push(1);
    }
    document.getElementById('winDraw').innerHTML= winPlayer + " Player Wins!";
    playAgain();

  }
  if(draw==true){
    document.getElementById('winDraw').style.visibility='visible';
    document.getElementById('winDraw').innerHTML='A Draw!' ;
    playAgain();


  }

/*
TRY TO MAKE WHOLE COLUMS HOVER ABLE INSTEAD OF JUST TOP row
*/
}

function playAgain(){
  document.getElementById('topRow').style.visibility='hidden';
  document.getElementById('playAgain').style.visibility='visible';
  document.getElementById("playAgain-yes").addEventListener("click", function(){ clearBoard()});
  document.getElementById("playAgain-no").addEventListener("click", function(){ thankYou()});
  var p1Wins=0;
  var p2Wins=0;
  for(var i=0;i<winners.length;i++){
    if(winners[i]==1){
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
  document.getElementById('topRow').style.visibility='visible';



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
