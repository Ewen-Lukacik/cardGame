document.addEventListener("DOMContentLoaded", function () {
    
    /******************* INSTANCIATIONS ******************* */
    //basic set of 52
    const cards = [
        { name: "Minus One", value: -1 },
        { name: "Minus Two", value: -2 },
        { name: "Minus Three", value: -3 },
        { name: "Minus Four", value: -4 },

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

    //get elements
    const submitBtn = document.querySelector(".submit");
    const drawBtn = document.querySelector(".draw");
    const restartBtn = document.querySelector(".restartBtn");
    
    //get inputs
    const nameInput = document.querySelector('.name');
    const valueInput = document.querySelector('.value');

    //get player related stuff
    const playerOneZone = document.querySelector('.playerOneZone');
    const playerOnePick = document.querySelector('.playerOnePick');

    const playerTwoZone = document.querySelector('.playerTwoZone');
    const playerTwoPick = document.querySelector('.playerTwoPick');
  
    //set colors
    const winnerColor = "rgb(111, 236, 174)";
    const looserColor = "rgb(237, 121, 121)";
    const baseColor = "lightblue";

    /******************  FUNCTIONS ************************ */
    /**
     * Card object definition
     * @param {string} name 
     * @param {int} value 
     */
    function Card(name, value){
            this.name = name;
            this.value = value;
    }

    /**
     * @param {Array} cardArray 
     * @returns a shuffled version of the input array
     */
    function shuffleCards(cardArray) {
        const shuffledCardArray = cardArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

        return shuffledCardArray
    }

    /**
     * clear inputs when submitted
     * @param {HTMLElement} input 
     */
    function clearInput(input){
        input.value = "";
    }

    /**
     * clear text from HTML element
     * @param {HTMLElement} element 
     */
    function clearText(element){
        element.textContent = "";
    }

    /**
     * add event on element
     * @param {HTMLElement} element 
     * @param {EventListener} eventType 
     * @param {Function} eventFunction 
     */
    function addEvent(element, eventType, eventFunction){
        element.addEventListener(eventType, eventFunction);
    }

    /**
     * Add a new card based on input values
     */
    function createCardFromInput(){
        //read inputs values
        const name = nameInput.value;
        const value = valueInput.value;

        //creating and pushing the newlu created card into the array
        const card = new Card(name, value);
        cards.push(card);

        //clear input values
        clearInput(nameInput);
        clearInput(valueInput); 
    }

    /**
     * Draw a card for each zone
     * Call the Compare method when needed
     */
    function drawCard(){
        const drawed = shuffledCards.pop();
        
        switch(drawCards.length){
            case 0:
                playerOnePick.textContent = drawed.name;
                drawCards.push(drawed);

                break;
            case 1:
                playerTwoPick.textContent = drawed.name;
                drawCards.push(drawed);

                //call to compare now as the array will now be of the right length
                compareCards();
                break;
        }
    }

    /**
     * Compare cards and display winner
     */
    function compareCards(){
        const firstCardValue = drawCards[0].value;
        const secondCardValue = drawCards[1].value;

        //if playerOne wins
        if(firstCardValue > secondCardValue){
            playerOneZone.style.backgroundColor = winnerColor;
            playerTwoZone.style.backgroundColor = looserColor;  
        }
        //if playerTwo wins
        else if(firstCardValue < secondCardValue){
            playerOneZone.style.backgroundColor = looserColor;
            playerTwoZone.style.backgroundColor = winnerColor;
        } 
    }

    /**
     * Reset everything and reshuffle
     */
    function restartGame(){
        playerOneZone.style.backgroundColor = baseColor;
        playerTwoZone.style.backgroundColor = baseColor;
        clearText(playerOnePick);
        clearText(playerTwoPick);
        drawCards = [];

        //shuffle the main pack again (user could have added some cards in it)
        shuffledCards = shuffleCards(cards);

    }

    addEvent(submitBtn, "click", createCardFromInput);
    addEvent(drawBtn, "click", drawCard);
    addEvent(restartBtn, "click", restartGame);
});