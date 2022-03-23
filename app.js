//SHIP FACTORY
//FIX-POLISH
const Ship = (length) => {
    const shipHitAt = [];
    const hit = (number) => {
        shipHitAt.push(number);
        return shipHitAt;
    }
    const isSunk = () => {
        if (shipHitAt.length >= this.length){
            return 'Sunk'
        } else {
            return 'Not sunk'
        }
    }
    return {length, shipHitAt, hit, isSunk}
}
// GAMEBOARD FACTORY
//FIX-POLISH
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

// PLAYERS FACTORY
//TODO
const Player = () => {
    console.log('do tomorrow')
}