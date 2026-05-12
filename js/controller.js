const GameController = {
    startGame(language) {
        GameModel.startGame(language);
        GameView.showGameScreen();
        GameView.showInstructions(language);
        GameView.updateScore(GameModel.score);
        GameView.updateRound(GameModel.round);
        GameView.renderBoard();
    },

    handleKeyDown(event) {
        if (GameModel.isGameOver || GameModel.selectedLanguage === "") return;

        const key = event.key.toUpperCase();

        if (key === "BACKSPACE" && GameModel.currentColumn > 0) {
            GameModel.currentColumn--;
            GameModel.board[GameModel.currentRow][GameModel.currentColumn] = "";
            GameView.updateTileLetter(GameModel.currentRow, GameModel.currentColumn, "");
            return;
        }

        if (key === "ENTER" && GameModel.currentColumn === GameModel.settings.maxColumns) {
            const userWord = GameModel.board[GameModel.currentRow].join("");
            const feedback = GameModel.evaluateGuess(userWord);

            for (let columnIndex = 0; columnIndex < GameModel.settings.maxColumns; columnIndex++) {
                GameModel.score += feedback[columnIndex].score;
                GameView.paintTile(GameModel.currentRow, columnIndex, feedback[columnIndex].color);
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

                if (GameModel.currentRow === GameModel.settings.maxRows) {
                    GameView.showGameOverMessage(GameModel.secretWord);
                    GameModel.isGameOver = true;
                }
            }

            return;
        }

        if (/^[A-Z]$/.test(key) && GameModel.currentColumn < GameModel.settings.maxColumns) {
            GameModel.board[GameModel.currentRow][GameModel.currentColumn] = key;
            GameView.updateTileLetter(GameModel.currentRow, GameModel.currentColumn, key);
            GameModel.currentColumn++;
        }
    },

    bindLanguageButtons() {
        const languageButtons = document.querySelectorAll(".btn-idioma");

        languageButtons.forEach((button) => {
            button.addEventListener("click", () => {
                this.startGame(button.dataset.language);
            });
        });
    },

    bindKeyboard() {
        window.addEventListener("keydown", (event) => {
            this.handleKeyDown(event);
        });
    },

    init() {
        this.bindLanguageButtons();
        this.bindKeyboard();
    }
};
