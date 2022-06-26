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

// GAMEBOARD FACTORY

//COMMENTED OUT DOM//

const Gameboard = () => {
    const shipArray = [];
    const allShipCells = [];

    const createShip = (position, length, direction) => {
        const tryCells = [];

        if (direction === 'vertical') {
            for (let i = position; i < position + length * 10; i += 10) {
                tryCells.push(i);
            }

            if (tryCells.every((el) => el < 100)) {
                if (!allShipCells.some((item) => tryCells.includes(item))) {
                    shipArray.push(Ship(position, length, direction));
                    allShipCells.push(...tryCells);
                } else {
                    console.log('try different length and positions');
                }
            } else if (
                tryCells.every((el) => el > 100) &&
                tryCells.every((el) => el < 200)
            ) {
                if (!allShipCells.some((item) => tryCells.includes(item))) {
                    shipArray.push(Ship(position, length, direction));
                    allShipCells.push(...tryCells);
                } else {
                    console.log('try different length and positions');
                }
            } else {
                console.log('try different length and positions');
            }
        } else if (direction === undefined) {
            for (let i = position; i < position + length; i++) {
                tryCells.push(i);
            }

            if (tryCells.every((el) => el < 100)) {
                if (!allShipCells.some((item) => tryCells.includes(item))) {
                    shipArray.push(Ship(position, length));
                    allShipCells.push(...tryCells);
                } else {
                    console.log('try different length and positions');
                }
            } else if (
                tryCells.every((el) => el > 100) &&
                tryCells.every((el) => el < 200)
            ) {
                if (!allShipCells.some((item) => tryCells.includes(item))) {
                    shipArray.push(Ship(position, length));
                    allShipCells.push(...tryCells);
                } else {
                    console.log('try different length and positions');
                }
            } else {
                console.log('try different length and positions');
            }
        }

        return shipArray;
    };

    const recordMissedShots = [];

    const receiveAttack = (attackPosition) => {
        for (let i = 0; i < shipArray.length; i += 1) {
            if (shipArray[i].shipCells.includes(attackPosition)) {
                return shipArray[i].hit(attackPosition);
            }
        }

        if (!recordMissedShots.includes(attackPosition)) {
            return recordMissedShots.push(attackPosition);
        } else {
            return recordMissedShots;
        }
    };

    const allSunk = () => {
        let sunkArray = [];

        sunkArray = shipArray.map((el) => el.isSunk());

        if (sunkArray.includes(false)) {
            return false;
        } else {
            return true;
        }
    };
    const gameOver = () => {
        if (allSunk()) {
            allShipCells.length = 0;
            recordMissedShots.length = 0;
            shipArray.length = 0;
        }
    };

    return {
        createShip,
        shipArray,
        allShipCells,
        receiveAttack,
        recordMissedShots,
        allSunk,
        gameOver,
    };
};

module.exports = Gameboard;
