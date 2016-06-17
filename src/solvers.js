/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
var matrixBoard = new Board({'n': n});
  var matrix = matrixBoard.rows();
  var solutionCount = 0;

  for (var y = 0; y < matrix.length; y++) {
    //witin rows, iterate through columns (x)
    for (var x = 0; x < matrix.length; x++) {
      // if no conflicts at x, y: adjust matrix[y][x] == 1
      
      matrix[y][x] = 1;

      if (matrixBoard.hasAnyRowConflicts() || matrixBoard.hasAnyColConflicts()) {
        matrix[y][x] = 0;
      }

    }
    x = 0;
    // Reset x back to 0 & go on to the next iteration at y++
  }
  

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Number of N X N rows/columns that our board will have.
  // Output: number of solutions

  var solutionCount = 0;
  var board = new Board({'n':n});

  var helper = function(row) {
    // debugger
    // Base Case: if row number is equal to N
    if (row === n) {
      // Increment Solution Count
      solutionCount++;
      // console.log(board.rows());
      // Return;
      return;
    }

    // Recursive Case: Iterate through N.
    for (var i = 0; i < n; i++) {  
      // Place a piece at the row and position i that we are testing
      board.togglePiece(row, i);
      // If piece passes rooks conflicts
      if (!board.hasAnyRooksConflicts()) {
        // If it does, recurse over next row
        helper(row + 1);
      }
      // Untoggle piece at row,i
      board.togglePiece(row, i);
    }

  };

  helper(0);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board ({ 'n' : n });
  var solution = [];
  // debugger;
  var helper = function(row) {
    if (row === n) {

      solution.push(JSON.parse(JSON.stringify(board.rows())));
      return;
    }

    if (solution.length > 0) {
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        helper(row + 1);
      }
      board.togglePiece(row, i);
    }
  };

  helper(0);
  // console.log(solution[0]);

  // If n is = 0 we need to return new board.rows();

  // If n is 1 = we need to return a board with 1;

  // If n is 2 - 3 we need to return 0;
  return n < 4 && n !== 1 ? new Board({'n': n}).rows() : solution[0];

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  // Number of N X N rows/columns that our board will have.
  // Output: number of solutions

  var solutionCount = 0;
  var board = new Board({'n':n});

  var helper = function(row) {
    // debugger
    // Base Case: if row number is equal to N
    if (row === n) {
      // Increment Solution Count
      solutionCount++;
      // console.log(board.rows());
      // Return;
      return;
    }

    // Recursive Case: Iterate through N.
    for (var i = 0; i < n; i++) {  
      // Place a piece at the row and position i that we are testing
      board.togglePiece(row, i);
      // If piece passes rooks conflicts
      if (!board.hasAnyQueensConflicts()) {
        // If it does, recurse over next row
        helper(row + 1);
      }
      // Untoggle piece at row,i
      board.togglePiece(row, i);
    }

  };

  helper(0);
  return solutionCount;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
};

