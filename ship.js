//SHIP FACTORY

const Ship = (length) => {
    const shipHitAt = [];
    const hit = (number) => {
        shipHitAt.push(number);
        return shipHitAt;
    }
    const isSunk = () => {
        if (shipHitAt.length >= Ship.length){
            return 'Sunk'
        } else {
            return 'Not sunk'
        }
    }
    return {length, shipHitAt, hit, isSunk}
}

module.exports = Ship;