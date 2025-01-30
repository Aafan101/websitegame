"use strict";

/** Sets up the logic of the word search game by inserting the given list of words into 
 * a 2D matrix in various orientations (global objects defined in wordpaths.js)
 *
 * @param {String} gameId ID for the word search grid container
 * @param {String[][]} list 2D array of words to insert into the word matrix
 */

function WordSearchLogic(gameId, list) {
    // Object to hold common board variables
    var board = {
        matrix: [], // Empty array where the matrix will go
        size: 15 // Set grid size to 15x15
    };

    // Object to hold properties for the current word being fit into the matrix
    var thisWord = {
        viablePaths: [], // Array of orientations the word can take
        wordFitted: false // Whether the word has been set into grid
    };

    // Empty object to hold the locations of each fitted word
    var wordLocations = {};

    /** Initializes the creation of the word matrix */
    this.setUpGame = function () {
        // Create a 2D array with the given board size
        board.matrix = createMatrix(board.size);

        // Fit the list of words into the board matrix
        fitWordsIntoMatrix(list, board.matrix);

        // Insert random letters in the empty indexes of the matrix
        fillWithRandomLetters(board.matrix);
    };

    /** Creates a matrix 
     * @param {Number} size the width and height to create the matrix
     * @return a 2D square array
     */
    function createMatrix(size) {
        // Creates an array of length size
        var matrix = new Array(size);

        // Sets each index inside the array to be another array of length size
        for (var i = 0; i < size; i++) {
            matrix[i] = new Array(size);
        }

        return matrix;
    }

    /** Loops through the list of words and fits them inside the 2D array */
    function fitWordsIntoMatrix(wordList, matrix) {
        for (var i = 0; i < wordList.length; i++) {
            for (var j = 0; j < wordList[i].length; j++) {
                var trimmedWord = trimWord(wordList[i][j]);

                // Try 100 times to fit the word into the matrix
                for (var k = 0; thisWord.wordFitted === false && k < 100; k++) {
                    insertWordIntoMatrix(trimmedWord, matrix);
                }

                if (thisWord.wordFitted === false) {
                    wordList[i] = remove(wordList[i], wordList[i][j]);
                    j--; // Decrement to avoid skipping words
                } else {
                    thisWord.wordFitted = false;
                }
            }
        }
    }

    /** Generates random coordinates and checks for valid paths */
    function insertWordIntoMatrix(word, matrix) {
        var randX = getRandomNum(matrix.length);
        var randY = getRandomNum(matrix.length);

        if (jQuery.isEmptyObject(matrix[randX][randY]) || matrix[randX][randY] === word.charAt(0)) {
            checkPossibleOrientations(word, matrix, randX, randY);
        }
    }

    /** Finds possible orientations for the word to take */
    function checkPossibleOrientations(word, matrix, x, y) {
        Object.keys(paths).forEach(function (path) {
            doesOrientationFit(word, matrix, x, y, paths[path]);
        });

        if (thisWord.viablePaths.length !== 0) {
            var randIndex = getRandomNum(thisWord.viablePaths.length);
            var finalOrientation = thisWord.viablePaths[randIndex];
            thisWord.viablePaths = [];

            wordLocations[word] = { x: x, y: y, p: finalOrientation };

            setWordIntoMatrix(word, matrix, x, y, finalOrientation);
        }
    }

    /** Places the given word into the puzzle array */
    function setWordIntoMatrix(word, matrix, x, y, path) {
        for (var k = 0; k < word.length; k++, x = incr[path](x, y).x, y = incr[path](x, y).y) {
            matrix[x][y] = word.charAt(k);
        }
        thisWord.wordFitted = true;
    }

    /** Checks if the given word fits inside the matrix with the passed-in orientation */
    function doesOrientationFit(word, matrix, x, y, path) {
        var letterCount = 0;
        var wordLength = word.length;
        var matrixLength = matrix.length;

        for (var k = 0; k < wordLength && bounds[path](x, y, matrixLength); k++, x = incr[path](x, y).x, y = incr[path](x, y).y) {
            if (jQuery.isEmptyObject(matrix[x][y]) || matrix[x][y] === word.charAt(k)) {
                letterCount++;
            }
        }

        if (letterCount === wordLength) {
            thisWord.viablePaths.push(path);
        }
    }

    /** Fills empty indices in the matrix with randomly generated letters */
    function fillWithRandomLetters(matrix) {
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (jQuery.isEmptyObject(matrix[i][j])) {
                    matrix[i][j] = String.fromCharCode(65 + Math.random() * 26);
                }
            }
        }
    }

    function remove(array, indexElement) {
        return array.filter(i => i !== indexElement);
    }

    function getRandomNum(bound) {
        return Math.floor(Math.random() * bound);
    }

    function trimWord(word) {
        return word.replace(/\W/g, "");
    }

    this.getMatrix = function () {
        return board.matrix;
    };

    this.getWordLocations = function () {
        return wordLocations;
    };

    this.getListOfWords = function () {
        return list;
    };
}
