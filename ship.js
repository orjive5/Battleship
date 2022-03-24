//SHIP FACTORY

const Ship = (length) => {
    const hitAt = [];
    const hit = (number) => {
        hitAt.push(number);
        return hitAt;
    }
    const isSunk = () => {
        if (hitAt.length >= Ship.length){
            return 'Sunk'
        } else {
            return 'Not sunk'
        }
    }
    return {length, hitAt, hit, isSunk}
}

module.exports = Ship;