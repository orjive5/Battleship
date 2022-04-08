//SHIP FACTORY

const Ship = (position, length, direction) => {

    const shipCells = [];

    if (direction === 'vertical'){
        for (let i = position; i < position + (length*10); i+=10){
            shipCells.push(i);
        }
    } else {
        for (let i = position; i < position + length; i++){
            shipCells.push(i);
        }
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
        direction,
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

    const createShip = (position, length, direction) => {

        let tryCells = [];

        if (direction === 'vertical'){

            for (let i = position; i < position + (length*10); i+=10){
                tryCells.push(i);
            }
    
            if (tryCells.every(el => el < 100)){
    
                if (!allShipCells.some(item => tryCells.includes(item))){
    
                    shipArray.push(Ship(position, length, direction));
                    allShipCells.push(...tryCells);
    
                    for (let i = position; i < position + (length*10); i+=10){
                        gridCell[i].classList.add('player-grid-cell-battleship');
                    }
    
                }
            } else if (tryCells.every(el => el > 100) && tryCells.every(el => el < 200)){
    
                if (!allShipCells.some(item => tryCells.includes(item))){
    
                    shipArray.push(Ship(position, length, direction));
                    allShipCells.push(...tryCells);
    
                    for (let i = position; i < position + (length*10); i+=10){
                        gridCell[i].classList.add('computer-grid-cell-battleship');
                    }
    
                }
            }

        } else if (direction === undefined) {

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

            }
        } else if (tryCells.every(el => el > 100) && tryCells.every(el => el < 200)){

            if (!allShipCells.some(item => tryCells.includes(item))){

                shipArray.push(Ship(position, length));
                allShipCells.push(...tryCells);

                for (let i = position; i < position + length; i++){
                    gridCell[i].classList.add('computer-grid-cell-battleship');
                }

            }
        }
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
                gameOverMessage.innerHTML = `GAME OVER! ${document.querySelector('.player-gameboard-name').innerHTML} WINS!`
            } else if (playerGameboard.allSunk()){
                gameOverMessage.innerHTML = 'GAME OVER! COMPUTER WINS!'
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
                gridCell[i].classList.remove('computer-battleship-sunk');
            }

            document.querySelector('.ai-gameboard').style.display = 'none';
            document.querySelector('.user-gameboard').style.display = 'none';
            gameOverDiv.style.display = 'flex';
            gameOverDiv.style.gap = '30px';
            gameOverDiv.style.flexDirection = 'column';
            createNewGameButton.style.display = 'initial';
            gameOverMessage.style.display = 'initial';
            gameOverMessage.style.fontSize = '2rem';

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

//POPULATE PLAYER'S GAMEBOARD

//Append new element to the DOM - utility function
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

//DRAG AND DROP TO CREATE PLAYER'S FLEET

const dragAndDropShips = document.querySelector('.select-grid');

const selectShipsDiv = document.querySelector('.select-ships-div');

const dragShipsDiv = document.querySelector('.drag-ships-div');

const playerFleet = document.querySelector('.player-fleet');

const shipLength1 = document.querySelector('.select-grid-length-1');
const shipLength2 = document.querySelector('.select-grid-length-2');
const shipLength3 = document.querySelector('.select-grid-length-3');
const shipLength4 = document.querySelector('.select-grid-length-4');
const shipLength5 = document.querySelector('.select-grid-length-5');

const draggableShips = document.querySelectorAll('.drag-ship');

const rotateButton = document.querySelector('.rotate-button');

rotateButton.addEventListener('click', () => {
    if (!shipLength1.classList.contains('vertical')){
        shipLength1.classList.add('vertical');
        playerFleet.style.flexDirection = 'row';
    } else {
        shipLength1.classList.remove('vertical');
        playerFleet.style.flexDirection = 'column';
    }
    if (!shipLength2.classList.contains('vertical')){
        shipLength2.classList.add('vertical');
    } else {
        shipLength2.classList.remove('vertical');
    }
    if (!shipLength3.classList.contains('vertical')){
        shipLength3.classList.add('vertical');
    } else {
        shipLength3.classList.remove('vertical');
    }
    if (!shipLength4.classList.contains('vertical')){
        shipLength4.classList.add('vertical');
    } else {
        shipLength4.classList.remove('vertical');
    }
    if (!shipLength5.classList.contains('vertical')){
        shipLength5.classList.add('vertical');
    } else {
        shipLength5.classList.remove('vertical');
    }
});

for (let i = 0; i < draggableShips.length; i++){
    draggableShips[i].addEventListener('dragstart', (ev) => {
        ev.dataTransfer.setData("text", ev.target.classList);
    })
}

document.querySelector('.player-gameboard').addEventListener('dragover', (ev) => {
    ev.preventDefault();
    if (!ev.target.classList.contains('player-grid-cell-battleship')){
        ev.target.classList.add('drag-target-cell');
    }
});

document.querySelector('.player-gameboard').addEventListener('dragleave', (ev) => {
    ev.preventDefault();
    ev.target.classList.remove('drag-target-cell');
});

document.querySelector('.player-gameboard').addEventListener('drop', (ev) => {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    let dataSplit = data.split(' ');
    const shipLength = document.querySelector(`.${dataSplit[1]}`).getElementsByTagName('*').length;
    ev.target.classList.add('drop-target-cell');
    if (dataSplit.includes('vertical')){
        for (let i = 0; i < 100; i++){
            if (gridCell[i].classList.contains('drop-target-cell')){
                let takenVerticalCells = [];
                for (let j = i; j <= i + (shipLength*10-10); j+= 10){
                    takenVerticalCells.push(j);
                }
                let checkVerticalCells = takenVerticalCells.map(el => !gridCell[el].classList.contains('player-grid-cell-battleship'));
                if (i + (shipLength*10-10) < 100 && checkVerticalCells.every(v => v === true)){
                    playerGameboard.createShip(i, shipLength, 'vertical');
                    gridCell[i].classList.remove('drop-target-cell');
                    document.querySelector(`.${dataSplit[1]}`).style.display = 'none';
                } else {
                    gridCell[i].classList.remove('drop-target-cell');
                }
            }
        }
    } else {
        const getTakenCells = (min, max) => [...Array(max - min + 1).keys()].map(i => i + min);
        for (let i = 0; i < 100; i++) {
            let takenCells = getTakenCells(i, (i + shipLength - 1));
            let checkCells = takenCells.map(el => !gridCell[el].classList.contains('player-grid-cell-battleship'));
            if (gridCell[i].classList.contains('drop-target-cell')){
                if (i + shipLength <= 100 && checkCells.every(v => v === true) && i+(shipLength-1) < i+(10-i%10)){
                    playerGameboard.createShip(i, shipLength);
                    gridCell[i].classList.remove('drop-target-cell');
                    document.querySelector(`.${dataSplit[1]}`).style.display = 'none';
                } else {
                    gridCell[i].classList.remove('drop-target-cell');
                }
            }
        }
    }
    let battleshipCellNumber = []
    for (let i = 0; i < 100; i++){
        gridCell[i].classList.remove('drag-target-cell');
        if (gridCell[i].classList.contains('player-grid-cell-battleship')){
            battleshipCellNumber.push(i);
        }
    }
    if (battleshipCellNumber.length === 15){
        selectShipsDiv.style.display = 'none';
    }
});

//Name player's gameboard
const getUsername = document.querySelector('#get-username');
getUsername.addEventListener('input', () => {
    document.querySelector('.player-gameboard-name').innerHTML = getUsername.value.toUpperCase();
});

//Populate Computer gameboard

let randomDirection;

function getRandomDirection () {
    let randomNumber = Math.random();
    if (randomNumber < 0.5){
        randomDirection = 'vertical';
    } else if (randomNumber >= 0.5) {
        randomDirection = undefined;
    }
    return randomDirection;
}

let randomPosition;

function getRandomPosition() {
    randomPosition = Math.floor(Math.random() * 100 + 100);
    while (randomPosition+(4*10-10) >= 200){
        randomPosition = Math.floor(Math.random() * 100 + 100);
        randomPosition;
    }
    return randomPosition;
}

function populateComputerGameboard() {
    if (computerGameboard.shipArray.length < 5){
        for (let i = 1; i < 6; i++){
            getRandomDirection();
            if (randomDirection === 'vertical'){
                getRandomPosition();
                while (randomPosition+(i*10-10) >= 200){
                    getRandomPosition();
                    randomPosition;
                }
                computerGameboard.createShip(randomPosition, i, randomDirection);
            } else if (randomDirection === undefined){
                getRandomPosition();
                while (randomPosition+(i-1) >= (randomPosition - randomPosition%10 + 10)){
                    getRandomPosition();
                    randomPosition;
                }
                computerGameboard.createShip(randomPosition, i, randomDirection);
            }
        }
        let createdShipLengths = [];
        computerGameboard.shipArray.forEach(element => createdShipLengths.push(element.length));
        let requiredLengths = [1,2,3,4,5];
        let differenceLengths = requiredLengths.filter(x => !createdShipLengths.includes(x));
        while (differenceLengths.length > 0){
            for (let j = 0; j < differenceLengths.length; j++){
                if (randomDirection === 'vertical'){
                    getRandomPosition();
                    while (randomPosition+(differenceLengths[j]*10-10) >= 200){
                        getRandomPosition();
                        randomPosition;
                    }
                    computerGameboard.createShip(randomPosition, differenceLengths[j], randomDirection);
                } else if (randomDirection === undefined){
                    getRandomPosition();
                    while (randomPosition+(differenceLengths[j]-1) >= (randomPosition - randomPosition%10 + 10)){
                        getRandomPosition();
                        randomPosition;
                    }
                    computerGameboard.createShip(randomPosition, differenceLengths[j], randomDirection);
                }
            };
            computerGameboard.shipArray.forEach(element => createdShipLengths.push(element.length));
            differenceLengths = requiredLengths.filter(x => !createdShipLengths.includes(x));
        }
    }
}

//START THE GAME BY CLICKING THE START BUTTON
const userInformation = document.querySelector('#user-information');
const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () => {
    if (playerGameboard.shipArray.length === 5){
        dragAndDropShips.style.display = 'none';
        document.querySelector('.ai-gameboard').style.display = 'initial';
        populateComputerGameboard();
    }
});

//CREATE PLAYERS

const players = Player();

players.playerPlays();

//Game Over & Create New Game

appendNewElement('div', gameboards, undefined, 'game-over-div')
const gameOverDiv = document.querySelector('#game-over-div');
gameOverDiv.style.display = 'none'

appendNewElement('h1', gameOverDiv, `GAME OVER`, 'game-over-message');
const gameOverMessage = document.querySelector('#game-over-message');
gameOverMessage.style.display = 'none';

appendNewElement('button', gameOverDiv, 'CREATE NEW GAME', 'create-new-game-button');
const createNewGameButton = document.querySelector('#create-new-game-button');
createNewGameButton.style.display = 'none';

createNewGameButton.addEventListener('click', () => {
    createNewGameButton.style.display = 'none';
    gameOverMessage.style.display = 'none';
    dragAndDropShips.style.display = 'flex';
    selectShipsDiv.style.display = 'initial';
    document.querySelector('.user-gameboard').style.display = 'initial';
    document.querySelector('.gameboards').style.justifyContent = 'center';
    draggableShips.forEach(element => element.style.display = 'grid');
    getUsername.value = '';
});

//Click Github icon - link to repository

const githubIcon = document.querySelector('.github-icon');

githubIcon.addEventListener('click', () => {
    window.open('https://github.com/orjive5/Battleship.git');
})

//If ship is sunk change color to black

function sunkIsBlack() {
    for (let i = 100; i < 200; i++){
        gridCell[i].addEventListener('click', () => {
            for (let j = 0; j < computerGameboard.shipArray.length; j++){
                if (computerGameboard.shipArray[j].isSunk()){
                    computerGameboard.shipArray[j].shipCells.forEach(el => gridCell[el].classList.add('computer-battleship-sunk'))
                }
            }
        })
    }
}
sunkIsBlack();