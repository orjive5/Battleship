//SHIP FACTORY

const Ship = (length) => {
    const hitAt = [];
    const hit = (number) => {
        hitAt.push(number);
        return hitAt;
    }
    const isSunk = () => {
        if (hitAt.length >= this.length){
            return 'Sunk'
        } else {
            return 'Not sunk'
        }
    }
    return {length, hitAt, hit, isSunk}
}
// GAMEBOARD FACTORY

const Gameboard = (x,y,length) => {
        const newShip = Ship(length);
        newShip.x = x;
        newShip.y = y;
        const recordMissedShots = [];
    const receiveAttack = (attackX, attackY) => {
        if (attackX === x && attackY === y){
            return newShip.hit(1);
        } else {
            let missedShot = [attackX, attackY];
            return recordMissedShots.push(missedShot);
        }
    }
    return {newShip, receiveAttack, recordMissedShots}
}
module.exports = Gameboard;