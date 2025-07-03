function createPlayer(symbol, game){
    function logTurn(attempt, row, col){
        console.log(`Attempt ${attempt}: ${symbol} at row ${row} column ${col}`)
        game.showBoard()
    }
    function takeTurn([row,col]){
        board = game.board;
        attempt = true;
        if (board[row][col] === ' '){
            board[row][col] = symbol;
        }
        else{
            attempt = false;
        }
        logTurn(attempt, row, col)
        return attempt;
    }
    return {symbol, takeTurn}
}

const game = (function (){
    const board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    function checkStatus(){
        // TODO fix this ugly af
        for (let r = 0; r < board.length; r++){
            if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][2] !== ' '){
                return board[r][0];
            }
        }
        for (let c = 0; c < board[0].length; c++){
            if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[2][c] !== ' '){
                return board[0][c];
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== ' '){
            return board[1][1];
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] !== ' '){
            return board[1][1]
        }
        if (!board.flat().includes(' ')){
            return "draw";
        }
        return false
    }
    function showBoard(){
        for (let r = 0; r < board.length; r++){
            console.log(board[r])
        }
    }
    return {board, checkStatus, showBoard};
})();

// ----------------------------------------
const player1 = createPlayer("X", game);
const player2 = createPlayer("O", game);
const players = [player1, player2]

const ROWS = 3;
const COLUMNS = 3;
const domBoard = document.getElementById("board");
const domWinMessage = document.querySelector(".winMessage");

const observer = new MutationObserver(() =>{
    console.log("Disabled board");
    let cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.disabled = true;
    })
})

observer.observe(domWinMessage, {
    characterData:true,
    subtree:true,
    childList:true,
})

let currPlayer = 0;
for (let r = 0; r < ROWS; r++){
    for (let c = 0; c < COLUMNS; c++){
        const cell = document.createElement("button")
        cell.classList.add("cell");
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("click",() =>{
            console.log(`row ${cell.dataset.row}`);
            console.log(`col ${cell.dataset.col}`);
            
            let p = players[currPlayer]
            let validTurn = p.takeTurn([cell.dataset.row, cell.dataset.col]) 
            if (validTurn){
                cell.textContent = players[currPlayer].symbol;
                if (currPlayer == 0){
                    currPlayer++;
                }
                else{
                    currPlayer--;
                }
            }
            winStatus = game.checkStatus();
            if (!!winStatus){
                gameRun = false;
                if (winStatus == "draw"){
                    domWinMessage.textContent = "Draw, noone wins"
                    console.log("Draw")
                }
                else{
                domWinMessage.textContent = `${winStatus} wins`;
                console.log(`${winStatus} wins`);
                }
            }
        });
        domBoard.appendChild(cell);
    }
}

