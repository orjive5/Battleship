//SHIP FACTORY

const Ship = (position, length) => {

    const shipCells = [];


    //     for (let i = position; i < position + (length*10); i+=10){
//         shipCells.push(i);
//     }

    for (let i = position; i < position + length; i++){
        shipCells.push(i);
    }

    const hitAt = [];

    const hit = (cellNumber) => {
        return hitAt.push(cellNumber);
    }

    const isSunk = () => {
        if (hitAt.length >= length){
            return true;
        } else {
            return false;
        }
    }

    return {
        position,
        length,
        shipCells,
        hitAt,
        hit,
        isSunk
    }
}

// GAMEBOARD FACTORY

const Gameboard = () => {

    const shipArray = [];
    let allShipCells = [];

    const createShip = (position, length) => {

        let tryCells = [];

        for (let i = position; i < position + length; i++){
            tryCells.push(i);
        }

        if (tryCells.every(el => el < 100)){

            if (!allShipCells.some(item => tryCells.includes(item))){

                shipArray.push(Ship(position, length));
                allShipCells.push(...tryCells);

                for (let i = position; i < position + length; i++){
                    gridCell[i].classList.add('player-grid-cell-battleship');
                }

            } else {
                console.log('try different length and positions');
            }
        } else if (tryCells.every(el => el > 100) && tryCells.every(el => el < 200)){

            if (!allShipCells.some(item => tryCells.includes(item))){

                shipArray.push(Ship(position, length));
                allShipCells.push(...tryCells);

                for (let i = position; i < position + length; i++){
                    gridCell[i].classList.add('computer-grid-cell-battleship');
                }

            } else {
                console.log('try different length and positions');
            }
        } else {
            console.log('try different length and positions');
        }

        return shipArray;
    }

    const recordMissedShots = [];

    const receiveAttack = (attackPosition) => {

        for (let i = 0; i < shipArray.length; i++){
            if (shipArray[i].shipCells.includes(attackPosition)){
                return shipArray[i].hit(attackPosition);
            }
        }

        if (!recordMissedShots.includes(attackPosition)){
            return recordMissedShots.push(attackPosition);
        } else {
            return recordMissedShots;
        }
    }
    
    const allSunk = () => {

        let sunkArray = [];

        sunkArray = shipArray.map(el => el.isSunk());

        if (sunkArray.includes(false)){
            return false;
        } else {
            return true;
        }
    }
    const gameOver = () => {
        if (allSunk()){

            if (computerGameboard.allSunk()){
                gameOverMessage.innerHTML = `Game over! ${document.querySelector('.player-gameboard-name').innerHTML} wins!`
            } else if (playerGameboard.allSunk()){
                gameOverMessage.innerHTML = 'Game over! Computer wins!'
            }

            computerGameboard.allShipCells.length = 0;
            computerGameboard.recordMissedShots.length = 0;
            computerGameboard.shipArray.length = 0;

            playerGameboard.allShipCells.length = 0;
            playerGameboard.recordMissedShots.length = 0;
            playerGameboard.shipArray.length = 0;

            players.hitComputerCells.length = 0;
            players.hitPlayerCells.length = 0;

            for (let i = 0; i < gridCell.length; i++){
                gridCell[i].classList.remove('grid-cell-hit');
                gridCell[i].classList.remove('grid-cell-attacked');
                gridCell[i].classList.remove('player-grid-cell-battleship');
                gridCell[i].classList.remove('computer-grid-cell-battleship');
            }

            document.querySelector('.ai-gameboard').style.display = 'none';
            document.querySelector('.user-gameboard').style.display = 'none';
            createNewGameButton.style.display = 'initial';
            gameOverMessage.style.display = 'initial';

            document.querySelector('.gameboards').style.justifyContent = 'center';
        }

    }

    return {
        createShip,
        shipArray,
        allShipCells,
        receiveAttack,
        recordMissedShots,
        allSunk,
        gameOver
    }
}

// PLAYERS FACTORY

const Player = () => {

    const hitComputerCells = [];
    const hitPlayerCells = [];

    const playerPlays = () => {

            for (let i = 100; i < gridCell.length; i++){
                gridCell[i].addEventListener('click', () => {
                    if (hitComputerCells.includes(i)){

                        return console.log('Already hit, try different cell')

                    } else if (computerGameboard.recordMissedShots.includes(i)){

                        return console.log('Already attacked, try different cell');

                    } else if (computerGameboard.allShipCells.includes(i)){

                        gridCell[i].classList.add('grid-cell-hit');
                        hitComputerCells.push(i);
                        computerGameboard.receiveAttack(i);
                        computerPlays();
                        computerGameboard.gameOver();

                    } else {

                        gridCell[i].classList.add('grid-cell-attacked');
                        computerGameboard.receiveAttack(i);

                        return computerPlays();

                    }
                });
            }

    }

    const computerPlays = () => {

        const computerAttack = Math.floor(Math.random() * 100);

        if (hitPlayerCells.includes(computerAttack)){
            return computerPlays();

        } else if (playerGameboard.recordMissedShots.includes(computerAttack)){
            return computerPlays();

        } else if (playerGameboard.allShipCells.includes(computerAttack)){

            gridCell[computerAttack].classList.add('grid-cell-hit');
            hitPlayerCells.push(computerAttack);
            playerGameboard.receiveAttack(computerAttack);
            playerGameboard.gameOver();

        } else {

            gridCell[computerAttack].classList.add('grid-cell-attacked');

            playerGameboard.receiveAttack(computerAttack);

        }

    }

    return {
        hitComputerCells,
        hitPlayerCells,
        playerPlays,
        computerPlays
    }
}

//MAIN GAME LOOP

//Select grid cells
const gridCell = document.querySelectorAll('.grid-cell');

//POPULATE GAMEBOARDS

const gameboards = document.querySelector('.gameboards');

//Create gameboards
const playerGameboard = Gameboard();
const computerGameboard = Gameboard();

//POPULATE PLAYER GAMEBOARD

//Append new element to the DOM function
function appendNewElement(element, parent, text, id) {
    const el = document.createElement(element);
    if (text) {
      el.innerHTML = text;
    }
    if (id) {
      el.id = id;
    }
    parent.appendChild(el);
    return el;
}

//Append elements
appendNewElement('div', gameboards, undefined, 'user-information');
const userInformation = document.querySelector('#user-information');
userInformation.style.display = 'flex';
userInformation.style.flexDirection = 'column';

appendNewElement('label', userInformation, 'Enter your name:', 'label-for-username');
const labelForUsername = document.querySelector('#label-for-username');
labelForUsername.setAttribute('for', 'get-username');

appendNewElement('input', userInformation, undefined, 'get-username');
const getUsername = document.querySelector('#get-username');
getUsername.setAttribute('placeholder', 'Your name');
getUsername.setAttribute('type', 'text');

appendNewElement('button', userInformation, 'Start game', 'start-button');
const startButton = document.querySelector('#start-button');

//DRAG AND DROP TO CREATE PLAYER'S FLEET

const dragAndDropShips = document.querySelector('.select-grid');
const playerFleet = document.querySelector('.player-fleet');
const shipLength5 = document.querySelector('.select-grid-length-5');
const shipLength4 = document.querySelector('.select-grid-length-4');
const shipLength3 = document.querySelector('.select-grid-length-3');
const shipLength2 = document.querySelector('.select-grid-length-2');
const shipLength1 = document.querySelector('.select-grid-length-1');
const draggableShips = document.querySelectorAll('.drag-ship');
const rotateButton = document.querySelector('.rotate-button');

rotateButton.addEventListener('click', () => {
    if (shipLength1.classList.contains('select-grid-length-1')){
        shipLength1.classList.remove('select-grid-length-1');
        shipLength1.classList.add('select-grid-length-1-vertical');
        playerFleet.style.flexDirection = 'row';
    } else {
        shipLength1.classList.remove('select-grid-length-1-vertical');
        shipLength1.classList.add('select-grid-length-1');
        playerFleet.style.flexDirection = 'column';
    }
    if (shipLength2.classList.contains('select-grid-length-2')){
        shipLength2.classList.remove('select-grid-length-2');
        shipLength2.classList.add('select-grid-length-2-vertical');
    } else {
        shipLength2.classList.remove('select-grid-length-2-vertical');
        shipLength2.classList.add('select-grid-length-2');
    }
    if (shipLength3.classList.contains('select-grid-length-3')){
        shipLength3.classList.remove('select-grid-length-3');
        shipLength3.classList.add('select-grid-length-3-vertical');
    } else {
        shipLength3.classList.remove('select-grid-length-3-vertical');
        shipLength3.classList.add('select-grid-length-3');
    }
    if (shipLength4.classList.contains('select-grid-length-4')){
        shipLength4.classList.remove('select-grid-length-4');
        shipLength4.classList.add('select-grid-length-4-vertical');
    } else {
        shipLength4.classList.remove('select-grid-length-4-vertical');
        shipLength4.classList.add('select-grid-length-4');
    }
    if (shipLength5.classList.contains('select-grid-length-5')){
        shipLength5.classList.remove('select-grid-length-5');
        shipLength5.classList.add('select-grid-length-5-vertical');
    } else {
        shipLength5.classList.remove('select-grid-length-5-vertical');
        shipLength5.classList.add('select-grid-length-5');
    }
})

for (let i = 0; i < draggableShips.length; i++){
    draggableShips[i].addEventListener('dragstart', (ev) => {
        ev.dataTransfer.setData("text", ev.target.className.split(" ")[0]);
    })
}

document.querySelector('.player-gameboard').addEventListener('dragover', (ev) => {
    ev.preventDefault();
});

document.querySelector('.player-gameboard').addEventListener('drop', (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    const shipLength = document.querySelector(`.${data}`).getElementsByTagName('*').length;
    ev.target.classList.add('drop-target-cell');
    const getTakenCells = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
    for (let i = 0; i < 100; i++) {
        let takenCells = getTakenCells(i, (i + shipLength - 1));
        let checkCells = takenCells.map(el => !gridCell[el].classList.contains('player-grid-cell-battleship'));
        if (gridCell[i].classList.contains('drop-target-cell')){
            if (i + shipLength <= 100 && checkCells.every(v => v === true)){
                playerGameboard.createShip(i, shipLength);
                gridCell[i].classList.remove('drop-target-cell');
                document.querySelector(`.${data}`).style.display = 'none';
            } else {
                gridCell[i].classList.remove('drop-target-cell');
            }
        }
    }
    
});


//Name player's gameboard
getUsername.addEventListener('input', () => {
    document.querySelector('.player-gameboard-name').innerHTML = getUsername.value;
});

//Populate Computer gameboard
function populateComputerGameboard() {
    if (computerGameboard.shipArray.length < 5){
        for (let i = 1; i < 6; i++){
            computerGameboard.createShip(Math.floor(Math.random() * 100 + 100), i);
        }
        let createdShipLengths = [];
        computerGameboard.shipArray.forEach(element => createdShipLengths.push(element.length));
        let requiredLengths = [1,2,3,4,5];
        let differenceLengths = requiredLengths.filter(x => !createdShipLengths.includes(x));
        while (differenceLengths.length > 0){
            for (let j = 0; j < differenceLengths.length; j++){
                computerGameboard.createShip(Math.floor(Math.random() * 100 + 100), differenceLengths[j]);
            };
            computerGameboard.shipArray.forEach(element => createdShipLengths.push(element.length));
            differenceLengths = requiredLengths.filter(x => !createdShipLengths.includes(x));
        }
    }
}

//START THE GAME BY CLICKING THE START BUTTON

startButton.addEventListener('click', () => {
    if (playerGameboard.shipArray.length === 5){
        userInformation.style.display = 'none';
        document.querySelector('.ai-gameboard').style.display = 'initial';
        populateComputerGameboard();
    }
});

//CREATE PLAYERS

const players = Player();

players.playerPlays();

//Game Over & Create New Game

appendNewElement(
    'h1',
    document.querySelector('.gameboards'),
    `GAME OVER`,
    'game-over-message'
    );

    const gameOverMessage = document.querySelector('#game-over-message');
    gameOverMessage.style.display = 'none';

appendNewElement(
    'button', 
     document.querySelector('.gameboards'), 
     'Create New Game', 
     'create-new-game-button'
    );

const createNewGameButton = document.querySelector('#create-new-game-button');
createNewGameButton.style.display = 'none';
createNewGameButton.addEventListener('click', () => {
    createNewGameButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    userInformation.style.display = 'flex';
    document.querySelector('.user-gameboard').style.display = 'initial';
    document.querySelector('.gameboards').style.justifyContent = 'space-around';
    draggableShips.forEach(element => element.style.display = 'grid');
});