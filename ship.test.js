const Ship = require('./ship');

test('return correct ship values', () => {
    const newShip = Ship(12, 3);
    expect(newShip.length).toBe(3);
    expect(newShip.position).toBe(12);
    expect(newShip.direction).toBe(undefined);
    expect(newShip.shipCells).toEqual([12, 13, 14]);
    expect(newShip.hitAt).toEqual([]);
    newShip.hit(12);
    expect(newShip.hitAt).toEqual([12]);
    expect(newShip.isSunk()).toBe(false);
    newShip.hit(13);
    newShip.hit(14);
    expect(newShip.hitAt).toEqual([12, 13, 14]);
    expect(newShip.isSunk()).toBe(true);
});

test('return correct vertical ship values', () => {
    const verticalShip = Ship(0, 2, 'vertical');
    expect(verticalShip.length).toBe(2);
    expect(verticalShip.position).toBe(0);
    expect(verticalShip.direction).toBe('vertical');
    expect(verticalShip.shipCells).toEqual([0, 10]);
    expect(verticalShip.hitAt).toEqual([]);
    verticalShip.hit(0);
    expect(verticalShip.hitAt).toEqual([0]);
    expect(verticalShip.isSunk()).toBe(false);
    verticalShip.hit(10);
    expect(verticalShip.hitAt).toEqual([0, 10]);
    expect(verticalShip.isSunk()).toBe(true);
});
