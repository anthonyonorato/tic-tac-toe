(function () {
    console.log(`Hello World!`);
    
    //global variables
    let oTurn;
    const X_class = "x";
    const O_class = "o";
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // target DOM elements
    function targetDomElement () {
        const cells_DOM = document.querySelectorAll(`[data-cell]`);
        const restartButton_DOM = document.querySelector(`#restart-button`);
        const gameBoard_DOM = document.getElementById(`game-board`);
        const winningMessage_DOM = document.querySelector(`[data-winning-message-text]`);
        const winningMessageContainer_DOM = document.querySelector(`.winning-message-container`);
        return {cells_DOM, restartButton_DOM, gameBoard_DOM, winningMessage_DOM, winningMessageContainer_DOM};
   };

   startGame();

   targetDomElement().restartButton_DOM.addEventListener(`click`, startGame);
   
   // addEventListener
   function startGame() {
       oTurn = false;
       targetDomElement().cells_DOM.forEach((cell, index) => {
           cell.classList.remove(X_class);
           cell.classList.remove(O_class);
           cell.removeEventListener(`click`, eventListenerCallBackFN);
           cell.addEventListener(`click`, eventListenerCallBackFN, {once: true});
       });
       setBoardHoverClass();
       targetDomElement().winningMessageContainer_DOM.classList.remove(`show`);
   }

   
   function eventListenerCallBackFN (e) {
       const cell = e.target;
       const currentClass = oTurn ? O_class : X_class;
       placeMark(cell, currentClass);
       if (checkWin(currentClass)) {
           endGame(false);
       } else if (isDraw()) {
           endGame(true);
       } else {
           swapTurn();
           setBoardHoverClass();    
       }
   }

   function endGame (draw) {
       if (draw) {
           targetDomElement().winningMessage_DOM.textContent = `Draw!`;
       } else {
           targetDomElement().winningMessage_DOM.textContent = `${oTurn ? "Player O has won!" : "Player X has won!"}`
       }
       targetDomElement().winningMessageContainer_DOM.classList.add(`show`);
   }

   function isDraw () {
       return [...targetDomElement().cells_DOM].every((cell) => {
           return cell.classList.contains(X_class) || cell.classList.contains(O_class)
       })
   }

   function placeMark (cell, currentClass) {
       cell.classList.add(currentClass);
   }

   function swapTurn () {
     oTurn = !oTurn;
   }

   function setBoardHoverClass () {
       targetDomElement().gameBoard_DOM.classList.remove(X_class);
       targetDomElement().gameBoard_DOM.classList.remove(O_class);
       if (oTurn) {
           targetDomElement().gameBoard_DOM.classList.add(O_class);
       } else {
           targetDomElement().gameBoard_DOM.classList.add(X_class);
       }
   }

   function checkWin(currentClass) {
       return winningCombination.some((combination) => {
           return combination.every((index) => {
               return targetDomElement().cells_DOM[index].classList.contains(currentClass);
           })
       })
   }

 })()