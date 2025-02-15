const chai = require('chai');
const expect = chai.expect;

const cardData = require('../src/data');
const cards = cardData.prototypeData;
const Card = require('../src/Card');
const Deck = require('../src/Deck');
const Round = require('../src/Round');
const Turn = require('../src/Turn');

describe('Round', () => {
    let deck;
    let round;

    beforeEach(() => {
        deck = new Deck(cards);
        round = new Round(deck.cards);

    });

    it('should be a function', () => {
        expect(Round).to.be.a('function');
        
    });

    it('should be an istance of Round', () => {
        expect(round).to.be.an.instanceOf(Round);

    });

    it('should return current card', () => {
        expect(round.currentCard).to.equal(deck.cards[0]);

    }); 

    it('has turn count that starts at 0', () => {
        expect(round.turnCount).to.equal(0);

    }); 

    it('should update turn count when guess is made', () => {
        const userGuess = deck.cards[0].answers[0];
        round.takeTurn(userGuess, deck.cards[1]);
        expect(round.turnCount).to.equal(1);

    });    

    it('should create new Turn when guess is made', () => {
        const userGuess = deck.cards[0].answers[0];
        round.takeTurn(userGuess, deck.cards[0]);
        expect(round.currentTurn.currentCard).to.equal(deck.cards[0]);

    });

    it('should add to turn count if guess is wrong', () => {
        const userGuess = deck.cards[0].answers[1];
        round.takeTurn(userGuess, deck.cards[1]);
        expect(round.turnCount).to.equal(1);

    });

    it('should keep track of right and wrong answers', () => {
        round.takeTurn("object");
        round.takeTurn("object");
        round.takeTurn("mutator method");
        expect(round.guesses.right.length).to.equal(2);
        expect(round.guesses.wrong.length).to.equal(1);

    });

    it('returns feedback on answers correctness', () => {
        const userGuess1 = deck.cards[0].answers[1];
        const answer1 = round.takeTurn(userGuess1, deck.cards[1]);
        const userGuess2 = deck.cards[1].answers[0];
        const answer2 = round.takeTurn(userGuess2, deck.cards[2]);
        
        expect(answer1).to.equal('incorrect!');
        expect(answer2).to.equal('correct!');

    });

    it('should calculate percent of correct guesses', () => {
        round.takeTurn("object");
        round.takeTurn("object");
        round.takeTurn("mutator method");
        round.takeTurn("mutator method");

        const percentOfCorrect = round.calculatePercentCorrect();
        expect(percentOfCorrect).to.equal('50%');

    });

    it('should end round with messege and percent correct guesses', () => {
        let userGuess = deck.cards[0].answers[1];
        round.takeTurn(userGuess, deck.cards[1]);
        
        userGuess = deck.cards[1].answers[0];
        round.takeTurn(userGuess, deck.cards[2]);

        userGuess = deck.cards[2].answers[0];
        round.takeTurn(userGuess, deck.cards[3]);

        userGuess = deck.cards[3].answers[0];
        round.takeTurn(userGuess, deck.cards[4]);

        const endRound = round.endRound();

        expect(endRound).to.equal('** Round over! ** You answered 50% of the questions correctly!');

    });

});