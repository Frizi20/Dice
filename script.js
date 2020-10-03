let playersCurrent = {
    player1:0,
    player2:0
}
let playersTotal = {
    player1:0,
    player2:0
}

let playerTurn=1;
let gameActive = true;

//DOM elements

const rollDom =document.querySelector('.roll');
const dice1Dom = document.querySelector('#dice1');
const dice2Dom = document.querySelector('#dice2');

const player1TotalDom = document.querySelector('.total-score1');
const player2TotalDom = document.querySelector('.total-score2');

const player1CurrentDom = document.querySelector('.current-score1');
const player2CurrentDom = document.querySelector('.current-score2');

const player1TitleDom = document.querySelector('.player-name1');
const player2TitleDom = document.querySelector('.player-name2');

const finalScoreDom = document.getElementById('final');







init();

rollDom.addEventListener('click',function(){

    if(gameActive){
        let random1 = Math.floor(Math.random()*6 + 1);
        let random2 = Math.floor(Math.random()*6 + 1);
        let sum = random1 + random2;

        //make dice visible
        //Change the dice images with the random values

        dice1Dom.src = `imagini/dice-${random1}.png`;
        dice2Dom.src = `imagini/dice-${random2}.png`;

        document.querySelector('.dice').style.visibility='visible';

        

        if(playerTurn === 1){
            playersCurrent.player1 += sum;
        }else if (playerTurn ===2){
            playersCurrent.player2 += sum;
        }

        if(random1 === 1 || random2 === 1){
            changeTurn();
            
        }

        player1CurrentDom.textContent= playersCurrent.player1;
        player2CurrentDom.textContent = playersCurrent.player2;

        
    }

    

    
});


//////////////Hold Buton//////////

document.querySelector('.hold').addEventListener('click',function(){


    //Set a default winning score to 100 if there is no input

        let finalScore;

        if(finalScoreDom.value === ''){
            finalScore = 100;
        }else{
            finalScore = parseInt(finalScoreDom.value);
        }

        console.log(finalScore)

    //Verify witch player's turn it is and add the current score to total and show it on page


    if(gameActive){


        if(playerTurn === 1){

            playersTotal.player1 += playersCurrent.player1;
            player1TotalDom.textContent = playersTotal.player1;
    
        }else if(playerTurn === 2){
            
            playersTotal.player2 += playersCurrent.player2;
            player2TotalDom.textContent = playersTotal.player2;
    
        }
    
        
        //Verify witch player's turn is, and if the total score is bigger than the limit change the dom to show he won
        //Set GameActive to false to block the buttons exccept the New Game one
    
        if(playerTurn === 1){
            if(playersTotal.player1 >= finalScore){

                player1TitleDom.textContent = 'WINNER!';
                player1TitleDom.classList.add('winner');
                player1TitleDom.classList.remove('active-player');
                gameActive=false;
            }else{
                changeTurn();
            }
        }else if(playerTurn === 2){

            if(playersTotal.player2 >= finalScore){
                document.querySelector('.player-name2').textContent = 'WINNER';
                player2TitleDom.classList.add('winner');
                player2TitleDom.classList.remove('active-player');
                gameActive=false;
            }else{
                changeTurn();
            }

        }
    }
    
    


});


//New Game Button

document.querySelector('.new-game').addEventListener('click',function(){
    init();
});

//Change the player's turn, reset current scores for both players and change CSS styles by adding or removing classes
//so the players kno who's turn it is

function changeTurn(){

    if(playerTurn === 1){
        playerTurn = 2;
    }else if(playerTurn === 2){
        playerTurn = 1;
    }

    

    document.querySelector('.dice').style.visibility='hidden';


    playersCurrent.player2=0;
    playersCurrent.player1=0;

    player1CurrentDom.textContent= playersCurrent.player1;
    player2CurrentDom.textContent = playersCurrent.player2;

    document.querySelector('.left-player-container').classList.toggle('active');
    document.querySelector('.right-player-container').classList.toggle('active');
    document.querySelector('.player-name1').classList.toggle('active-player');
    document.querySelector('.player-name2').classList.toggle('active-player');

}


//Reset Game so player one will start

function init(){

    //Dom values to 0
    player1TotalDom.textContent = 0;
    player2TotalDom.textContent = 0;
    player1CurrentDom.textContent = 0;
    player2CurrentDom.textContent = 0;

    playerTurn = 1;

    //Game logic values to0
    playersCurrent.player1= 0;
    playersCurrent.player2 = 0;
    playersTotal.player1 = 0;
    playersTotal.player2 = 0;

    
    document.querySelector('.player-name1').classList.add('active-player');
    document.querySelector('.player-name2').classList.remove('active-player');


    document.querySelector('.right-player-container').classList.remove('active');
    document.querySelector('.left-player-container').classList.add('active');

    player1TitleDom.textContent = 'PLAYER1';
    player2TitleDom.textContent = 'PLAYER2';

    player1TitleDom.classList.remove('winner');
    player2TitleDom.classList.remove('winner');


    document.querySelector('.dice').style.visibility='hidden';

    gameActive = true;
}


