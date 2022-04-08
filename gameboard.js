//SHIP FACTORY

const Ship = (position, length, direction) => {

    const shipCells = [];

    if (direction === 'vertical'){
        for (let i = position; i < position + (length*10); i+=10){
            shipCells.push(i);
        }
    } else {
        for (let i = position; i < position + length; i++){
            shipCells.push(i);
        }
    }

    const hitAt = [];

    const hit = (cellNumber) => {
        return hitAt.push(cellNumber);
    }

    const isSunk = () => {
        if (hitAt.length >= length){
            return true;
        } else {
            return false;
        }
    }

    return {
        position,
        length,
        direction,
        shipCells,
        hitAt,
        hit,
        isSunk
    }
}

// GAMEBOARD FACTORY

//COMMENTED OUT DOM//

const Gameboard = () => {

    const shipArray = [];
    let allShipCells = [];

    const createShip = (position, length, direction) => {

        let tryCells = [];

        if (direction === 'vertical'){

            for (let i = position; i < position + (length*10); i+=10){
                tryCells.push(i);
            }
    
            if (tryCells.every(el => el < 100)){
    
                if (!allShipCells.some(item => tryCells.includes(item))){
    
                    shipArray.push(Ship(position, length, direction));
                    allShipCells.push(...tryCells);
    
                    // for (let i = position; i < position + (length*10); i+=10){
                    //     gridCell[i].classList.add('player-grid-cell-battleship');
                    // }
    
                } else {
                    console.log('try different length and positions');
                }
            } else if (tryCells.every(el => el > 100) && tryCells.every(el => el < 200)){
    
                if (!allShipCells.some(item => tryCells.includes(item))){
    
                    shipArray.push(Ship(position, length, direction));
                    allShipCells.push(...tryCells);
    
                    // for (let i = position; i < position + (length*10); i+=10){
                    //     gridCell[i].classList.add('computer-grid-cell-battleship');
                    // }
    
                } else {
                    console.log('try different length and positions');
                }
            } else {
                console.log('try different length and positions');
            }

        } else if (direction === undefined) {

        for (let i = position; i < position + length; i++){
            tryCells.push(i);
        }
        

        if (tryCells.every(el => el < 100)){

            if (!allShipCells.some(item => tryCells.includes(item))){

                shipArray.push(Ship(position, length));
                allShipCells.push(...tryCells);

                // for (let i = position; i < position + length; i++){
                //     gridCell[i].classList.add('player-grid-cell-battleship');
                // }

            } else {
                console.log('try different length and positions');
            }
        } else if (tryCells.every(el => el > 100) && tryCells.every(el => el < 200)){

            if (!allShipCells.some(item => tryCells.includes(item))){

                shipArray.push(Ship(position, length));
                allShipCells.push(...tryCells);

                // for (let i = position; i < position + length; i++){
                //     gridCell[i].classList.add('computer-grid-cell-battleship');
                // }

            } else {
                console.log('try different length and positions');
            }
        } else {
            console.log('try different length and positions');
        }
        }

        return shipArray;
    }

    const recordMissedShots = [];

    const receiveAttack = (attackPosition) => {

        for (let i = 0; i < shipArray.length; i++){
            if (shipArray[i].shipCells.includes(attackPosition)){
                return shipArray[i].hit(attackPosition);
            }
        }

        if (!recordMissedShots.includes(attackPosition)){
            return recordMissedShots.push(attackPosition);
        } else {
            return recordMissedShots;
        }
    }
    
    const allSunk = () => {

        let sunkArray = [];

        sunkArray = shipArray.map(el => el.isSunk());

        if (sunkArray.includes(false)){
            return false;
        } else {
            return true;
        }
    }
    const gameOver = () => {
        if (allSunk()){

            // if (computerGameboard.allSunk()){
            //     gameOverMessage.innerHTML = `GAME OVER! ${document.querySelector('.player-gameboard-name').innerHTML} WINS!`
            // } else if (playerGameboard.allSunk()){
            //     gameOverMessage.innerHTML = 'GAME OVER! COMPUTER WINS!'
            // }

            allShipCells.length = 0;
            recordMissedShots.length = 0;
            shipArray.length = 0;

            // players.hitComputerCells.length = 0;
            // players.hitPlayerCells.length = 0;

            // for (let i = 0; i < gridCell.length; i++){
            //     gridCell[i].classList.remove('grid-cell-hit');
            //     gridCell[i].classList.remove('grid-cell-attacked');
            //     gridCell[i].classList.remove('player-grid-cell-battleship');
            //     gridCell[i].classList.remove('computer-grid-cell-battleship');
            //     gridCell[i].classList.remove('computer-battleship-sunk');
            // }

            // document.querySelector('.ai-gameboard').style.display = 'none';
            // document.querySelector('.user-gameboard').style.display = 'none';
            // gameOverDiv.style.display = 'flex';
            // gameOverDiv.style.gap = '30px';
            // gameOverDiv.style.flexDirection = 'column';
            // createNewGameButton.style.display = 'initial';
            // gameOverMessage.style.display = 'initial';
            // gameOverMessage.style.fontSize = '2rem';

            // document.querySelector('.gameboards').style.justifyContent = 'center';
        }

    }

    return {
        createShip,
        shipArray,
        allShipCells,
        receiveAttack,
        recordMissedShots,
        allSunk,
        gameOver
    }
}

module.exports = Gameboard;