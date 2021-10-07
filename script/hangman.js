//Tuan Luong
//Purpose of this project-Implement a hangman game using terms from IT. 
var words = ["php", "microsoft", "java", "python", "sql", "exception", "keyboard", "monitor", "if", "loop", "crash", "macintosh"];
var letterids = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


$(document).ready(function() {

    initializegame();
});

function checkletter(button) {
    button.disabled = true; //function to check letter after clicking
    var letter = $(button).attr("data-letter");
    checkWord(letter); //Checks to see if the letter matches the word
}

function initializegame() {
    var length = words.length; //Initialises the game
    length = Math.floor(Math.random() * length);
    var word = words[length];
    var ltrstr = "";
    for (let i = 0; i < word.length; i++) {
        ltrstr = ltrstr + " " + "-" + " "; //Sets the initial blank letters in the html
    }
    length = length.toString();
    enableLetterButtons();
    document.getElementById('guessed_word').innerHTML = ltrstr; //Resets all variables
    document.getElementById('game_status').innerHTML = "";

    document.getElementById('number_guesses').innerHTML = "10";
    document.getElementById('playagain_btn').style.display = "none";
    $("#letter_chosen").attr("data-id", length);
}

function setupword() {

}

function buildWordArray() {

}

function disableLetterButtons() { //Method to disable all letter buttons
    for (var i = 0; i < letterids.length; i++) {
        var button = document.getElementById(letterids[i]);
        button.disabled = true;
    }
}

function enableLetterButtons() { //Method to enable all letter buttons
    for (var i = 0; i < letterids.length; i++) {
        var button = document.getElementById(letterids[i]);
        button.disabled = false;
    }
}



function checkWord(letter) {
    var chosewordindex = $("#letter_chosen").attr("data-id"); //Checks to see if letter matches word
    chosewordindex = parseInt(chosewordindex);
    var chosenword = words[chosewordindex]; //Gets the current chosen word
    chosenword = chosenword.toUpperCase(); //makes current chosen word all upper case
    var currentword = document.getElementById('guessed_word').innerHTML;
    currentword = currentword.replace(/\s/g, '');
    var lose = false;
    if (chosenword.includes(letter) == false) { //If the letter is not in the chosen word, reduce the number of guesses left
        lose = reduceGuess(chosenword);
    }
    if (lose != true) { //If the player hasn't lost prints out guessed letters 
        var returnString = "";
        for (let n = 0; n < chosenword.length; n++) { //Loops to print out the guessed letters and empty strings
            if (chosenword[n] == letter) {
                returnString = returnString + letter;
            } else if (currentword[n] != "-") {
                returnString = returnString + currentword[n];

            } else {
                returnString = returnString + " " + "-" + " ";

            }
        }
        checkwin(returnString); //Checks the win.


        document.getElementById('guessed_word').innerHTML = returnString;
    }

}

function checkwin(returnString) {
    if (returnString.includes("-") == false) { //Checks the win if all dashes are removed. 
        game_status.innerHTML = "You Won!, Play Again?";
        disableLetterButtons();
        document.getElementById('playagain_btn').style.display = "inline";
    }
}

function reduceGuess(chosenword) { //reduces guess if incorrect
    var number_guesses = document.getElementById('number_guesses').innerHTML;
    var game_status = document.getElementById('game_status');
    number_guesses = parseInt(number_guesses);
    number_guesses = number_guesses - 1;
    if (number_guesses == 0) { //If the number of gussses is zero, disables the button and prompts if player would like to play again
        game_status.innerHTML = "You Lost, Play Again?";
        document.getElementById('guessed_word').innerHTML = ""; //Reveals chosen word
        document.getElementById('guessed_word').innerHTML = chosenword;
        disableLetterButtons();
        document.getElementById('playagain_btn').style.display = "inline";
        document.getElementById('number_guesses').innerHTML = 0;
        return true;
    }
    document.getElementById('number_guesses').innerHTML = number_guesses;
    return false;
}