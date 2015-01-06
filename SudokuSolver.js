//Returns the grid as a 2D array with 0 in empty or invalid spaces
function readGrid(){
	var grid = new Array(9);
	for(var i = 0; i < 9; i++){
		grid[i] = new Array(9);
		for(var j = 0; j < 9; j++){
			var cellID = i+"_"+j+"field";
			var number = document.getElementById(cellID).value;
			if(number == "" || number < 0 || number > 9){
				number = 0;
			}
			grid[i][j] = number;
		}
	}
	return grid
}

function printGrid(grid){
	for(var i = 0; i < grid.length; i++){
		for(var j = 0; j < grid[i].length; j++){
			console.log(grid[i][j] + " ");
		}
		console.log("\n");
	}
}

function testfunc(){
	alert("bonjoue");
}

function checkRow(grid, i, j){
	var testValue = grid[i][j];
	for(var k = 0; k < grid[i].length; k++){
		if(grid[i][k] == testValue && k != j){
			return false;
		}
	}
	return true;
}
function checkColumn(grid, i, j){
	var testValue = grid[i][j];
	for(var k = 0; k < grid.length; k++){
		if(grid[k][j] == testValue && k != i){
			return false;
		}
	}
	return true;
}
function checkSubgrid(grid, i, j){
	var testValue = grid[i][j];
	var startI = i - i%3;
	var startJ = j - j%3;
	for(var k = startI; k < startI + 3; k++){
		for(var l = startJ; l < startJ + 3; l++){
			if(grid[k][l] == testValue && (k != i || l != j)){
				return false;
			}
		}
	} 
	return true;
}

function solve(grid){
	//Find next empty space
	var emptyI = -1;
	var emptyJ = -1;
	var emptyFound = false;
	for(var i = 0; i < grid.length && !emptyFound; i++){
		for(var j = 0; j < grid[i].length && !emptyFound; j++){
			if(grid[i][j] == 0){
				emptyI = i;
				emptyJ = j;
				emptyFound = true;
			}
		}
	}
	//If no empty space was found, return true to end the recursion
	if(!emptyFound){
		return true;
	}
	//Otherwise, the empty space has to be solved
	for(var i = 1; i <= 9; i++){
		grid[emptyI][emptyJ] = i;
	
		fillCell(grid, emptyI, emptyJ);

		var validEntry = checkRow(grid, emptyI, emptyJ) && checkColumn(grid, emptyI, emptyJ) && checkSubgrid(grid, emptyI, emptyJ);
		if(validEntry && solve(grid)){
			return true;
		}
		grid[emptyI][emptyJ] = 0;
		
		fillCell(grid, emptyI, emptyJ);
	}
	return false;
	
}

function solveButton(){
	var startTime = (new Date()).getMilliseconds();
	var grid = readGrid();
	var solvable
	if(isValidGrid(grid)){
	solvable = solve(grid);
	} else {
		solvable = false;
	}
	var outputMessage;
	if(solvable){
		var deltaTime = (new Date()).getMilliseconds() - startTime;
		outputGrid(grid);
		outputMessage = "A solution was found in " + deltaTime + " milliseconds";
	}
	else{
		var deltaTime = (new Date()).getMilliseconds() - startTime;
		outputMessage = "The grid was found to be unsolvable in " + deltaTime + " milliseconds";
	}
	document.getElementById("scriptoutput").innerHTML = outputMessage;

}

function outputGrid(grid){
	for(var i = 0; i < grid.length; i++){
		for(var j = 0; j < grid[i].length; j++){
			fillCell(grid, i, j);
		}
	}
}

function clearGrid(){
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 9; j++){
			var cellID = i + "_" + j + "field";
			document.getElementById(cellID).value = "";
		}
	}
	document.getElementById("scriptoutput").innerHTML = "";
}
function isValidGrid(grid){
	for(var i = 0; i < grid.length; i++){
		for(var j = 0; j < grid[i].length; j++){
			if(grid[i][j] != 0){
				var isValidSpace = checkSubgrid(grid, i, j) && checkRow(grid, i, j) && checkColumn(grid, i, j);
				if(!isValidSpace){
					return false;
				}
			}
		}
	}
	return true;
}
function fillCell(grid, i, j){
	var cellID = i + "_" + j + "field";
	var value = grid[i][j];
	if(value == 0){
		value = "";
	}
	document.getElementById(cellID).value = value;
}



