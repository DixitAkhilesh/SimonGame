var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence(){
    $("h1").text("Level " + level);
    level++;
    var randomNum = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNum];
    
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);

    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.play();
}
var started = false;

$(document).keydown(function(event){

    var isRegularKey = /^[a-zA-Z0-9 ]$/.test(event.key);

    if(!started && isRegularKey)
    {
        nextSequence();
        started = true;
    }
})

function handler(){
    $(".btn").click(function(){
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        var audio = new Audio("sounds/" + userChosenColor + ".mp3");
        audio.play();
        $("#" + userChosenColor).addClass("pressed");
        setTimeout(() => {
            $("#" + userChosenColor).removeClass("pressed");
        }, 100);
        checkAnswer(userClickedPattern.length -1);
    })
}

handler();

function checkAnswer(currentLevel){
    console.log("Game Pattern: " + gamePattern);
    console.log("user Clicked Pattern: " + userClickedPattern);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {

        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }

    }
    else{

        $("body").addClass("game-over");
        var audio = new Audio('./sounds/wrong.mp3');
        audio.play();
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 500);
        $("h1").text("Game Over, Press Any key to Restart");

        highlight(gamePattern[currentLevel]);

        started = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
    }
}


function highlight(correctPattern){
    $("#" + correctPattern).fadeIn(500).fadeOut(500).fadeIn(500).fadeIn(500).fadeOut(500).fadeIn(500).fadeIn(500).fadeOut(500).fadeIn(500);
}