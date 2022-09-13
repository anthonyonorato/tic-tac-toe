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
        winCondition.forEach((condition) => {
            const match = playerX.some((matchedCondition) => condition.includes(matchedCondition));
            console.log(match);
        });
    };

    // cycle the turn of the players
    switch (cyclePlayerTurn()) {
        // Player X's turn
        case 0:
            grid.textContent = "X";
            playerX.push(index);
            playerX.sort(sortCallBackFn);
            console.log("Player X's array: ${playerX}");
            // logs "Player O's turn"
            targetDOM().playerXTitle.style.display = "none";
            targetDOM().playerOTitle.style.display = "block";
            break;
        case 1:
            grid.textContent = "0";
            playerO.push(index);
            playerO.sort(sortCallBackFn);
            console.log("Player X's array: ${playerO}");
            // logs "Player X's turn"
            targetDOM().playerXTitle.style.display = "block";
            targetDOM().playerOTitle.style.display = "none";
            break;
    };
};

// DOM manipulation

let targetDOM = () => {
    let gridID = "grid-"
    const restartButton_DOM = document.querySelector("#restart-button");
    const gridArray = [];
    for (let i = 0; i < 9; i++) {
        gridArray.push(gridID + i);
    };
    const grids_DOM = gridArray.map((grid) => document.querySelector("#${grid}"));
    const playerXTitle = document.getElementById("player-x-title");
    const playerOTitle = document.getElementById("player-o-title");
    return {restartButton_DOM, grids_DOM, gridArray, playerXTitle, playerOTitle};
};

