// Get the canvas element and its context
var canvas = document.getElementById("game-canvas");
var context = canvas.getContext("2d");

// Set the initial score and time
var score = 0;
var time = 20;

// Set the interval for creating new coins (in milliseconds)
var coinInterval = 2000;

// Start the game loop
// setInterval(gameLoop, 1000);
// Start the game loop and store the interval ID
var gameLoopInterval = setInterval(gameLoop, 1000);

// Game loop function
function gameLoop() {
    // Check if the game is over
    if (gameOver) {
        return;
    }
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

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

// Function to generate a new coin
function generateCoin() {
    // Generate a random position and value for the coin
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var value = Math.floor(Math.random() * 10) + 1;

    // Add the coin to the coins array
    coins.push({x: x, y: y, radius: 20, value: value});

    // Draw the coin on the canvas
    context.fillStyle = "#f4d742";
    context.beginPath();
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fill();
}

// Set an interval to generate new coins
// setInterval(generateCoin, coinInterval);
// Set an interval to generate new coins and store the interval ID
var coinIntervalId = setInterval(generateCoin, coinInterval);

// Function to handle clicks on the canvas
canvas.addEventListener("click", function(event) {
    // Get the position of the click
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;

    // Check if the click was on a coin
    for (var i = 0; i < coins.length; i++) {
        var coin = coins[i];
        var distance = Math.sqrt((coin.x - x) * (coin.x - x) + (coin.y - y) * (coin.y - y));
        if (distance < coin.radius) {
            // The click was on a coin
            score += coin.value;
            coins.splice(i, 1);
            break;
        }
    }
});

// Array to hold the coins
var coins = [];

var gameOver = false;

// Function to end the game
function endGame() {
    // Stop the game loop
    clearInterval(gameLoopInterval);

    // Stop the coin generation interval
    clearInterval(coinIntervalId);

    // Display the final score
    context.fillStyle = "#fff";
    context.font = "48px Arial";
    context.textAlign = "center";
    context.fillText("Game Over", canvas.width/2, canvas.height/2 - 50);
    context.fillText("Final Score: " + score, canvas.width/2, canvas.height/2 + 50);
}