//SHIP FACTORY

const Ship = (position, length) => {

    const shipCells = [];

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
        } else if (tryCells.every(el => el > 100)){

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

            document.querySelector('.player-gameboard').style.display = 'none';
            document.querySelector('.ai-gameboard').style.display = 'none';
            document.querySelector('.player-gameboard-name').style.display = 'none';
            appendNewElement(
                'button', 
                 document.querySelector('.gameboards'), 
                 'Create New Game', 
                 'create-new-game-button'
                );
            document.querySelector('.gameboards').style.justifyContent = 'center';
            // userInformation.style.display = 'flex';

            return console.log('GAME OVER');
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

            return playerGameboard.receiveAttack(computerAttack);

        } else {

            gridCell[computerAttack].classList.add('grid-cell-attacked');
            playerGameboard.gameOver();

            return playerGameboard.receiveAttack(computerAttack);

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

appendNewElement('label', userInformation, 'Choose ship position:', 'choose-ship-position');
const chooseShipPosition = document.querySelector('#choose-ship-position');
chooseShipPosition.setAttribute('for', 'ship-position-number');

appendNewElement('input', userInformation, undefined, 'ship-position-number');
const shipPositionNumber = document.querySelector('#ship-position-number');
shipPositionNumber.setAttribute('placeholder', 'Enter number 0-99');
shipPositionNumber.setAttribute('type', 'text');

appendNewElement('label', userInformation, 'Choose ship length:', 'choose-ship-length');
const chooseShipLength = document.querySelector('#choose-ship-length');
chooseShipLength.setAttribute('for', 'ship-length-number');

appendNewElement('input', userInformation, undefined, 'ship-length-number');
const shipLengthNumber = document.querySelector('#ship-length-number');
shipLengthNumber.setAttribute('placeholder', 'Enter number 1-5');
shipLengthNumber.setAttribute('type', 'text');

appendNewElement('button', userInformation, 'Create ship', 'create-ship-button');
const createShipButton = document.querySelector('#create-ship-button');

appendNewElement('label', userInformation, 'Enter your name:', 'label-for-username');
const labelForUsername = document.querySelector('#label-for-username');
labelForUsername.setAttribute('for', 'get-username');

appendNewElement('input', userInformation, undefined, 'get-username');
const getUsername = document.querySelector('#get-username');
getUsername.setAttribute('placeholder', 'Your name');
getUsername.setAttribute('type', 'text');

appendNewElement('button', userInformation, 'Start game', 'start-button');
const startButton = document.querySelector('#start-button');

//Create player's fleet
createShipButton.addEventListener('click', () => {
    if (Number(shipPositionNumber.value) < 0 || Number(shipPositionNumber.value) > 99 || shipPositionNumber.value === ''){
        return console.log('try again with correct value');
    } else if (Number(shipLengthNumber.value) < 1 || Number(shipLengthNumber.value) > 5 || shipLengthNumber.value === ''){
        return console.log('try again with correct value');
    } else if (playerGameboard.allShipCells.length >= 15){
        return console.log(`you've already created all available ships`);
    } else {
        return playerGameboard.createShip(Number(shipPositionNumber.value), Number(shipLengthNumber.value));
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
})

const players = Player();

players.playerPlays();