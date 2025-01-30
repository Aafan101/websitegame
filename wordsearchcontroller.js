"use strict";

/** This object sets up the word search game, as well as button functions (for solving
 * and for refreshing/setting up a new game).
 *
 * @author Noor Aftab
 *
 * @param {String} gameId ID of the word search game div (where the actual grid of letters goes)
 * @param {String} listId ID of the div where the list of words to find goes
 * @param {String} solveId ID for button to solve the puzzle
 * @param {String} newGameId ID for button to start a new game
 * @param {String} instructionsId ID for the h2 heading (to allow us to update its text with ease)
 * @param {String} themeId ID for part of the h3 heading (to show the theme of the word search)
 */
function WordSearchController(gameId, listId, solveId, newGameId, instructionsId, themeId) {
    // Word list for the game (15x15 grid with 17 words)
    var searchTypes = {
        "What I Love About You": [
            ["Arms", "Ears", "Eyes", "Glasses"],
            ["Hair", "Hands", "Jokes", "Laugh"],
            ["Legs", "Lips", "Mouth", "Neck"],
            ["Skin", "Smile", "Thighs", "Love"],
            ["Voice", "Heart", "Hugs", "Kisses"],
        ]
    };

    // Variables to store game logic and its view
    var game;
    var view;

    // Instructions to display in the h2 header
    var mainInstructions = "This is the last challenge so give it your all!";

    // Function call to start the word search game
    setUpWordSearch();

    /** Randomly chooses a word theme and sets up the game matrix and the game 
     * view to reflect that theme
     */
    function setUpWordSearch() {
        // Retrieve the matrix of words for "Human Anatomy" theme
        var listOfWords = searchTypes["What I Love About You"];
        
        // Converts letters to uppercase
        convertToUpperCase(listOfWords);

        // Sets the headings to reflect the instructions and theme
        updateHeadings(mainInstructions, "What I Love About You");

        // Runs the logic of the game using a copy of the word list (to avoid the actual object being altered)
        game = new WordSearchLogic(gameId, listOfWords.slice());
        game.setUpGame();

        // Generates the view of the game and sets up mouse events for clicking and dragging
        view = new WordSearchView(game.getMatrix(), game.getListOfWords(), gameId, listId, instructionsId);
        view.setUpView();
        view.triggerMouseDrag();
    }

    /** Converts a given 2D array of words to all uppercase
     *
     * @param {String[][]} wordList a matrix of words to convert to uppercase
     */
    function convertToUpperCase(wordList) {
        for (var i = 0; i < wordList.length; i++) {
            for (var j = 0; j < wordList[i].length; j++) {
                wordList[i][j] = wordList[i][j].toUpperCase();
            }
        }
    }

    /** Updates the instructions (h2) and theme (h3) headings according to the given
     * text parameters
     *
     * @param {String} instructions text to set the h2 heading to
     * @param {String} theme text to set the h3 theme element to
     */
    function updateHeadings(instructions, theme) {
        $(instructionsId).text(instructions);
        $(themeId).text(theme);
    }

    /** Solves the word search puzzle when the solve button is clicked
     *
     * @event WordSearchController#click
     * @param {function} function to execute on mouse click
     */
    $(solveId).click(function () {
        view.solve(game.getWordLocations(), game.getMatrix());
    });

    /** Empties the game and list divs and replaces them with a new setup, modeling
     * a 'refresh' effect when button is clicked
     *
     * @param {function} function to execute on mouse click to generate a new puzzle
     */
    $(newGameId).click(function () {
        // Empties the game and list elements, as well as the h3 theme span element
        $(gameId).empty();
        $(listId).empty();
        $(themeId).empty();

        // Calls the set up to create a new word search game
        setUpWordSearch();
    });
}
