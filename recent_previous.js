let botOpponent = document.querySelector('.bot-opponent');
let personOpponent = document.querySelector('.person-opponent');
let babyContainer = document.querySelector('.baby-container');
let childContainer = document.querySelector('.child-container');

let boardVar, userChoice, userChoice2, userIcon1, userIcon2, playerGetter;


// creates a popup tasked with getting both player's icons
function chooseSign(){
    let babyContainer = document.createElement('div');
    babyContainer.classList.add('baby-container');
    childContainer.appendChild(babyContainer); 

    let chooseH1 = document.createElement('h1');
    chooseH1.textContent = 'What sign you wanna play?';
    babyContainer.appendChild(chooseH1);

    let mainDiv = document.createElement('div');
    mainDiv.classList.add('mainDiv');
    babyContainer.appendChild(mainDiv);

    let xSign = document.createElement('h1');
    xSign.classList.add('xSign');
    xSign.textContent = 'X';
    mainDiv.appendChild(xSign);

    let oSign = document.createElement('h1');
    oSign.classList.add('oSign');
    oSign.textContent = 'O';
    mainDiv.appendChild(oSign);

    xSign.addEventListener('click', (e) => {
        userIcon1 = xSign;
        userIcon2 = oSign;
        // console.log(userIcon1);
        // console.log(userIcon2);
        babyContainer.remove(e);
        createBabyContainer();
    });

    oSign.addEventListener('click', (e) => {
        userIcon1 = oSign;
        userIcon2 = xSign;
        babyContainer.remove(e);
        createBabyContainer();
    });

    return babyContainer;
}

// creates a popup asking for 2nd opponent identity
function createBabyContainer(){
    let babyContainer = document.createElement('div');
    babyContainer.classList.add('baby-container');
    childContainer.appendChild(babyContainer); 

    let chooseH1 = document.createElement('h1');
    chooseH1.textContent = 'Choose your opponent';
    babyContainer.appendChild(chooseH1);

    let zygoteContainer = document.createElement('div');
    zygoteContainer.classList.add('zygote-container');
    babyContainer.appendChild(zygoteContainer);

    let humanOpponentBox = document.createElement('div');
    humanOpponentBox.classList.add('opponent', 'personOpponent');
    zygoteContainer.appendChild(humanOpponentBox);
    humanOpponentBox.addEventListener('click', (e) => {
        userChoice2 = 'human';
        babyContainer.remove(e);
        createBoardFunc();
        playerGetter = CreateUserFunc();
        playerGetter.postNews();
        mainLoop();
    });

    let humanH2 = document.createElement('h2');
    humanH2.textContent = 'Human';
    humanOpponentBox.appendChild(humanH2);

    let playerOpponentDiv = document.createElement('div');
    playerOpponentDiv.classList.add('player-opponent');
    humanOpponentBox.appendChild(playerOpponentDiv);

    let botOpponentBox = document.createElement('div');
    botOpponentBox.classList.add('opponent', 'bot-opponent');
    zygoteContainer.appendChild(botOpponentBox);
    botOpponentBox.addEventListener('click', (e) => {
        userChoice2 = 'bot';
        babyContainer.remove(e);
        createBoardFunc();
        playerGetter = CreateUserFunc();
        playerGetter.postNews();
        console.log('first playerGetter:');
        console.log(playerGetter);
        mainLoop();
    });

    let botH2 = document.createElement('h2');
    botH2.setAttribute('id', 'changing-names');
    botH2.textContent = 'Your Mother';
    botOpponentBox.appendChild(botH2);

    return babyContainer;
}

//creates the playing board gui
function createBoardFunc(){
    let boardBox = document.createElement('div');
    boardBox.classList.add('board-box');
    childContainer.appendChild(boardBox); 

    let chooseH1 = document.createElement('h1');
    chooseH1.textContent = 'Lyrics of song ...';
    boardBox.appendChild(chooseH1);

    let whoPlaysH2 = document.createElement('h2');
    whoPlaysH2.classList.add('whoPlaysText');
    whoPlaysH2.textContent = `Player with ${userIcon1.textContent} icon plays:`;
    boardBox.appendChild(whoPlaysH2);

    let gameBoard = document.createElement('table');
    gameBoard.classList.add('gameBoard');
    boardBox.appendChild(gameBoard);

    let tbody = document.createElement('tbody');
    tbody.classList.add('tbody');
    gameBoard.appendChild(tbody);

    createBoard(tbody, whoPlaysH2);
    
    return babyContainer;
};


botOpponent.addEventListener('click', function(){
    userChoice = 'bot';
    babyContainer.remove();
    chooseSign();
});

personOpponent.addEventListener('click', function(){
    userChoice = 'human';
    babyContainer.remove();
    chooseSign();
});

// generates random number used as bot input
let botArray = [];
const array = ['a', 'b', 'c'];
function getRandom(min = 1, max = 4){
    let letter;
    do{
        let num = Math.floor(Math.random() * (max - min) + min);
        let index = Math.floor(Math.random() * ((max - 1) - (min - 1)) + (min - 1));
        letter = `${array[index]}${num}`;
    }while(botArray.includes(letter, 0));
    botArray.push(letter);
    letter = botArray[botArray.length - 1];
    console.log('Bot plays: ' + letter);
    // console.log('Bot array:');
    // console.log(botArray);
    return letter;
};


const arrayOfDivs = [];
function createBoard(tbody){
    for (let i = 0; i < 3; i++) {
        let tableRow = tbody.insertRow();
        tableRow.classList.add('tableRow');
        tbody.appendChild(tableRow);
        for (let j = 1; j <= 3; j++) {
            let div = document.createElement('div');
            tableRow.appendChild(div);

            if(i === 0){
                div.classList.add(`a${j}`);
            } else if (i === 1){
                div.classList.add(`b${j}`);
            } else div.classList.add(`c${j}`);

            arrayOfDivs.push(div);

            div.addEventListener('click', (e) => {
                // establishCurrentPlayer(div, whoPlaysH2);
                humanPlays(div);
            });
        };
    };
};

class User{
    constructor(player, icon){
        this.array = [];
        this.object = {};
        this.isPlayer = (player == 'human') ? true : false;
        this.icon = icon;
    };

    //adds move to this.array
    addMove(move){
        this.array.push(move);
    };
};

const board = (function (){
    let letter = '';
    let number;

    const gameTable = [
        'a1', 'a2', 'a3',
        'b1', 'b2', 'b3',
        'c1', 'c2', 'c3'
    ];
    
    //checks if spot is available; if not asks for another
    const checkMove = (move) => {
        for(let i = 0; i < gameTable.length; i++){
            if(gameTable[i] === move){
                return true;
            };
        };
        return false;
    };

    //checks if player won
    const winCheck = (player) => {
        if(player.array.includes('a1') && player.array.includes('b2') && player.array.includes('c3')){
            return true;
        } else if(player.array.includes('a3') && player.array.includes('b2') && player.array.includes('c1')){
            return true;
        };

        if(player.object[letter] === 3){
            return true;
        };
        if(player.object[number] === 3){
            return true;
        };
        return false;
    };

    //adds move to gameTable
    const makeMove = (player, move) => {
        if(typeof move === "string" && (move.includes('a') || move.includes('b') || move.includes('c'))){
            for(let i = 0; i < gameTable.length; i++){
                if(gameTable[i] === move){
                    gameTable.splice(i, 1, player.icon.textContent);
                    break;
                };
            };
        };

        console.log('Player moves: ' + move);
        number = move.slice(1);
        letter = move.slice(0, 1);

        (!player.object[letter]) ? player.object[letter] = 1 :  player.object[letter]++;
        (!player.object[number]) ? player.object[number] = 1 : player.object[number]++;
        console.log('Gametable:');
        console.log(gameTable);
    };

    return{checkMove, winCheck, makeMove};
})();

let count = 1;
function CreateUserFunc(){
    let player1 = new User(userChoice, userIcon1); 
    let player2 = new User(userChoice2, userIcon2);
    let cp;

    console.log('player1:');
    console.log(player1);
    console.log('player2:');
    console.log(player2);

    const getPlayer1 = () => {
        return player1;
    };

    const getPlayer2 = () => {
        return player2;
    };

    const toggleCP = () => {
        cp = (cp == player1) ? player2 : player1;
    }

    const getCP = () => {
        return cp;
    }

    function postNews(){
        if(player1.isPlayer && player2.isPlayer){
            //no function since it activates on human input
            console.log('both players are human');
        }
        else if(!player1.isPlayer && !player2.isPlayer){
            //function for both bot players
            console.log('both players are bots');
            while(count != 10){
                botPlays();
            };
        } 
        else if(player1.isPlayer && !player2.isPlayer){
            //code for HP1 and BP2
            console.log('human player 1, bot player 2');
            //no function since it activates on human input
        } 
        else {
            //code for BP1 and HP2
            console.log('bot player 1, human player 2');
            // botPlays();
        };
    };
    postNews();

    return { getPlayer1, getPlayer2, postNews };
};

function regular(){
    console.log('inside regular func');
    console.log('playerGetter:');
    console.log(playerGetter);
    console.log(playerGetter.getPlayer1());
    // console.log('playerGetter.getPlayer2():');
    // console.log(playerGetter.getPlayer2());
};

//displays moves on the grid
function guiManager(div, player){
    let sign = document.createElement('h1');
    if(player.icon.textContent === 'X'){
        sign.textContent = 'X';
        sign.classList.add('xSign');
    } else {
        sign.textContent = 'O';
        sign.classList.add('oSign');
    };

    if(typeof div === 'string'){
        arrayOfDivs.forEach(element => {
            if(element.classList.contains(div)){
                element.appendChild(sign);
            };
        });
    } else div.appendChild(sign);
};

function whileLoopFunc(spot, title){
    let move;
    let player = playerGetter.getCP();
    (typeof spot === 'object') ? move = spot.classList.value : move = spot;
    if(board.checkMove(move)){
        board.makeMove(player, move);
        player.addMove(move);
        guiManager(spot, player);
        if (board.winCheck(player, true)){
            title.textContent = `Player with ${player.icon.textContent} sign won!`;
        };
        count++;
        playerGetter.toggleCP();
        return true;
    } else return false;
};

function countDown(){
    console.log('inside countDown');
    let whoPlaysH2 = document.querySelector('.whoPlaysText');
    if(count % 2 == 0){
        // console.log('first if');
        whoPlaysH2.textContent = `Player with ${playerGetter.getPlayer2().icon.textContent} icon plays:`;
        return playerGetter.getPlayer2();
    } else{
        console.log('second if');
        console.log('playerGetter:');
        console.log(playerGetter);
        console.log(playerGetter.getPlayer1());
        // console.log('playerGetter.getPlayer1():');
        // console.log(playerGetter.getPlayer1());
        whoPlaysH2.textContent = `Player with ${playerGetter.getPlayer1().icon.textContent} icon plays:`;
        return playerGetter.getPlayer1();
    };
};

function humanPlays(div){
    console.log('count1: ' + count);
    let currentPlayer = countDown();
    let whoPlaysH2 = document.querySelector('.whoPlaysText');
    if(whileLoopFunc(div, currentPlayer, whoPlaysH2)){
        count++;
        currentPlayer = countDown();
        if(!currentPlayer.isPlayer){
            botPlays();
            console.log('count2: ' + count);
        };
    } else {
        alert('Field is already taken. Try another spot.');
    };
    console.log('count3: ' + count);
};

function botPlays(){
    // console.log('inside botPlays');
    // let currentPlayer = countDown();
    // let whoPlaysH2 = document.querySelector('.whoPlaysText');
    // let botInput; 
    // do{
    //     botInput = getRandom();
    // } while(!whileLoopFunc(botInput, currentPlayer, whoPlaysH2));
    // count++;
    // currentPlayer = countDown();

    //not necessary as human will play on their own
    // if(currentPlayer.isPlayer){ 
    //     humanPlays();
    //     count++;
    // };
};

//alternative to human and bot functions
// function establishCurrentPlayer(div, whoPlaysH2){
//     let currentPlayer = countDown();
//     whoPlaysH2.textContent = `Player with ${currentPlayer.icon.textContent} icon plays:`;
//     // for human player
//     if(currentPlayer.isPlayer){
//         if(whileLoopFunc(div, currentPlayer, whoPlaysH2)){
//             count++;
//         } else {
//             alert('Field is already taken. Try another spot.');
//         };
//     };
//     currentPlayer = countDown();
//     whoPlaysH2.textContent = `Player with ${currentPlayer.icon.textContent} icon plays:`; //works too fast, slow it down
//     if(!currentPlayer.isPlayer){
//         let botInput; 
//         countDown();
//         do{
//             botInput = getRandom();
//         } while(!whileLoopFunc(botInput, currentPlayer, whoPlaysH2));
//         count++;
//     };
//     currentPlayer = countDown();
//     whoPlaysH2.textContent = `Player with ${currentPlayer.icon.textContent} icon plays:`;
// };
