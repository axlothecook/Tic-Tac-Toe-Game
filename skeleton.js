// GUI variables 

// Initialize stuffs

let count = 0;

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

    getBotInput(){
        // idk
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

function CreateUserFunc(){
    let player1 = new User(userChoice, userIcon1); 
    let player2 = new User(userChoice2, userIcon2);
    let cp = player1;

    console.log('player1:');
    console.log(player1);
    console.log('player2:');
    console.log(player2);

    // const getPlayer1 = () => {
    //     return player1;
    // };

    // const getPlayer2 = () => {
    //     return player2;
    // };

    const toggleCP = () => {
        cp = (cp == player1) ? player2 : player1;
    }

    const getCP = () => {
        return cp;
    }

    return { toggleCP, getCP, getPlayer1, getPlayer2, postNews };
};

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

function humanPlays(div){
    console.log('count1: ' + count);
    let whoPlaysH2 = document.querySelector('.whoPlaysText');
    if(whileLoopFunc(div, whoPlaysH2)){
    } else {
        alert('Field is already taken. Try another spot.');
    };
    console.log('count2: ' + count);
};

function mainLoop(){
    let whoPlaysH2 = document.querySelector('.whoPlaysText');

    while (count != 9){
        if (!playerGetter.getCP().isPlayer){
            let move;
            do{
                move = getRandom();
            } while(!whileLoopFunc(move, whoPlaysH2));
        }
    };
};