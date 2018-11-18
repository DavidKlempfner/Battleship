var view = {
    //this method takes a string message and displays it in the message display area
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{ locations: [], hits: ["", "", ""] },
    { locations: [], hits: ["", "", ""] },
    { locations: [], hits: ["", "", ""] }],
    fire: function (guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    },
    isSunk: function (ship) {
        return ship.hits.indexOf("") === -1;        
    }
}

var controller = {
    guesses: 0,
    processGuess: function (guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var isHit = model.fire(location);
            if (isHit && model.shipsSunk === model.numShips) {
                view.displayMessage("you sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
}

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    }
    else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Oops, this isn't on the board.");
        }
        else if (row < 0 || row > model.boardSize || column < 0 || column > model.boardSize) {
            alert("Oops, that's off the board.");
        }
        else {
            return row + column;
        }
    }
    return null;
}

function init() {
    placeShips();
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function isShipOverlapping(proposedShipLocation, currentShipLocations) {
    
    var isShipOverlapping = currentShipLocations.some(function (v) {
                return proposedShipLocation.indexOf(v) >= 0;
    });    
    return isShipOverlapping;
}

function placeShips() {
    var currentShipLocations = [];
    for (var i = 0; i < model.numShips; i++) {
        if (i === 0) {
            model.ships[i].locations = getShipLocation();
            currentShipLocations = model.ships[i].locations;
        }
        else {
            var proposedShipLocation = getShipLocation();
            while (isShipOverlapping(proposedShipLocation, currentShipLocations)) {
                proposedShipLocation = getShipLocation();
            }
            model.ships[i].locations = proposedShipLocation;
            currentShipLocations = currentShipLocations.concat(proposedShipLocation);
        }
    }
}

window.onload = init;