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
            for (let i = position; i < position + length; i++){
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

module.exports = Gameboard;