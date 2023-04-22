// Get the canvas element and its context
var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

// Set the initial score and time
var score = 0;
var time = 20;

// Set the interval for creating new apples (in milliseconds)
var appleInterval = 2000;

// Start the game loop and store the interval ID
var gameLoopInterval = setInterval(gameLoop, 1000);

var appleImg = new Image();
// appleImg.src = "apple-image.png"
appleImg.src = "https://media.istockphoto.com/id/470908792/photo/red-apple.jpg?s=612x612&w=is&k=20&c=UnkVCeaTwbaSQhKqMjjpPEQT3GBBX7vDo7YNizoIwc8="

var bgImage = new Image();
bgImage.src = "https://store-images.s-microsoft.com/image/apps.4083.14191174512742283.25b58903-5b4d-47c0-959c-c79a5aabf46c.17e473bf-b171-4bc5-b00e-f1a6f54977e1";


// Game loop function
function gameLoop() {
  // Check if the game is over
  if (gameOver) {
    return;
  }
  context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

//   // Clear the canvas
//   context.clearRect(0, 0, canvas.width, canvas.height);



  // Display the score and time
  context.fillStyle = "#fff";
  context.font = "24px Arial";
  context.fillText("Score: " + score, 10, 30);
  context.fillText("Time: " + time, canvas.width - 100, 30);

  // Check if the game is over
  if (time == 0) {
    endGame();
  }

  // Decrement the time
  time--;

  // Make sure time doesn't become negative
  if (time < 0) {
    time = 0;
  }
}

// Function to generate a new apple
function generateApple() {
  // Generate a random position for the apple
  var x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;

  // Add the apple to the apples array
  apples.push({ x: x, y: y, width: 50, height: 50 });

  // Draw the apple on the canvas
  context.drawImage(appleImg, x, y, 50, 50);
}

// Set an interval to generate new apples and store the interval ID
var appleIntervalId = setInterval(generateApple, appleInterval);

// Function to handle clicks on the canvas
canvas.addEventListener("click", function (event) {
  // Get the position of the click
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;

  // Check if the click was on an apple
  for (var i = 0; i < apples.length; i++) {
    var apple = apples[i];
    if (
      x > apple.x &&
      x < apple.x + apple.width &&
      y > apple.y &&
      y < apple.y + apple.height
    ) {
      // The click was on an apple
      score++;
      apples.splice(i, 1);
      break;
    }
  }
});

// Array to hold the apples
var apples = [];

var gameOver = false;

// Function to end the game
function endGame() {
  // Stop the game loop
  clearInterval(gameLoopInterval);

  // Stop the apple generation interval
  clearInterval(appleIntervalId);

  // Display the final score
  context.fillStyle = "#fff";
  context.font = "48px Arial";
  context.textAlign = "center";
  context.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);
  context.fillText(
    "Final Score: " + score,
    canvas.width / 2,
    canvas.height / 2 + 50
  );
}
