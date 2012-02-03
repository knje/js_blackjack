var cardgame = new function() {

this.SuiteNumber = {
	Spades:   0,
	Hearts:   1,
	Diamonds: 2,
	Clubs:    3
};

this.Suite = {
	Spades:   "Spades",
	Hearts:   "Hearts",
	Diamonds: "Diamonds",
	Clubs:    "Clubs"
};

this.CardNumber = [1,2,3,4,5,6,7,8,9,10,11,12,13];

var CardDescription = {
	1:  "Ace",
	2:  "Two",
	3:  "Three",
	4:  "Four",
	5:  "Five",
	6:  "Six",
	7:  "Seven",
	8:  "Eight",
	9:  "Nine",
	10: "Ten",
	11: "Jack",
	12: "Queen",
	13: "King"
};

//////////////////////////////////////
// Card class
this.Card = function (card_number, suite) {
	card_number = parseInt(card_number);

	if (card_number>13 || card_number<1) {
		throw "Invalid Argument";
	}

	this.number = card_number;
	this.suite = suite;
};

// get a pretty description of the card
this.Card.prototype.description = function() {
	return CardDescription[this.number] + " of " + this.suite
};

//////////////////////////////////////
// Card Deck class
this.CardDeck = function () {
	this.cards = [];
	// create 52 cards - 4 suites x 13 cards each
	for (suite in cardgame.Suite) {
		for (var j=0; j<cardgame.CardNumber.length; j++) {
			this.cards.push(new cardgame.Card(cardgame.CardNumber[j], suite));
		}
	}
};

this.CardDeck.prototype.pop = function() {
	return this.cards.pop();
};


// return a single card to the deck
this.CardDeck.prototype.returnCard = function(card) {
	this.cards.push(card);
};

// return a list of cards to the deck
this.CardDeck.prototype.returnCards = function(returned_cards) {
	for (var i=0; i<returned_cards.length; i++) {
		this.cards.push(returned_cards[i]);
	}
};

// shuffle the cards in the deck randomly
this.CardDeck.prototype.shuffle = function() {
// see - http://en.wikipedia.org/wiki/Fisher–Yates_shuffle
	for (var i=this.cards.length-1; i>0; i--) {
		var j = parseInt(Math.random() * i);
		if (i!=j) {
			var tmp       = this.cards[i];
			this.cards[i] = this.cards[j];
			this.cards[j] = tmp;
		}
	}
};


//////////////////////////////////////
// Player

this.Player = function(cards) {
	this.cards = [];
	if (cards) {
		this.cards = cards;
	}
};

this.Player.prototype.dealCard = function(card) {
	this.cards.push(card);
}

this.Player.prototype.returnCards = function() {
	var tmpCards = this.cards;
	this.cards = [];
	return tmpCards;
}

this.Player.prototype.handValue = function() {
	var hand_val = 0;
	var aces     = 0;
	for (var i=0; i<this.cards.length; i++){
		if(this.cards[i].number==1) {
			aces += 1
		} else if(this.cards[i].number>10) {
			hand_val += 10;
		} else {
			hand_val += this.cards[i].number;
		}
	}
	if (aces) {
		if (21-hand_val>0 && 21-(hand_val+aces-1)>=11) {
			return hand_val+(aces-1)+11;
		}
		return hand_val+aces;
	}
	return hand_val;
};

}