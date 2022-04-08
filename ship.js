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

module.exports = Ship;