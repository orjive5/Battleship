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

    return {position, length, shipCells, hitAt, hit, isSunk}
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

            return console.log('GAME OVER');
        }

    }

    return {createShip, shipArray, allShipCells, receiveAttack, recordMissedShots, allSunk, gameOver}
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
                        playerGameboard.gameOver();

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

    return {hitComputerCells, hitPlayerCells, playerPlays, computerPlays}
}

//MAIN GAME LOOP

//Select grid cells
const gridCell = document.querySelectorAll('.grid-cell');

//POPULATE GAMEBOARDS

//Create Player gameboard
const playerGameboard = Gameboard();

//Populate Player gameboard
playerGameboard.createShip(12,5);

playerGameboard.createShip(32,4);

playerGameboard.createShip(52,3);

playerGameboard.createShip(72,2);

playerGameboard.createShip(92,1);

//Create Computer gameboard
const computerGameboard = Gameboard();

//Populate Computer gameboard
computerGameboard.createShip(112,5);

computerGameboard.createShip(132,4);

computerGameboard.createShip(152,3);

computerGameboard.createShip(172,2);

computerGameboard.createShip(192,1);

//START THE GAME BY LETTING THE USER CLICK ON AN COMPUTER GAMEBOARD

const players = Player();

players.playerPlays();