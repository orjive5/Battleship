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

module.exports = Ship;