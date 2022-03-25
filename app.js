//SHIP FACTORY

const Ship = (position, length) => {
    let shipCells = []
    const coordinates = () => {
        let startCell = position - 1;
        let lastCell = startCell + (length - 1);
        for (let i = startCell; i <= lastCell; i++){
            shipCells.push(i);
        }
        return shipCells;
    }
    coordinates();
    const hitAt = [];
    const hit = (number) => {
        hitAt.push(number);
        return hitAt;
    }
    const isSunk = () => {
        if (hitAt.length >= length){
            return true;
        } else {
            return false;
        }
    }
    return {position, length, shipCells, coordinates, hitAt, hit, isSunk}
}

// GAMEBOARD FACTORY

const Gameboard = () => {
    const shipArray = [];
        const createShip = (position, length) => {
            shipArray.push(Ship(position, length));
                if (position < 100){
                    for (let i = position-1; i < (position-1)+length; i++){
                        if (gridCell[i].classList.contains('player-grid-cell-battleship')){
                            console.log('try different length and position');
                            shipArray.pop();
                                while (i > position - 1){
                                    gridCell[i-1].classList.remove('player-grid-cell-battleship');
                                i--;
                            }
                            break;
                        } else {
                            gridCell[i].classList.add('player-grid-cell-battleship');
                        }
                    }
                } else {
                    for (let i = position-1; i < (position-1)+length; i++){
                        if (gridCell[i].classList.contains('computer-grid-cell-battleship')){
                            console.log('try different length and position');
                            shipArray.pop();
                                while (i > position - 1){
                                    gridCell[i-1].classList.remove('computer-grid-cell-battleship');
                                i--;
                            }
                            break;
                        } else {
                            gridCell[i].classList.add('computer-grid-cell-battleship');
                        }
                    }
                }
            return shipArray;
        }
    const recordMissedShots = [];
    const receiveAttack = (attackPosition) => {
        for (let j = 0; j < shipArray.length; j++){
            if (shipArray[j].shipCells.includes(attackPosition)){
                return shipArray[j].hit(attackPosition);
            }
        }
        return recordMissedShots.push(attackPosition);
    }
    const allSunk = () => {
        let sunkArray = [];
        sunkArray = shipArray.map(el => el.isSunk());
        if (sunkArray.includes(false)){
            return 'Not sunk'
        } else {
            return 'All sunk. Game over'
        }
    }
    return {createShip, shipArray, receiveAttack, recordMissedShots, allSunk}
}

// PLAYERS FACTORY

const Player = () => {
    const hitComputerCells = [];
    const hitPlayerCells = [];
    const playerGameboardShipCells = [];
    playerGameboard.shipArray.forEach(element => element.shipCells.forEach(el => playerGameboardShipCells.push(el)));
    const computerGameboardShipCells = [];
    computerGameboard.shipArray.forEach(element => element.shipCells.forEach(el => computerGameboardShipCells.push(el)));
    const playerPlays = () => {
        for (let i = 100; i < gridCell.length; i++){
                gridCell[i].addEventListener('click', () => {
                    computerGameboard.receiveAttack(i);
                    console.log(computerGameboard.allSunk());
                    if (hitComputerCells.includes(i)){
                        console.log('Try again!');
                    }
                    else if (computerGameboardShipCells.includes(i)){
                        gridCell[i].classList.add('grid-cell-hit');
                        hitComputerCells.push(i);
                    } else {
                        gridCell[i].classList.add('grid-cell-attacked');
                    }
                    computerPlays();
                });
        }
    }
    const computerPlays = () => {
        const computerAttack = Math.floor(Math.random() * 100);
        playerGameboard.receiveAttack(computerAttack);
        console.log(playerGameboard.allSunk());
        if (hitPlayerCells.includes(computerAttack)){
            computerPlays();
        }
        else if (playerGameboardShipCells.includes(computerAttack)){
            gridCell[computerAttack].classList.add('grid-cell-hit');
            hitPlayerCells.push(computerAttack);
        } else {
            gridCell[computerAttack].classList.add('grid-cell-attacked');
        }
    }
    return {hitComputerCells, hitPlayerCells, playerGameboardShipCells, computerGameboardShipCells, playerPlays, computerPlays}
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