document.addEventListener("DOMContentLoaded", function () {

    //object definition for card
    function Card(name, value){
         this.name = name;
         this.value = value;
    }

    //shuffle cards, param : array of cards
    function shuffleCards(cardArray) {
        return cardArray
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }
    
    //basic set of 52
    const cards = [
        { name: "Ace of Diamonds", value: 14 },
        { name: "King of Diamonds", value: 13 },
        { name: "Queen of Diamonds", value: 12 },
        { name: "Jack of Diamonds", value: 11 },
        { name: "10 of Diamonds", value: 10 },
        { name: "9 of Diamonds", value: 9 },
        { name: "8 of Diamonds", value: 8 },
        { name: "7 of Diamonds", value: 7 },
        { name: "6 of Diamonds", value: 6 },
        { name: "5 of Diamonds", value: 5 },
        { name: "4 of Diamonds", value: 4 },
        { name: "3 of Diamonds", value: 3 },
        { name: "2 of Diamonds", value: 2 },
        
        { name: "Ace of Hearts", value: 14 },
        { name: "King of Hearts", value: 13 },
        { name: "Queen of Hearts", value: 12 },
        { name: "Jack of Hearts", value: 11 },
        { name: "10 of Hearts", value: 10 },
        { name: "9 of Hearts", value: 9 },
        { name: "8 of Hearts", value: 8 },
        { name: "7 of Hearts", value: 7 },
        { name: "6 of Hearts", value: 6 },
        { name: "5 of Hearts", value: 5 },
        { name: "4 of Hearts", value: 4 },
        { name: "3 of Hearts", value: 3 },
        { name: "2 of Hearts", value: 2 },
        
        { name: "Ace of Spades", value: 14 },
        { name: "King of Spades", value: 13 },
        { name: "Queen of Spades", value: 12 },
        { name: "Jack of Spades", value: 11 },
        { name: "10 of Spades", value: 10 },
        { name: "9 of Spades", value: 9 },
        { name: "8 of Spades", value: 8 },
        { name: "7 of Spades", value: 7 },
        { name: "6 of Spades", value: 6 },
        { name: "5 of Spades", value: 5 },
        { name: "4 of Spades", value: 4 },
        { name: "3 of Spades", value: 3 },
        { name: "2 of Spades", value: 2 },
        
        { name: "Ace of Clubs", value: 14 },
        { name: "King of Clubs", value: 13 },
        { name: "Queen of Clubs", value: 12 },
        { name: "Jack of Clubs", value: 11 },
        { name: "10 of Clubs", value: 10 },
        { name: "9 of Clubs", value: 9 },
        { name: "8 of Clubs", value: 8 },
        { name: "7 of Clubs", value: 7 },
        { name: "6 of Clubs", value: 6 },
        { name: "5 of Clubs", value: 5 },
        { name: "4 of Clubs", value: 4 },
        { name: "3 of Clubs", value: 3 },
        { name: "2 of Clubs", value: 2 }
    ];
    

    //first shuffle
    let shuffledCards = shuffleCards(cards);

    //instantiate draw cards
    let drawCards = [];

    //test of creating a div via js
    const div = document.createElement('div');
    div.style.backgroundColor = 'black';
    div.style.width = "100px";
    div.style.height = "100px";
    document.body.appendChild(div);


    //get elements
    const submitBtn = document.querySelector(".submit");
    const drawBtn = document.querySelector(".draw");
    const winnerText = document.querySelector('.winner');
    const firstCardPickedText = document.querySelector('.firstCardPicked');
    const secondCardPickedText = document.querySelector('.secondCardPicked');

    //create new card from inputs
    function createCardFromInput(){
        //get inputs
        const nameInput = document.querySelector('.name');
        const valueInput = document.querySelector('.value');

        //read inputs values
        const name = nameInput.value;
        const value = valueInput.value;

        //creating and pushing the newlu created card into the array
        const card = new Card(name, value);
        cards.push(card);

        //clear input values
        clearInput(nameInput);
        clearInput(valueInput); 

        console.log('hello there', cards);
    }

    //clear inputs when submitted
    function clearInput(input){
        input.value = "";
    }


    //draw cards
    function drawCard(){
        const drawed = shuffledCards.pop();
        if(drawCards.length == 0){
            firstCardPickedText.textContent = drawed.name;
        }

        else if(drawCards.length == 1){
            secondCardPickedText.textContent = drawed.name;
        }

        drawCards.push(drawed);

        if(drawCards.length == 2){
          compareCards();
        }
        console.log(drawCards.length);
    }

    //compare cards and display winner
    function compareCards(){
        const firstCardName = drawCards[0].name;
        const firstCardValue = drawCards[0].value;

        const secondCardName = drawCards[1].name;
        const secondCardValue = drawCards[1].value;

        if(firstCardValue < secondCardValue){
            winnerText.textContent = secondCardName + " won";
            console.log(secondCardName + " won");
            getDrawCardsBackToMainPack();
            
        }
        else if(firstCardValue > secondCardValue){

            winnerText.textContent = firstCardName + " won";
            getDrawCardsBackToMainPack();
            console.log(firstCardName + " won");
            
        }
        else if(firstCardValue == secondCardValue){
            winnerText.textContent = "Draw !";
            console.log("egalité");
            getDrawCardsBackToMainPack();
            
        }

        console.log(cards, drawCards);
        
    }


    //reset arrays and reshuffle
    function getDrawCardsBackToMainPack(){
        shuffledCards.push(...drawCards);
        drawCards = [];

        shuffledCards = shuffleCards(shuffledCards);
    }


    submitBtn.addEventListener("click", createCardFromInput);
    drawBtn.addEventListener("click", drawCard);


});

