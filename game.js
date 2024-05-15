var userClickedPattern = [];
var gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

//play sound depending on the clicked button
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//flesh animation for button
function animatePress(currentColour) {
    $("#" +currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" +currentColour).removeClass("pressed");
    }, 100)
}

//sound, animation and answer check for clicked button
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    //add clicked button's id in the answer array
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    //last index is -1 to the level (all arrays starts from 0)
    checkAnswer(userClickedPattern.length-1);
})

//choose a random value from array buttonColours, depending on the result flesh it's button and play it's sound
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    setTimeout(function () {
        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 500);  
}

//checks if the game was already started. If not, then start on a key.
$(document).keydown(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

//compares the game's and the player's arrays of answers.
function checkAnswer(currentLevel) {
    //if the last items in the arrays are equal...
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        //then check the length of these arrays
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                //move to the next level
                nextSequence();
            }, 1000);
            //nulify player's answers array            
            userClickedPattern = [];
        }
    } else {
        //game-over sequence
        console.log("wrong");
        var wrongSound = new Audio ("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();     
    }   
}

//nilify stats in case of game-over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
}