window.app = window.app || (function(window, undefined) {
	"use strict";
	
	var model;
	var textField;
	var statusText;

	var shipsSunk = 0;

	var GRID_ROW_MAP = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j"
	];

	function init() {
		model = battleshipGrid();

		createGrid();
	}

	function createGrid() {

		var grid = model.getGrid();

		var container = document.querySelector(".battleship-grid");

		var gridSize = model.getSize();

		var columns = gridSize.columns;
		var rows = gridSize.rows;

		for ( var r=0; r < rows; r++) {

			var row = document.createElement("div");
			row.className = "battleship-grid-row";

			for ( var c=0; c < columns; c++ ) {

				var cell = document.createElement("div");

				cell.id = GRID_ROW_MAP[r] + "" + (c+1);

				cell.className = "battleship-grid-cell";

				var cellId = grid[c][r];

				if (cellId !== 0 ) {
					cell.className += " " + cellId;
				}

				row.appendChild(cell);
			}

			container.appendChild(row);

		}
	}	

	function handleInput() {

		if ( !textField ) {
			textField = document.querySelector(".battleship-input-text");
			statusText = document.querySelector(".battleship-status-text");
		}

		var input = textField.value;

		var badInput = false;
		var columnId, rowId;
		// sanitise the input
		if ( input.length === 2 ) {

			input = input.toLowerCase();

			rowId = input.charAt(0);
			columnId = input.charAt(1);

			if ( GRID_ROW_MAP.indexOf(rowId) === -1 ) {
				badInput = true;
			} else if  ( columnId < 1 && columnId > GRID_ROW_MAP.length ) {
				badInput = true;
			}

		} else {
			badInput = true;
		}

		var message = "";

		if ( badInput ) {
			message = "Please enter a valid grid refercence eg: D5";
		} else {

			columnId -= 1;
			rowId = GRID_ROW_MAP.indexOf(rowId);

			var hitResult = model.checkHit(columnId, rowId);

			var hit = hitResult.status;

			if ( hit === battleshipGrid.HIT || hit === battleshipGrid.KILLING_BLOW ) {
				
				var cell = document.querySelector("#"+input);

				cell.classList.remove("b");
				cell.classList.remove("d1");
				cell.classList.remove("d2");


				cell.classList.add("x");

				if ( hit === battleshipGrid.KILLING_BLOW ) {
					var shipType = hitResult.ship.size === 5 ? "Battleship" : "Destroyer";

					message = "Well done! You sunk a " + shipType;

					shipsSunk += 1;

					if ( shipsSunk === 3 ) {
						alert("You win!");
					}

				} else {
					message = input + "is a hit";
				}



			} else if ( hit === battleshipGrid.ALREADY_HIT ) {

				message = input + " was already a hit!";

			}  else {
				message = input + " is a miss!";
			}
		}

		statusText.innerHTML = message;
		
		return false;
	}

	function ready() {
		init();
	}

	return {
		ready: ready,
		handleInput: handleInput
	};
	

})(window);
	





