const Ship = require('./ship');

test('return correct ship value', () => {
    const newShip = Ship(2);
    expect(newShip.length).toBe(2);
    expect(newShip.shipHitAt).toEqual([]);
    expect(newShip.isSunk()).toBe('Not sunk');
    expect(newShip.hit(1)).toEqual([1]);
    expect(newShip.shipHitAt).toEqual([1]);
    newShip.hit(2);
    expect(newShip.isSunk()).toBe('Sunk');
});