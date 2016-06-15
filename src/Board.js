// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var currRow = this.rows()[rowIndex];
      var conflictCount = 0;
      for (var i = 0; i < currRow.length; i++) {
        conflictCount += currRow[i];
      }
      return conflictCount > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var numRows = this.rows().length;
      var conflictCount = 0;
      for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < this.rows()[i].length; j++) {
          conflictCount += this.rows()[i][j];
        }
        if (conflictCount > 1) {
          return true;
        } else {
          conflictCount = 0;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var fullMatrix = this.rows();
      var conflictCount = 0;
      for (var i = 0; i < fullMatrix.length; i++) {
        conflictCount += fullMatrix[i][colIndex];
      }
      return conflictCount > 1 ? true : false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var fullMatrix = this.rows();
      var conflictCount = 0;
      for (var i = 0; i < fullMatrix.length; i++) {
        for (var j = 0; j < fullMatrix.length; j++) {
          conflictCount += fullMatrix[j][i];          
        }
        if (conflictCount > 1) {
            return true;
        } else {
          conflictCount = 0;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var fullMatrix = this.rows();
      var conflictCount = 0;
      for (var i = 0, j = majorDiagonalColumnIndexAtFirstRow; i < fullMatrix.length; i++) {
        if (j < fullMatrix.length) {
          conflictCount += fullMatrix[i][j];
          j++;
        }
      }

      if (conflictCount > 1) {
        return true;
      }

      // conflictCount = 0;

      // for (var i = 0, j = majorDiagonalColumnIndexAtFirstRow; i < fullMatrix.length; i++) {
      //   if (j >= 0) {
      //     conflictCount += fullMatrix[i][j];
      //     j--;
      //   }
      // }

      // if (conflictCount > 1) {
      //   return true;
      // }
      
      return false;           

    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var fullMatrix = this.rows();
      var conflictCount = 0;
      
      // CHECK FOR CONFLICTS DIAGONALLY TO THE RIGHT
      for (var rowStart = 0; rowStart < fullMatrix.length; rowStart++) {    
        for (var majorDiagonalColumnIndexAtFirstRow = 0; majorDiagonalColumnIndexAtFirstRow < fullMatrix.length; majorDiagonalColumnIndexAtFirstRow++) {
          for (var i = rowStart, j = majorDiagonalColumnIndexAtFirstRow; i < fullMatrix.length; i++) {
            if (j < fullMatrix.length) {
              conflictCount += fullMatrix[i][j];
              j++;
            }
          }
          if (conflictCount > 1) {
            return true;
          } else {
            conflictCount = 0;
          }
        }
      }

      // // CHECK FOR CONFLICTS DIAGONALLY TO THE LEFT
      // for (var majorDiagonalColumnIndexAtFirstRow = 0; majorDiagonalColumnIndexAtFirstRow < fullMatrix.length; majorDiagonalColumnIndexAtFirstRow++) {
      //   for (var i = 0, j = majorDiagonalColumnIndexAtFirstRow; i < fullMatrix.length; i++) {
      //     if (j >= 0) {
      //       conflictCount += fullMatrix[i][j];
      //       j--;
      //     }
      //   }
      //   if (conflictCount > 1) {
      //     return true;
      //   } else {
      //     conflictCount = 0;
      //   }
      // }

      return false;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
