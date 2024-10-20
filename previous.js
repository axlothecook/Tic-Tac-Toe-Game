let botOpponent = document.querySelector('.bot-opponent');
let personOpponent = document.querySelector('.person-opponent');
let babyContainer = document.querySelector('.baby-container');
let childContainer = document.querySelector('.child-container');

let userChoice, userChoice2, userIcon1, userIcon2;

// creates a popup tasked with getting both player's icons
function chooseSign(){
    let babyContainer = document.createElement('div');
    babyContainer.classList.add('baby-container');
    childContainer.appendChild(babyContainer); 

    let chooseH1 = document.createElement('h1');
    chooseH1.setAttribute('id', 'choose-h1');
    chooseH1.textContent = 'What sign you wanna play?';
    babyContainer.appendChild(chooseH1);

    let mainDiv = document.createElement('div');
    mainDiv.classList.add('mainDiv');
    babyContainer.appendChild(mainDiv);

    let xSign = document.createElement('h1');
    xSign.classList.add('xSign');
    xSign.textContent = 'X';
    mainDiv.appendChild(xSign);
    xSign.addEventListener('click', (e) => {
        userIcon1 = 'X';
        userIcon2 = 'O';
        babyContainer.remove(e);
        createBabyContainer();
    });

    let oSign = document.createElement('h1');
    oSign.classList.add('oSign');
    oSign.textContent = 'O';
    mainDiv.appendChild(oSign);
    oSign.addEventListener('click', (e) => {
        userIcon1 = 'O';
        userIcon2 = 'X';
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
    chooseH1.setAttribute('id', 'choose-h1');
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
        boardVar = createBoardFunc();
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
        boardVar = createBoardFunc;
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
    chooseH1.setAttribute('id', 'choose-h1');
    chooseH1.textContent = 'Lyrics of song ...';
    boardBox.appendChild(chooseH1);

    let gameBoard = document.createElement('table');
    gameBoard.classList.add('gameBoard');
    boardBox.appendChild(gameBoard);

    let tbody = document.createElement('tbody');
    tbody.classList.add('tbody');
    gameBoard.appendChild(tbody);

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
            div.addEventListener('click', (e) => {
                
                console.log('clicked: ');
                console.log(div.classList);

                for(let i = 0; i < array.length; i++){
                    if(gameTable[i] == div.classList){
                        console.log(gameTable[i] + ' is equal to ' + div.classList);
                    };
                };
            });
        };
    };
    return babyContainer;
}


botOpponent.addEventListener('click', (e) => {
    userChoice = 'bot';
    babyContainer.remove(e);
    chooseSign();
});

personOpponent.addEventListener('click', (e) => {
    userChoice = 'human';
    babyContainer.remove(e);
    chooseSign();
});


// generates random number used as bot input
let numArray = [];
function getRandom(min = 0, max = 9){
    let num = Math.floor(Math.random() * (max - min) + min);
    while(numArray.includes(num, 0)){
        num = Math.floor(Math.random() * (max - min) + min);
    };
    numArray.push(num);
    num = numArray[numArray.length - 1];
    console.log('num: ' + num);
    return num;
};

function User(player, icon){
    this.array = [];
    this.object = {};
    this.isPlayer = (player == 'human') ? true : false;
    this.icon = icon;

    this.getInput = function getInput(){
        let input = '';
        if(this.isPlayer){
            //Player input
            input = prompt('Enter a field: ', '');
        }
        else{
            //Bot input
            input = getRandom();
        };
        return input;
    };

    this.addMove = function addMove(move){
        //adds move to this.array
        this.array.push(move);
    };
};

let player1 = new User(userChoice, userIcon1);
let player2 = new User(userChoice2, userIcon2);


const board = (function (){
    let letter = '';
    let number;

    const gameTable = [
        'a1', 'a2', 'a3',
        'b1', 'b2', 'b3',
        'c1', 'c2', 'c3'
    ];

    //prints the gameboard
    const printTable = () => {
        console.log(
        `        [${gameTable[0]}] [${gameTable[1]}] [${gameTable[2]}] \n
        [${gameTable[3]}] [${gameTable[4]}] [${gameTable[5]}] \n
        [${gameTable[6]}] [${gameTable[7]}] [${gameTable[8]}]`
        );
    };
    
    //checks if spot is available; if not asks for another
    const checkMove = (move) => {
        for(let i = 0; i < gameTable.length; i++){
            if(typeof move == 'number'){
                if(!(gameTable[move] == 'X') && !(gameTable[move] == 'O')){
                    move = gameTable[move];
                } else return false;
            };
            if(gameTable[i] == move){
                return true;
            };
        };
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
    const makeMove = (player, move, playerSign) => {
        if(typeof move === "string" && (move.includes('a') || move.includes('b') || move.includes('c'))){
            for(let i = 0; i < gameTable.length; i++){
                if(gameTable[i] === move){
                    gameTable.splice(i, 1, playerSign);
                    break;
                };
            };
        };

        number = move.slice(1);
        letter = move.slice(0, 1);

        (!player.object[letter]) ? player.object[letter] = 1 :  player.object[letter]++;
        (!player.object[number]) ? player.object[number] = 1 : player.object[number]++;
    };

    return{ printTable, checkMove, winCheck, makeMove };
})();

board.printTable();


let totalMoves = 0;

while (totalMoves != 9){
    console.log('PLAYER 1 MOVE:');
    let move;
    do {
        move = player1.getInput();
        console.log('move: ');
        console.log(move);
    } while (!board.checkMove(move));
    board.makeMove(player1, move, player1.icon);
    player1.addMove(move);
    board.printTable();
    totalMoves++;
    if (board.winCheck(player1, true)){
        console.log(`Player 1 won!`);
        break;
    }
    else{
        if (totalMoves != 9){
            console.log('PLAYER 2 MOVE:');
            do {
                move = player2.getInput();
            } while (!board.checkMove(move));
            board.makeMove(player2, move, player2.icon);
            player2.addMove(move);
            board.printTable();
            totalMoves++;

            if (board.winCheck(player2, true)){
                console.log(`Player 2 won!`);
                break;
            };
        };
    };
};

if (!board.winCheck(player1, false) && !board.winCheck(player2, false)){
    console.log(`It's a draw.`);
};
