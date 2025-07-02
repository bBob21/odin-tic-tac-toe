function createGameBoard(){
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
        return false
    }
    return {board, checkStatus};
    // TODO restart function 
    // use IIFE
}

function createPlayer(name, symbol, game){
    function logTurn(attempt, row, col){
        console.log(`Attempt ${attempt}: ${symbol} at row ${row} column ${col}`)
        console.log(game.board)
    }
    function takeTurn(row,col){
        board = game.board;
        attempt = true
        if (board[row][col] === ' '){
            board[row][col] = symbol
        }
        else{
            attempt = false
        }
        logTurn(attempt, row, col)
        if (!!game.checkStatus()){
                console.log(`${game.checkStatus()} wins`)
            }
    }
    return {name, symbol, takeTurn}
}

const game = createGameBoard()
const player1 = createPlayer("Alex", "X", game);
const player2 = createPlayer("Tory", "O", game);
gameRun = true
// while (gameRun) {
//     console.log(game)
//     // player1.takeTurn(2, 0)
//     gameRun= false;
// }
