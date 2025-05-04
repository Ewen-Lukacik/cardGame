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

    const maxDrawnCards = 2;

    //get elements
    const addPlayerBtn = document.querySelector(".addPlayer");
    const drawBtn = document.querySelector(".draw");
    const restartBtn = document.querySelector(".restartBtn");
    
    const playerContainer = document.querySelector('.playerContainer');

    //set colors
    const firstPlaceColor = "#f8ce00";
    const secondPlaceColor = "#d8d8d8";
    const thirdPlaceColor = "#cd7f32";

    /******************  FUNCTIONS ************************ */

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
     * Add a new player to the game
     */
    function addPlayer(){
        if(players.length < 4){
            const newPlayerName = "player" + (players.length + 1);
            const newPlayer = {
                name: newPlayerName, 
                score: 0, 
                drawnCards: []
            };
            players.push(newPlayer);
            createNewPlayerZone(newPlayer);

            if(players.length + 1 > 4){
                addPlayerBtn.setAttribute('disabled', true);
            }
        } 
    }

    function createNewPlayerZone(player){
        const newPlayerZone = document.createElement('div');
        newPlayerZone.classList.add("playerZone",  player.name+"-zone");

        const playerTitle = document.createElement('h2');
        playerTitle.textContent = player.name;

        const playerFirstPick = document.createElement('p');
        playerFirstPick.classList.add(player.name+"-firstPick");
        const playerSecondPick = document.createElement('p');
        playerSecondPick.classList.add(player.name+"-secondPick");

        const playerScore = document.createElement('span');
        playerScore.classList.add(player.name + "-score");

        newPlayerZone.append(playerTitle, playerFirstPick, playerSecondPick, playerScore);

        playerContainer.appendChild(newPlayerZone);
    }

    /**
     * Draw a card for each zone
     * Call the Compare method when needed
     */
    function drawCard(){

        players.forEach(player => {
            const firstPickTextElement = document.querySelector("." + player.name + "-firstPick")
            const secondPickTextElement = document.querySelector("." + player.name + "-secondPick")
            switch(player.drawnCards.length){
                case 0:
                    const positiveDrawn = shuffledPositiveCards.pop();
                    firstPickTextElement.textContent = positiveDrawn.name;
                    player.drawnCards.push(positiveDrawn);
                    //callback
                    drawCard();
                    break;
                case 1:
                    const negativeDrawn = shuffledNegativeCards.pop();
                    secondPickTextElement.textContent = negativeDrawn.name;
                    player.drawnCards.push(negativeDrawn);
                    //call to compare now as the array will now be of the right length
                    compareCards(player);
                    break;
            }
        });   
        getLeaderboard(players);
    }

    /**
     * Compare cards and display winner
     */
    function compareCards(player){
        const firstCardValue = player.drawnCards[0].value;
        const secondCardValue = player.drawnCards[1].value;
        const totalValue = firstCardValue + secondCardValue;

        const playerScoreTextElement = document.querySelector("." + player.name + "-score");
        switch(totalValue){
            case 0:
                player.score = totalValue;
                playerScoreTextElement.textContent = "Sabacc !";
                break;
            default: 
                player.score = totalValue;
                playerScoreTextElement.textContent = "Your score : " + totalValue
                break;
        }
    }

    /**
     * get all player scores
     */
    function getLeaderboard(players){
        //reorder the players array by their scores (closest to 0 wins)  
        const sortedPlayersScore = players.sort((a, b) => {
            const absScoreA = Math.abs(a.score);
            const absScoreB = Math.abs(b.score);
            
            if (absScoreA !== absScoreB) {
                return absScoreA - absScoreB;
            }
    
            //if equel distance from 0, positive wins
            if (a.score > 0 && b.score < 0) {
                return -1;
            }
            if (a.score < 0 && b.score > 0) {
                return 1;
            }
            
            //if equal distance from 0 AND same sign, then lowest cards win
            const aMinCardValue = Math.min(...a.drawnCards.map(card => Math.abs(card)));
            const bMinCardValue = Math.min(...b.drawnCards.map(card => Math.abs(card)));
            
            return aMinCardValue - bMinCardValue;
        });

        //get their boxes paint in their lb color
        if (players.length > 0) {
            document.querySelector('.' + sortedPlayersScore[0].name + "-zone").style.backgroundColor = firstPlaceColor;
        }
        
        if (players.length > 1) {
            document.querySelector('.' + sortedPlayersScore[1].name + "-zone").style.backgroundColor = secondPlaceColor;
        }
        
        if (players.length > 2) {
            document.querySelector('.' + sortedPlayersScore[2].name + "-zone").style.backgroundColor = thirdPlaceColor;
        }
    }


    /**
     * Reset everything and reshuffle
     */
    function restartGame(){
        //shuffle the main pack again (user could have added some cards in it)
        shuffledPositiveCards = shuffleCards(positiveCards);
        shuffledNegativeCards = shuffleCards(negativeCards);

        playerContainer.innerHTML = "";
        players = [];
        addPlayerBtn.removeAttribute('disabled');
        }

    addEvent(addPlayerBtn, "click", addPlayer);
    addEvent(drawBtn, "click", drawCard);
    addEvent(restartBtn, "click", restartGame);
});