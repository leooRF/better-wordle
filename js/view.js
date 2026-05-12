const GameView = {
    showGameScreen() {
        document.getElementById("tela-inicio").style.display = "none";
        document.getElementById("tela-jogo").style.display = "flex";
    },

    showInstructions(language) {
        document.getElementById("msg-instr").innerText = GameModel.messages.instructions[language];
    },

    renderBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";

        for (let rowIndex = 0; rowIndex < GameModel.settings.maxRows; rowIndex++) {
            const rowElement = document.createElement("div");
            rowElement.className = "linha";

            for (let columnIndex = 0; columnIndex < GameModel.settings.maxColumns; columnIndex++) {
                const tileElement = document.createElement("div");
                tileElement.className = "tile";
                tileElement.id = "t-" + rowIndex + "-" + columnIndex;
                rowElement.appendChild(tileElement);
            }

            boardElement.appendChild(rowElement);
        }
    },

    updateTileLetter(rowIndex, columnIndex, letter) {
        document.getElementById("t-" + rowIndex + "-" + columnIndex).innerText = letter;
    },

    paintTile(rowIndex, columnIndex, backgroundColor) {
        const tileElement = document.getElementById("t-" + rowIndex + "-" + columnIndex);
        tileElement.style.background = backgroundColor;
        tileElement.style.borderColor = "transparent";
    },

    updateScore(score) {
        document.getElementById("score-val").innerText = score;
    },

    updateRound(round) {
        document.getElementById("round-val").innerText = round;
    },

    showWinMessage(language) {
        alert(GameModel.messages.win[language]);
    },

    showGameOverMessage(secretWord) {
        alert(GameModel.messages.gameOverPrefix + secretWord);
    }
};
