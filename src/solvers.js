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
window.countNRooksSolutions = function(n, currentBoard) {
  // debugger;
  var cache = cache || [[0,0]];
  var cacheBoard = cacheBoard || [];
  var solutionCount = 0;

  var helper = function(n, currentBoard) {
    // debugger;
    var board = currentBoard || new Board({'n': n});
    var currentX = cache[cache.length - 1][0];
    var currentY = cache[cache.length - 1][1];
    var spotFound = false;

    if ( n === 0 ) {
      cache.pop();
      // board = cacheBoard[1];
      console.log(board.rows());
      return 1;
    }

    // Use this for loop to find the next possible spot without conflicts
    for (currentY; currentY < board.rows().length; currentY) {
      //witin rows, iterate through columns (x)
      for (currentX; currentX < board.rows().length; currentX) {
        // if no conflicts at x, y: adjust matrix[y][x] == 1
        board.rows()[currentY][currentX] = 1;
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
          board.rows()[currentY][currentX] = 0;
          if (currentX < 2) {
            currentY = currentY;
            currentX = currentX + 1;
          } else {
            currentY = currentY + 1;
            currentX = 0;
          }
        } else {
          spotFound = true;
          if (currentX < 2) {
            currentY = currentY;
            currentX = currentX + 1;
          } else {
            currentY = currentY + 1;
            currentX = 0;
          }      
        }

        if (spotFound) {
          break;
        }

      }
      if (spotFound) {
        break;
      }
    }

    cache.push([currentX, currentY]);
    cacheBoard.push(board);
    // if (currentX < 2) {
      // currentY = cache[cache.length - 1][1] || y;
      // currentX = cache[cache.length - 1][0] + 1 || x + 1;
    // } else {
    //   currentY = cache[cache.length - 1][1] + 1 || y + 1;
    //   currentX = cache[cache.length - 1][0] || x;
    // }


    // determine next placement of a rook given the current x and y
    for (var i = 0; i < n; i++) {
      helper(n-1, board);
    }


  };

  helper(n);

  return solutionCount;
  
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


// OLD CODE USING FOR LOOP

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


// OLD CODE FOR RECURSION

  //   // debugger;
  //   var numRooks = numRooks;

  //   if (numRooks === 0) {
  //     solutionBoard.push(matrixBoard);
  //     return;
  //   }

  //   matrixBoard.rows()[y][x] = 1;
  //   numRooks--;

  //   // if matrixBoard.rows()[y][x] === 0 && no row or column conflicts
  //   if (matrixBoard.hasAnyRowConflicts() || matrixBoard.hasAnyColConflicts()) {
  //     matrixBoard.rows()[y][x] = 0;
  //     numRooks++;
  //   }
  //     // place 1 at y,x
  //     // decrease n--

  //   // if x + 1 > matrixBoard.rows().length
  //   if (x + 1 >= matrixBoard.rows().length) {
  //     // helper(x = 0, y = y + 1, n, matrix)
  //     helper(0, y+1, numRooks, matrixBoard);
  //   } else {
  //     // if x + 1 < matrixBoard.rows().length
  //       // helperf(x = x+1, y, n, matrix) 
  //     helper(x+1, y, numRooks, matrixBoard);
  //   }


  // };

  // for ( var i = 0; i < n; i++ ) {
  //   // debugger;
  //   emptyMatrixBoard = new Board({'n': n});
  //   helper(i, 0, n, emptyMatrixBoard);
  // }

  // // helper(0, 0, n, emptyMatrixBoard);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionBoard.length;



