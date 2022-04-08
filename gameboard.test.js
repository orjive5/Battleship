const Gameboard = require('./gameboard');
const Ship = require('./gameboard');

test('check if gameboard is working correctly with undefined direction', () => {

    const newGameboard = Gameboard();

    expect(newGameboard.shipArray).toEqual([]);
    expect(newGameboard.allShipCells).toEqual([]);

    const newShip = newGameboard.createShip(1,3);

    expect(newGameboard.shipArray.length).toBe(1);
    expect(newGameboard.shipArray[0].position).toBe(1);
    expect(newGameboard.shipArray[0].length).toBe(3);
    expect(newGameboard.shipArray[0].direction).toBe(undefined);
    expect(newGameboard.shipArray[0].shipCells).toEqual([1,2,3]);
    expect(newGameboard.allShipCells).toEqual([1,2,3]);

    newGameboard.receiveAttack(5);

    expect(newGameboard.recordMissedShots).toEqual([5]);

    newGameboard.receiveAttack(1);

    expect(newGameboard.recordMissedShots).toEqual([5]);
    expect(newGameboard.shipArray[0].hitAt).toEqual([1]);
    expect(newGameboard.allSunk()).toBe(false);

    newGameboard.receiveAttack(2);
    newGameboard.receiveAttack(3);

    expect(newGameboard.recordMissedShots).toEqual([5]);
    expect(newGameboard.shipArray[0].hitAt).toEqual([1,2,3]);
    expect(newGameboard.shipArray[0].isSunk()).toBe(true)
    expect(newGameboard.allSunk()).toBe(true);

    newGameboard.gameOver();

    expect(newGameboard.allShipCells.length).toBe(0);
    expect(newGameboard.recordMissedShots.length).toBe(0);
    expect(newGameboard.shipArray.length).toBe(0);
});

test('check if gameboard is working correctly with vertical direction', () => {

    const verticalGameboard = Gameboard();

    expect(verticalGameboard.shipArray).toEqual([]);
    expect(verticalGameboard.allShipCells).toEqual([]);

    const verticalShip = verticalGameboard.createShip(1,3,'vertical');

    expect(verticalGameboard.shipArray.length).toBe(1);
    expect(verticalGameboard.shipArray[0].position).toBe(1);
    expect(verticalGameboard.shipArray[0].length).toBe(3);
    expect(verticalGameboard.shipArray[0].direction).toBe('vertical');
    expect(verticalGameboard.shipArray[0].shipCells).toEqual([1,11,21]);
    expect(verticalGameboard.allShipCells).toEqual([1,11,21]);

    verticalGameboard.receiveAttack(5);

    expect(verticalGameboard.recordMissedShots).toEqual([5]);

    verticalGameboard.receiveAttack(1);

    expect(verticalGameboard.recordMissedShots).toEqual([5]);
    expect(verticalGameboard.shipArray[0].hitAt).toEqual([1]);
    expect(verticalGameboard.allSunk()).toBe(false);

    verticalGameboard.receiveAttack(11);
    verticalGameboard.receiveAttack(21);

    expect(verticalGameboard.recordMissedShots).toEqual([5]);
    expect(verticalGameboard.shipArray[0].hitAt).toEqual([1,11,21]);
    expect(verticalGameboard.shipArray[0].isSunk()).toBe(true)
    expect(verticalGameboard.allSunk()).toBe(true);

    verticalGameboard.gameOver();

    expect(verticalGameboard.allShipCells.length).toBe(0);
    expect(verticalGameboard.recordMissedShots.length).toBe(0);
    expect(verticalGameboard.shipArray.length).toBe(0);
});