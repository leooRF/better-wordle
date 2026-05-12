const GameModel = {
    dictionaries: {
        pt: ["TESTE", "CLASSE", "DADOS", "LOGIC", "PILHA", "SUITE"],
        en: ["CLEAN", "SMELL", "PRINT", "CODE", "FILES", "STACK"]
    },
    maxRows: 6,
    maxColumns: 5,
    correctScore: 10,
    presentScore: 5,
    selectedLanguage: "",
    secretWord: "",
    currentRow: 0,
    currentColumn: 0,
    score: 0,
    round: 1,
    isGameOver: false,
    board: [],

    createEmptyBoard() {
        return Array.from({ length: this.maxRows }, () => Array(this.maxColumns).fill(""));
    },

    selectRandomWord(language) {
        const words = this.dictionaries[language];
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex].toUpperCase();
    },

    startGame(language) {
        this.selectedLanguage = language;
        this.currentRow = 0;
        this.currentColumn = 0;
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

GameModel.board = GameModel.createEmptyBoard();
