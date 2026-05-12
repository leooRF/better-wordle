function comecar(idioma) {
    GameModel.startGame(idioma);

    document.getElementById("tela-inicio").style.display = "none";
    document.getElementById("tela-jogo").style.display = "flex";

    if (idioma === "pt") {
        document.getElementById("msg-instr").innerText = "Tente adivinhar a palavra de 5 letras.";
    } else {
        document.getElementById("msg-instr").innerText = "Guess the 5-letter word.";
    }

    desenhar();
}

function desenhar() {
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
}

window.onkeydown = function (event) {
    if (GameModel.isGameOver || GameModel.selectedLanguage === "") return;

    const key = event.key.toUpperCase();

    if (key === "BACKSPACE" && GameModel.currentColumn > 0) {
        GameModel.currentColumn--;
        GameModel.board[GameModel.currentRow][GameModel.currentColumn] = "";
        document.getElementById("t-" + GameModel.currentRow + "-" + GameModel.currentColumn).innerText = "";
    } else if (key === "ENTER" && GameModel.currentColumn === GameModel.maxColumns) {
        const userWord = GameModel.board[GameModel.currentRow].join("");

        for (let columnIndex = 0; columnIndex < GameModel.maxColumns; columnIndex++) {
            const tile = document.getElementById("t-" + GameModel.currentRow + "-" + columnIndex);

            if (userWord[columnIndex] === GameModel.secretWord[columnIndex]) {
                tile.style.background = "#538d4e";
                GameModel.score += GameModel.correctScore;
            } else if (GameModel.secretWord.includes(userWord[columnIndex])) {
                tile.style.background = "#b59f3b";
                GameModel.score += GameModel.presentScore;
            } else {
                tile.style.background = "#3a3a3c";
            }

            tile.style.borderColor = "transparent";
        }

        document.getElementById("score-val").innerText = GameModel.score;

        if (userWord === GameModel.secretWord) {
            alert(GameModel.selectedLanguage === "pt" ? "Acertou!" : "Correct!");
            GameModel.startNextRound();
            document.getElementById("round-val").innerText = GameModel.round;
            desenhar();
        } else {
            GameModel.currentRow++;
            GameModel.currentColumn = 0;

            if (GameModel.currentRow === GameModel.maxRows) {
                alert("Fim/End! Word: " + GameModel.secretWord);
                GameModel.isGameOver = true;
            }
        }
    } else if (/^[A-Z]$/.test(key) && GameModel.currentColumn < GameModel.maxColumns) {
        GameModel.board[GameModel.currentRow][GameModel.currentColumn] = key;
        document.getElementById("t-" + GameModel.currentRow + "-" + GameModel.currentColumn).innerText = key;
        GameModel.currentColumn++;
    }
};
