document.addEventListener("DOMContentLoaded", function () {
    
    /******************* INSTANCIATIONS ******************* */
    //basic set of 52
    const positiveCards = [
        { name: "One", value: 1 },
        { name: "Two", value: 2 },
        { name: "Three", value: 3 },
        { name: "Four", value: 4 },
        { name: "Five", value: 5 },
        { name: "Six", value: 6 },
        { name: "Seven", value: 7 },
        { name: "Eight", value: 8 },
        { name: "Nine", value: 9 },
        { name: "Ten", value: 10 },
    ];

    const negativeCards = [
        { name: "Minus One", value: -1 },
        { name: "Minus Two", value: -2 },
        { name: "Minus Three", value: -3 },
        { name: "Minus Four", value: -4 },
        { name: "Minus Five", value: -5 },
        { name: "Minus Six", value: -6 },
        { name: "Minus Seven", value: -7 },
        { name: "Minus Eight", value: -8 },
        { name: "Minus Nine", value: -9 },
        { name: "Minus Ten", value: -10 },
    ]


    let players = []

    //first shuffle
    let shuffledPositiveCards = shuffleCards(positiveCards);
    let shuffledNegativeCards = shuffleCards(negativeCards);

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
        if(playerOneDrawnCards.length == 2){
            restartGame();
        }
        
        switch(playerOneDrawnCards.length){
            case 0:
                const positiveDrawn = shuffledPositiveCards.pop();
                playerOneFirstPick.textContent = positiveDrawn.name;
                playerOneDrawnCards.push(positiveDrawn);
                //callback
                drawCard();
                break;
            case 1:
                const negativeDrawn = shuffledNegativeCards.pop();
                playerOneSecondPick.textContent = negativeDrawn.name;
                playerOneDrawnCards.push(negativeDrawn);
                //call to compare now as the array will now be of the right length
                compareCards();
                break;
        }
    }

    /**
     * Compare cards and display winner
     */
    function compareCards(){
        const firstCardValue = playerOneDrawnCards[0].value;
        const secondCardValue = playerOneDrawnCards[1].value;

        const totalValue = firstCardValue + secondCardValue;
        switch(totalValue){
            case 0:
                console.log(totalValue);
                playerOneScore.textContent = "Sabacc !";
                break;
            default: 
                console.log("not sabacc", totalValue);
                playerOneScore.textContent = "Your score : " + totalValue
                break;
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
        shuffledPositiveCards = shuffleCards(positiveCards);
        shuffledNegativeCards = shuffleCards(negativeCards);

    }

    addEvent(submitBtn, "click", createCardFromInput);
    addEvent(drawBtn, "click", drawCard);
    addEvent(restartBtn, "click", restartGame);
});