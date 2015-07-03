window.battleshipGrid = window.battleshipGrid || function() {
	"use strict";

	battleshipGrid.MISS = 0;
	battleshipGrid.HIT = 1;
	battleshipGrid.ALREADY_HIT = 2;

	var cols = 10;
	var rows = 10;

	var grid = [];

	var HORIZONTAL_ORIENTATION = 0;
	var VERTICAL_ORIENTATION = 1;

	var ships = {
		"d1": {
			size: 4,
			hits: 0,
		},
		"d2": {
			size: 4,
			hits: 0
		},
		"b": {
			size: 5,
			hits: 0
		}
	};
	

	function init() {
		generateGrid();
	}

	function generateGrid() {

		// represent the grid as an arrow of arrays
		// 0 represents an empty cell
		// b represents battleship
		// d represents destroyer
		// intially it is zero filled the ships are generated afterward
		for ( var c = 0; c < cols; c++) {
			grid[c] = [];

			for ( var r=0; r < rows; r++ ) {
				grid[c][r] = 0;
			}
		}


		for ( var shipId in ships ) {
			if ( ships.hasOwnProperty(shipId) ) {
				createShip(shipId, ships[shipId]);
			}
		}

	}

	function createShip(id, ship) {

		var orientation, startX, startY;

		orientation = Math.round(Math.random());

		startX = Math.floor(Math.random()*(cols-1));
		startY = Math.floor(Math.random()*(rows-1));

		var tryAgain = false;

		if ( orientation === HORIZONTAL_ORIENTATION ) {
			startX = (startX + ship.size >= cols ) ? startX - ship.size : startX;
		} else {
			startY = (startY + ship.size >= rows) ? startY - ship.size : startY;
		}


		// check for any positioning conflicts
		
		var x, y, i;

		for ( i=0; i < ship.size; i++ ) {

			x = (orientation === HORIZONTAL_ORIENTATION) ? startX + i : startX;
			y = (orientation === VERTICAL_ORIENTATION ) ? startY + i : startY;

			if ( grid[x][y] !== 0 ) {
				// whoops looks like we are overlapping with a another ship
				// break the loop and set the tryAgain flag so we can use 
				// recursion to keep going until get no overlaps
				tryAgain = true;
				break;
			}  

		}


		if ( tryAgain ) {
			createShip(id, ship);
		} else {

			for ( i=0; i < ship.size; i++ ) {

			x = (orientation === HORIZONTAL_ORIENTATION) ? startX + i : startX;
			y = (orientation === VERTICAL_ORIENTATION ) ? startY + i : startY;

			grid[x][y] = id;

			}

		}

	}

	function checkHit(x, y) {

		var hitType = battleshipGrid.MISS;
		var shipHit = null;

		if ( grid[x][y] !== 0 && grid[x][y] !== "x" ) {
			
			var shipId = grid[x][y];
			ships[shipId].hits += 1;
			grid[x][y] = "x";

			if ( ships[shipId].hits === ships[shipId].size ) {
				hitType = battleshipGrid.KILLING_BLOW;
			} else {
				hitType = battleshipGrid.HIT;	
			}
			
			shipHit = shipId;
			
		} else if ( grid[x][y] === "x" ) {
			hitType = battleshipGrid.ALREADY_HIT;
		}

		return {
			status: hitType,
			ship: shipHit
		};
	}

	function getSize() {
		return {
			columns: cols,
			rows: rows
		};
	}
	
	function getGrid() {
		return grid;
	}

	init();

	return {
		generateGrid: generateGrid,
		getSize: getSize,
		checkHit: checkHit,
		getGrid: getGrid
	};

};