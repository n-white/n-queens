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
  var matrixBoard = new Board({'n': n});
  var solutionCount = 0;
 

  var helper = function(x, y, n, matrix) {
    // debugger;
    var numRooks = n;

    if (numRooks === 0) {
      return;
    }

    matrixBoard.rows()[y][x] = 1;
    numRooks--;

    // if matrixBoard.rows()[y][x] === 0 && no row or column conflicts
    if (matrixBoard.hasAnyRowConflicts() || matrixBoard.hasAnyColConflicts()) {
      matrixBoard.rows()[y][x] = 0;
      numRooks++;
    }
      // place 1 at y,x
      // decrease n--

    // if x + 1 > matrixBoard.rows().length
    if (x + 1 >= matrixBoard.rows().length) {
      // helper(x = 0, y = y + 1, n, matrix)
      helper(0, y+1, numRooks, matrixBoard);
    } else {
      // if x + 1 < matrixBoard.rows().length
        // helperf(x = x+1, y, n, matrix) 
      helper(x+1, y, numRooks, matrixBoard);
    }

  };

  for ( var i = 0; i < n; i++ ) {
    helper(i, 0, n, matrixBoard);
  }

  // helper(0, 0, n, matrixBoard);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return matrixBoard;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};



    // if (x + 1 > n) {
    //   return;
    // }
    // // iterate through rows (y)
    // for (var y = y; y < matrix.length; y++) {
    //   //witin rows, iterate through columns (x)
    //   for (var x = x; x < matrix.length; x++) {
    //     // if no conflicts at x, y: adjust matrix[y][x] == 1
    //     matrix[y][x] = 1;


    //     if (matrixBoard.hasAnyRowConflicts() || matrixBoard.hasAnyColConflicts()) {
    //       matrix[y][x] = 0;
    //     }

    //   }
    //   x = 0;
    // }
    // solutionCount++;

    // helper(x

