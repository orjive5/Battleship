//SHIP FACTORY

const Ship = (position, length) => {
    const shipCells = [];
    const coordinates = () => {
        for (let i = position; i < position + length; i++){
            shipCells.push(i);
        }
        return shipCells;
    }
    coordinates();
    const hitAt = [];
    const hit = (cellNumber) => {
        hitAt.push(cellNumber);
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
    const allShipCells = [];
    const pushAllShipCells = () => {
        shipArray.forEach(element => element.shipCells.forEach(el => {
            if (!allShipCells.includes(el)){
                allShipCells.push(el)
            }
        }));
    }
    const createShip = (position, length) => {
        shipArray.push(Ship(position, length));
        pushAllShipCells();
        //Create Player Ships
        if (position < 99){
            for (let i = position; i < position + length; i++){
                if (gridCell[i].classList.contains('player-grid-cell-battleship')){
                    console.log('try different length and position');
                    shipArray.pop();
                    while (i > position){
                        gridCell[i].classList.remove('player-grid-cell-battleship');
                        i--;
                    }
                    break;
                } else {
                        gridCell[i].classList.add('player-grid-cell-battleship');
                    }
            }
        } else {
            for (let i = position; i < position+length; i++){
                if (gridCell[i].classList.contains('computer-grid-cell-battleship')){
                    console.log('try different length and position');
                    shipArray.pop();
                    while (i > position){
                        gridCell[i].classList.remove('computer-grid-cell-battleship');
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
        for (let i = 0; i < shipArray.length; i++){
            if (shipArray[i].shipCells.includes(attackPosition)){
                return shipArray[i].hit(attackPosition);
            }
        }
        return recordMissedShots.push(attackPosition);
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
    return {createShip, shipArray, pushAllShipCells, allShipCells, receiveAttack, recordMissedShots, allSunk}
}

// PLAYERS FACTORY

const Player = () => {
    const hitComputerCells = [];
    const hitPlayerCells = [];
    const playerPlays = () => {
        for (let i = 100; i < gridCell.length; i++){
                gridCell[i].addEventListener('click', () => {
                    computerGameboard.receiveAttack(i);
                    if (hitComputerCells.includes(i)){
                        console.log('Try again!');
                    }
                    else if (computerGameboard.allShipCells.includes(i)){
                        gridCell[i].classList.add('grid-cell-hit');
                        hitComputerCells.push(i);
                    } else {
                        gridCell[i].classList.add('grid-cell-attacked');
                    }
                    computerPlays();
                    console.log(computerGameboard.allSunk());
                });
        }
    }
    const computerPlays = () => {
        const computerAttack = Math.floor(Math.random() * 100);
        playerGameboard.receiveAttack(computerAttack);
        if (hitPlayerCells.includes(computerAttack)){
            computerPlays();
        }
        else if (playerGameboard.allShipCells.includes(computerAttack)){
            gridCell[computerAttack].classList.add('grid-cell-hit');
            hitPlayerCells.push(computerAttack);
        } else {
            gridCell[computerAttack].classList.add('grid-cell-attacked');
        }
        console.log(playerGameboard.allSunk());
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