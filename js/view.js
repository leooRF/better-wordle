const GameView = {
    showGameScreen() {
        document.getElementById("tela-inicio").style.display = "none";
        document.getElementById("tela-jogo").style.display = "flex";
    },

    showInstructions(language) {
        const message = language === "pt"
            ? "Tente adivinhar a palavra de 5 letras."
            : "Guess the 5-letter word.";

        document.getElementById("msg-instr").innerText = message;
    },

    renderBoard() {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";

        for (let rowIndex = 0; rowIndex < GameModel.maxRows; rowIndex++) {
            const rowElement = document.createElement("div");
            rowElement.className = "linha";

            for (let columnIndex = 0; columnIndex < GameModel.maxColumns; columnIndex++) {
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
        alert(language === "pt" ? "Acertou!" : "Correct!");
    },

    showGameOverMessage(secretWord) {
        alert("Fim/End! Word: " + secretWord);
    }
};
