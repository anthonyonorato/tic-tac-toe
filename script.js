//array for players
const playerX = [];
const playerO = [];

//player turn cycle
let count = 0;
const cyclePlayerTurn = () => {
    const turnArray = ["X", "O"];
    let turn = count % turnArray.length;
    count++;
    return turn;
};

//game logic

const gameLogic = (grid, index) => {
    const sortCallBackFn = (a, b) => a - b;
    const checkWinner = () => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
    }
}