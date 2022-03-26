const Ship = require('./ship');

test('return correct ship value', () => {
    const newShip = Ship(12,3);
    expect(newShip.length).toBe(3);
    expect(newShip.position).toBe(12);
    expect(newShip.shipCells).toEqual([12,13,14]);
    expect(newShip.hitAt).toEqual([]);
    newShip.hit(12);
    expect(newShip.hitAt).toEqual([12]);
    expect(newShip.isSunk()).toBe(false);
    newShip.hit(13);
    newShip.hit(14);
    expect(newShip.hitAt).toEqual([12,13,14]);
    expect(newShip.isSunk()).toBe(true);
});