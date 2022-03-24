//PLAYERS FACTORY

const Player = (max) => {
    const computerPlayer = () => {
        return Math.floor(Math.random() * max);
    }
    return {computerPlayer}
}

module.exports = Player;