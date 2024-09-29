const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Game logic function
const getGameResult = (playerMove) => {
    const moves = ['rock', 'paper', 'scissors'];
    const computerMove = moves[Math.floor(Math.random() * 3)];

    let result = '';
    if (playerMove === computerMove) {
        result = 'It\'s a tie!';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'scissors' && computerMove === 'paper') ||
        (playerMove === 'paper' && computerMove === 'rock')
    ) {
        result = 'You win!';
    } else {
        result = 'Computer wins!';
    }

    return {
        playerMove,
        computerMove,
        result
    };
};

// Endpoint to play the game
app.post('/play', (req, res) => {
    const { move } = req.body;

    // Check if the move is valid
    if (!['rock', 'paper', 'scissors'].includes(move)) {
        return res.status(400).json({ message: 'Invalid move. Choose rock, paper, or scissors.' });
    }

    // Get the result of the game
    const gameResult = getGameResult(move);

    res.json(gameResult);
});

// Start the server
app.listen(port, () => {
    console.log(`Rock Paper Scissors game running at http://localhost:${port}`);
});
