class Player{
    constructor(symbol, game){
        this._symbol = symbol;
        this.game = game;
    }
    get symbol(){
        return this._symbol;
    }
    set symbol(s){
        this._symbol = s;
    }

    #logTurn = (validAttempt, row, col) => {
        console.log(`Attempt ${validAttempt}: ${this.symbol} at row ${row} column ${col}`)
        this.game.showBoard()
    }
    takeTurn = ([row,col]) => {
        board = this.game.board;
        let validAttempt = true;
        if (board[row][col] === ' '){
            board[row][col] = this.symbol;
        }
        else{
            validAttempt = false;
        }
        this.#logTurn(validAttempt, row, col)
        return validAttempt;
    }
}

class GameLogic{
    constructor(){
        this._currPlayer = 0;
    }

    get currPlayer(){
        return this._currPlayer;
    }

    toggleCurrPlayer = () =>{
        console.log("first",this.currPlayer)
        this._currPlayer = this.currPlayer ? 0 : 1;
        console.log("after",this.currPlayer)
    }

    renderBoard = () =>{
        const domBoard = document.getElementById("board");
        domBoard.replaceChildren();
        const domGameStatus = document.querySelector(".gameStatus");
        domGameStatus.textContent = `${PLAYERS[this.currPlayer].symbol}'s turn`;

        for (let r = 0; r < ROWS; r++){
            for (let c = 0; c < COLUMNS; c++){
                const cell = document.createElement("button")
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;

                cell.addEventListener("click",() =>{
                    console.log(`row ${cell.dataset.row}`);
                    console.log(`col ${cell.dataset.col}`);
                    
                    let p = PLAYERS[this.currPlayer]
                    let validTurn = p.takeTurn([cell.dataset.row, cell.dataset.col]) 
                    if (validTurn){
                        cell.textContent = p.symbol;
                        this.toggleCurrPlayer();
                        p = PLAYERS[this.currPlayer]
                    }
                    domGameStatus.textContent = `${p.symbol}'s turn`;

                    let winStatus = this.checkStatus();
                    if (!!winStatus){
                        if (winStatus == "draw"){
                            domGameStatus.textContent = "Draw, noone wins"
                            console.log("Draw")
                        }
                        else{
                            domGameStatus.textContent = `${winStatus} wins`;
                            console.log(`${winStatus} wins`);
                        }
                        let cells = document.querySelectorAll(".cell");
                        cells.forEach(cell => {
                            cell.disabled = true;
                        })
                    }
                });
                domBoard.appendChild(cell);
            }
        }
    }
}

const game = new (class GameBoard extends GameLogic{
    constructor(){
        super();
        this.board = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
    }

    resetBoard = () => {
        for (let r = 0; r < this.board.length; r++){
            for (let c = 0; c < this.board[r].length; c++){
                this.board[r][c] = ' ';
            }
        }
        console.log(board)
    }
    setWinColor(coordinates){
        console.log(coordinates)
        for (let coord of coordinates){
            let winningCell = document.querySelector(`[data-row="${coord[0]}"][data-col="${coord[1]}"]`)
            winningCell.classList.add("winningCell");
        }
    }
    checkStatus = () => {
        // TODO fix this ugly af
        let board = this.board;
        for (let r = 0; r < board.length; r++){
            if (board[r][0] === board[r][1] && board[r][1] === board[r][2] && board[r][2] !== ' '){
                this.setWinColor([[r,0],[r,1],[r,2]])
                return board[r][0];
            }
        }
        for (let c = 0; c < board[0].length; c++){
            if (board[0][c] === board[1][c] && board[1][c] === board[2][c] && board[2][c] !== ' '){
                this.setWinColor([[0,c],[1,c],[2,c]])
                return board[0][c];
            }
        }
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[2][2] !== ' '){
            this.setWinColor([[0,0],[1,1],[2,2]])
            return board[1][1];
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2] && board[0][2] !== ' '){
            this.setWinColor([[2,0],[1,1],[0,2]])
            return board[1][1]
        }
        if (!board.flat().includes(' ')){
            return "draw";
        }
        return false;
    }
    showBoard = () => {
        for (let r = 0; r < this.board.length; r++){
            console.log(this.board[r]);
        }
    }
});

// ----------------------------------------
const domResetBtn = document.querySelector(".resetBtn");
domResetBtn.addEventListener("click", () => {
    game.resetBoard();
    game.renderBoard();
})
const player1 = new Player("X", game);
const player2 = new Player("O", game);
const PLAYERS = [player1, player2]

const ROWS = 3;
const COLUMNS = 3;

game.renderBoard();