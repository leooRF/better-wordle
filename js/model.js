const GameModel = {
    settings: {
        maxRows: 6,
        maxColumns: 5,
        correctScore: 10,
        presentScore: 5
    },
    feedbackColors: {
        correct: "#538d4e",
        present: "#b59f3b",
        absent: "#3a3a3c"
    },
    messages: {
        instructions: {
            pt: "Tente adivinhar a palavra de 5 letras.",
            en: "Guess the 5-letter word."
        },
        win: {
            pt: "Acertou!",
            en: "Correct!"
        },
        gameOverPrefix: "Fim/End! Word: "
    },
    rawDictionaries: {
        pt: ["TESTE", "CLASSE", "DADOS", "LOGIC", "PILHA", "SUITE"],
        en: ["CLEAN", "SMELL", "PRINT", "CODE", "FILES", "STACK"]
    },
    dictionaries: {},
    selectedLanguage: "",
    secretWord: "",
    currentRow: 0,
    currentColumn: 0,
    score: 0,
    round: 1,
    isGameOver: false,
    board: [],

    createEmptyBoard() {
        return Array.from({ length: this.settings.maxRows }, () => Array(this.settings.maxColumns).fill(""));
    },

    validateWords(words) {
        return words
            .filter((word) => word.length === this.settings.maxColumns)
            .map((word) => word.toUpperCase());
    },

    buildValidatedDictionaries() {
        return {
            pt: this.validateWords(this.rawDictionaries.pt),
            en: this.validateWords(this.rawDictionaries.en)
        };
    },

    selectRandomWord(language) {
        const words = this.dictionaries[language];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toUpperCase();
    },

    evaluateGuess(guess) {
        const feedback = [];

        for (let columnIndex = 0; columnIndex < this.settings.maxColumns; columnIndex++) {
            if (guess[columnIndex] === this.secretWord[columnIndex]) {
                feedback.push({
                    color: this.feedbackColors.correct,
                    score: this.settings.correctScore
                });
            } else if (this.secretWord.includes(guess[columnIndex])) {
                feedback.push({
                    color: this.feedbackColors.present,
                    score: this.settings.presentScore
                });
            } else {
                feedback.push({
                    color: this.feedbackColors.absent,
                    score: 0
                });
            }
        }

        return feedback;
    },

    startGame(language) {
        this.selectedLanguage = language;
        this.currentRow = 0;
        this.currentColumn = 0;
        this.score = 0;
        this.round = 1;
        this.isGameOver = false;
        this.board = this.createEmptyBoard();
        this.secretWord = this.selectRandomWord(language);
    },

    startNextRound() {
        this.round++;
        this.currentRow = 0;
        this.currentColumn = 0;
        this.board = this.createEmptyBoard();
        this.secretWord = this.selectRandomWord(this.selectedLanguage);
    }
};

GameModel.dictionaries = GameModel.buildValidatedDictionaries();
GameModel.board = GameModel.createEmptyBoard();
