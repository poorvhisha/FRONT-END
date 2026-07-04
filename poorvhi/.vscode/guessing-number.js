let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    let userGuess = Number(document.getElementById("guessInput").value);
    let message = document.getElementById("message");
    let attemptsText = document.getElementById("attempts");

    if (!userGuess) {
        message.textContent = "⚠️ Please enter a number!";
        return;
    }

    attempts++;

    if (userGuess === randomNumber) {
        message.textContent = "🎉 Correct! You guessed it!";
        message.style.color = "lightgreen";
    } else if (userGuess < randomNumber) {
        message.textContent = "📉 Too low! Try again.";
        message.style.color = "yellow";
    } else {
        message.textContent = "📈 Too high! Try again.";
        message.style.color = "orange";
    }

    attemptsText.textContent = "Attempts: " + attempts;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById("guessInput").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "";
}