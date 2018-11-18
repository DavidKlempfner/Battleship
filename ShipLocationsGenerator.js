var gridMaxInt = model.boardSize - 1;
var subGridMaxInt = model.boardSize - model.shipLength ;

function getRandomInt(min, max) {
    var randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInt;
}

function generateRandomCell() {
    var row = getRandomInt(0, gridMaxInt);
    var column;
    if (row > subGridMaxInt) {
        column = getRandomInt(0, subGridMaxInt);
    }
    else {
        column = getRandomInt(0, gridMaxInt);
    }
    var cell = row + "" + column;    
    return cell;
}

function getShipLocation() {
    var firstCell = generateRandomCell();
    var firstCellRow = parseInt(firstCell[0]);
    var firstCellColumn = parseInt(firstCell[1]);

    var shipLocationCells = [firstCell];

    var isFirstCellInSubGrid = firstCellRow <= subGridMaxInt && firstCellColumn <= subGridMaxInt;

    if (isFirstCellInSubGrid) {        
        generateShipLocationInSubGrid(firstCellRow, firstCellColumn, shipLocationCells);
    }
    else if (firstCellRow > subGridMaxInt) {        
        addShipLocationCellsHorizontally(model.shipLength, firstCellRow, firstCellColumn, shipLocationCells);
    }
    else {        
        addShipLocationCellsVertically(model.shipLength, firstCellRow, firstCellColumn, shipLocationCells)
    }
    return shipLocationCells;
}

function generateShipLocationInSubGrid(firstCellRow, firstCellColumn, shipLocationCells) {
    var randomInt = getRandomInt(0, 1);
    var shouldProceedHorizontally = randomInt === 0;
    if (shouldProceedHorizontally) {
        addShipLocationCellsHorizontally(model.shipLength, firstCellRow, firstCellColumn, shipLocationCells);
    }
    else {
        addShipLocationCellsVertically(model.shipLength, firstCellRow, firstCellColumn, shipLocationCells)
    }
}

function addShipLocationCellsHorizontally(shipLength, firstCellRow, firstCellColumn, shipLocationCells) {
    for (var i = 1; i < shipLength; i++) {
        var cell = firstCellRow + "" + (firstCellColumn + i);
        shipLocationCells.push(cell);
    }
}

function addShipLocationCellsVertically(shipLength, firstCellRow, firstCellColumn, shipLocationCells) {
    for (var i = 1; i < shipLength; i++) {
        var cell = (firstCellRow + i) + "" + firstCellColumn;
        shipLocationCells.push(cell);
    }
}