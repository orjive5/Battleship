const Player = require('./player');

test('check players factory', () => {
    const newPlayer = Player(10);
    expect(newPlayer.computerPlayer()).not.toBe(10);
    expect(newPlayer.computerPlayer()).toBeLessThan(10);
    expect(newPlayer.computerPlayer()).toBeGreaterThanOrEqual(0);
})