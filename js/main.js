function comecar(idioma) {
    GameModel.startGame(idioma);
    GameView.showGameScreen();
    GameView.showInstructions(idioma);
    GameView.renderBoard();
}

window.onkeydown = function (event) {
    if (GameModel.isGameOver || GameModel.selectedLanguage === "") return;

    const key = event.key.toUpperCase();

    if (key === "BACKSPACE" && GameModel.currentColumn > 0) {
        GameModel.currentColumn--;
        GameModel.board[GameModel.currentRow][GameModel.currentColumn] = "";
        GameView.updateTileLetter(GameModel.currentRow, GameModel.currentColumn, "");
    } else if (key === "ENTER" && GameModel.currentColumn === GameModel.maxColumns) {
        const userWord = GameModel.board[GameModel.currentRow].join("");

        for (let columnIndex = 0; columnIndex < GameModel.maxColumns; columnIndex++) {
            if (userWord[columnIndex] === GameModel.secretWord[columnIndex]) {
                GameModel.score += GameModel.correctScore;
                GameView.paintTile(GameModel.currentRow, columnIndex, "#538d4e");
            } else if (GameModel.secretWord.includes(userWord[columnIndex])) {
                GameModel.score += GameModel.presentScore;
                GameView.paintTile(GameModel.currentRow, columnIndex, "#b59f3b");
            } else {
                GameView.paintTile(GameModel.currentRow, columnIndex, "#3a3a3c");
            }
        }

        GameView.updateScore(GameModel.score);

        if (userWord === GameModel.secretWord) {
            GameView.showWinMessage(GameModel.selectedLanguage);
            GameModel.startNextRound();
            GameView.updateRound(GameModel.round);
            GameView.renderBoard();
        } else {
            GameModel.currentRow++;
            GameModel.currentColumn = 0;

            if (GameModel.currentRow === GameModel.maxRows) {
                GameView.showGameOverMessage(GameModel.secretWord);
                GameModel.isGameOver = true;
            }
        }
    } else if (/^[A-Z]$/.test(key) && GameModel.currentColumn < GameModel.maxColumns) {
        GameModel.board[GameModel.currentRow][GameModel.currentColumn] = key;
        GameView.updateTileLetter(GameModel.currentRow, GameModel.currentColumn, key);
        GameModel.currentColumn++;
    }
};
