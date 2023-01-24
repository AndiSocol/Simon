// colors array
var buttonColours = ["red", "blue", "green", "yellow"];

//emtpy array where we will add colors
var gamePattern = [];

// store the user clicks pattern
var userClickedPattern = [];

//check to see if game has started 
var started = false;

// game level
var level = 0;

$('.start').click(function () {
    if (!started == true) {

        // display level  
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(document).keydown(function () {
    if (!started == true) {

        // display level  
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {

    //var to store the user chosenc olour 
    var userChosenColour = $(this).attr("id");

    //storing the clicks 
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel) {

    // check if user most recent answer = game pattern  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


        //check if user finished equence 
        if (userClickedPattern.length === gamePattern.length) {
            //call function later
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound('wrong');
        $("body").addClass("game-over");
        //call function later
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, press any key or click to restart");
        $(".start").show('slow').text('RESTART');
        startOver();
    }

}

function nextSequence() {
    $(".start").hide('fast');

    // start with an emtpy click pattern
    userClickedPattern = [];
    //increment level for every call on this function
    level++;
    $("#level-title").text("Level " + level);

    //random number between 0-3 to match values from the array
    var randomNumber = Math.floor(Math.random() * 4);
    // randomChosenColour == the chosen color 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}


// functions called in the btn jquery function
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    //call function later
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//restart
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}