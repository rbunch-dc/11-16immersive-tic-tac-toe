// 1. Set up board
// 2. User should be able to click a box and a mark shows up.
// -- put an onlick in the first square
// -- when user clicks, call function that puts an X in the box.
// MILESTONE
// 3. Put an X on the square.
// 4. keep track of who's turn it is.
// 5. WHen a square is clicked, put the symbol, AND change who's turn it is.
// 6. Keep player from overwriting a square
// 7. We need a win checker...

var whosTurn = 1; //Init whosTurn to player 1.
var player1Squares = [];
var player2Squares = [];
var someoneWon = false;
var computerPlayer = false;

// Set up winners array
var winningCombos = [
	['A1','B1','C1'], //row1
	['A2','B2','C2'], //row2
	['A3','B3','C3'], //row3
	['A1','A2','A3'], //col1
	['B1','B2','B3'], //col2
	['C1','C2','C3'], //col3
	['A1','B2','C3'], //diag1
	['A3','B2','C1'], //diag2
];

console.log(winningCombos);

function onePlayerGame(){
	computerPlayer = true;
}

$('.square').click(function(){
	markSquare(this)
})

function markSquare(currentSquare){
	// console.log(currentSquare.id);
	if((currentSquare.innerHTML === "X") || (currentSquare.innerHTML === "O")){
		// console.log("Someone is there. Stop cheating.");
		return "taken";
	}else if(someoneWon){
		console.log('Someone already won!');
	}else{
		if(whosTurn === 1){
			currentSquare.innerHTML = "X";
			whosTurn = 2;
			player1Squares.push(currentSquare.id);
			checkWin(1, player1Squares);
			if(computerPlayer){
				computerMove();
			}
		}else{
			currentSquare.innerHTML = "O";	
			whosTurn = 1;
			player2Squares.push(currentSquare.id);
			checkWin(2, player2Squares);
		}
	}
}

function computerMove(){
	// Go find a random square
	var needASqaure = true;
	var squareDivs = document.getElementsByClassName('square');
	while(needASqaure){
		var randomNumber =  (Math.ceil(Math.random() * 8)) + 1;
		var randomSquare = squareDivs[randomNumber];
		isTaken = markSquare(randomSquare);
		console.log(isTaken);
		if(isTaken !== "taken"){
			needASqaure = false;
		}
	}
}


function checkWin(whoJustWent, currentPlayerSquares){
	// Outter Loop
	for(var i = 0; i < winningCombos.length; i++){
		// Inner Loop
		var rowCount = 0;
		for(var j = 0; j < winningCombos[i].length; j++){
			// console.log(winningCombos[i][j]);
			var winningSquare = winningCombos[i][j];
			if(currentPlayerSquares.indexOf(winningSquare) > -1){
				//HIT!. Player has this square, somewhere.
				rowCount++;
			}
		}
		if(rowCount === 3){
			// Player had all 3 of these j's. Win. 
			console.log("Player " + whoJustWent + " , won!");
			gameOver(whoJustWent, winningCombos[i]);
			break;
		}
		// console.log("Combo completed");
	}
}

function gameOver(whoJustWon, winningCombo){
	var message = "Congrats to player " + whoJustWon + ". You just won with " + winningCombo;
	$('#message').html(message);
	for(var i=0; i<winningCombo.length; i++){
		document.getElementById(winningCombo[i]).className += ' winning-square';
	}
	someoneWon = true;
}