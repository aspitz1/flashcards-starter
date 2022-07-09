const Turn = require('../src/Turn');

class Round {
    constructor(deck) {
        this.deck = deck;
        this.currentTurn;
        this.turnCount = 0;
        this.currentCard = deck[this.turnCount];
        this.guesses = {
            right: [],
            wrong: []
        };

    };

    returnCurrentCard() {
        return this.currentCard;
        
    };

    takeTurn(id) {
        this.newTurn(id, this.currentCard);
        const messege = this.evaluateGuess(id);
        this.addToTurnCounter();
        this.currentCard = this.deck[this.turnCount];
        return messege;

    };

    addToTurnCounter() {
        this.turnCount++;
        
    };

    evaluateGuess(userGuess) {
        switch (userGuess) {
            case this.currentCard.correctAnswer:
                this.guesses.right.push(this.currentCard.id);
                break;
            default:
                this.guesses.wrong.push(this.currentCard.id);
                
        };
        
        return this.currentTurn.giveFeedback();

    };

    newTurn(userGuess, nextCard) {
        this.currentTurn = new Turn(userGuess, nextCard);

    };    

    calculatePercentCorrect() {
        return `${((this.guesses.right.length / this.turnCount) * 100)}%`;

    };

    endRound() {
        return `** Round over! ** You answered ${this.calculatePercentCorrect()} of the questions correctly!`;
    }

};

module.exports = Round;