# Connect-4
<b>README</b>

This is a Connect 4 web-based game. Players hover their cursor over the board to select a column and then click to ‘drop’ their piece into place. The rules are standard Connect 4 rules. The first player to get 4 pieces in a row (either horizontally, vertically, or diagonally) wins. After a winning move, the players are prompted if they want to play again. If they click yes, the board is reset and the player who lost begins the new game. If they click no, the board remains the same and the players are thanked for playing.

<b>Features:</b>

The active player is indicated by a highlighted playing piece under their name. The piece shown from hovering over the board also indicates the active player.

By default the players are known as the Red Player or Yellow Player. However, by clicking on the names, a user can enter any name he/she chooses. There is a limit on 25 characters or less to prevent display issues.  The player must also enter something/ the name field must not be blank. If either of these restrictions happens, the game will use their default names. These names are used to declare winners. 

The page is setup for tournament style play, with a scoreboard present to allow ‘best of #’s of games’. To start over from a 0-0 score; there is the ‘Reset Games’ button at the top.  

If a player attempts to place a piece in an invalid location (i.e. in a column that is already full) they are prompted to pick a different location. 

If a draw happens, the players are prompted if they wish to play again and no score is added to the board.

<b>Technical:</b>

The project uses HTML/ CSS / JavaScript.
All three of these languages have their own files labeled:
‘index.html’
‘style.css’
‘Scripts.js’




