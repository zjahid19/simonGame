
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var score = 0;
$(".level").hide();

$(".start_game").click(function () {
  if (!started) {
    nextSequence();

    started = true;
    $(".start_game").hide();
    $(".level").show();
  }
});


$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  if (userClickedPattern.length == gamePattern.length) {
    checkAnswer(gamePattern, userClickedPattern);

  }


});

function checkAnswer(fgamePattern, fuserClickedPattern) {


  if (fgamePattern[(fgamePattern.length - 1)] == fuserClickedPattern[(fgamePattern.length - 1)]) {

    score = score + 10;
    level = level + 1;
    $("#level-title").text("Level " + level);
    $(".level").text("Score : " + score);

    setTimeout(function () {
      userClickedPattern = [];
      nextSequence();
    }, 1000)




  }
  else {
    $("#level-title").text("Game over, Score is :" + score);
    $(".level").hide();
    $(".start_game").show();
    started = false;
    level = 0;
    score = 0;
    gamePattern = [];
    userClickedPattern = [];

    $(".level").text("Score : " + score);
    banimatePress("belement");

  }









}





//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel


function nextSequence() {

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  $("#level-title").text("Level " + level + ": It's Your Turn");
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log("Game Pattern Array" + gamePattern);
  console.log("user Pattern Array" + userClickedPattern);
}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

  function banimatePress(currentColor) {
    $("#" + currentColor).addClass("game-over");
    setTimeout(function () {
      $("#" + currentColor).removeClass("game-over");
    }, 100);
}
