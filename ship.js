//SHIP FACTORY

const Ship = (position, length, direction) => {
    const shipCells = [];

    if (direction === 'vertical') {
        for (let i = position; i < position + length * 10; i += 10) {
            shipCells.push(i);
        }
    } else {
        for (let i = position; i < position + length; i += 1) {
            shipCells.push(i);
        }
    }

    const hitAt = [];

    const hit = (cellNumber) => hitAt.push(cellNumber);

    const isSunk = () => {
        if (hitAt.length >= length) {
            return true;
        } else {
            return false;
        }
    };

    return {
        position,
        length,
        direction,
        shipCells,
        hitAt,
        hit,
        isSunk,
    };
};

module.exports = Ship;
