let botOpponent = document.querySelector('.bot-opponent');
let personOpponent = document.querySelector('.person-opponent');
let babyContainer = document.querySelector('.baby-container');
let childContainer = document.querySelector('.child-container');

const arrayOfDivs = [];
let win = false;
let audioPlaying = false;

document.body.addEventListener('click', (e) => {
    if(audioPlaying) return;
    playSong();
});

function CreateUserFunc(){
    let player1 = new User(userChoice, userIcon1); 
    let player2 = new User(userChoice2, userIcon2);
    let cp = player1;

    const toggleCP = () => {
        cp = (cp == player1) ? player2 : player1;
    }

    const getCP = () => {
        return cp;
    }

    // draw check: 
    const drawCheck = () => {
        let whoPlaysH2 = document.querySelector('.whoPlaysText');
        if (!board.winCheck(player1, false) && !board.winCheck(player2, false)){
            whoPlaysH2.textContent = `It's a draw!`;
        };
    }

    return { toggleCP, getCP, drawCheck };
};

// GUI variables 
const guiClass = (function () {

    // creates a popup tasked with getting both player's icons
    const chooseSign = () => {
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
    };

    // creates a popup asking for 2nd opponent identity
    const createBabyContainer = () => {
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
            mainLoop();
        });

        let botH2 = document.createElement('h2');
        botH2.setAttribute('id', 'changing-names');
        botH2.textContent = 'Your Mother';
        botOpponentBox.appendChild(botH2);

        return babyContainer;
    }

    // //creates the playing board gui
    const createBoardFunc = () => {
        let boardBox = document.createElement('div');
        boardBox.classList.add('board-box');
        childContainer.appendChild(boardBox); 

        let parentDiv = document.createElement('div');
        parentDiv.classList.add('parentDiv');
        boardBox.appendChild(parentDiv);

        let titleSong = document.createElement('h1');
        titleSong.classList.add('titleSong');
        titleSong.textContent = `LUNA by ONEUS:`;
        parentDiv.appendChild(titleSong);

        let slider = document.createElement('div');
        slider.classList.add('slider');
        parentDiv.appendChild(slider);

        let text = document.createElement('h1');
        text.classList.add('text');
        text.textContent = '칠흑 같은 밤 홀로 우는 달 그 빛 따라 네가 피고 질까 시간을 거슬러 저 새들처럼 훨훨 더 높이 날아가 아리따웠던 순간의 떨림 나를 감싸던 따스한 두 손이 그리워져 또 찾게 돼 널 덧없이 기다려 시간 따라 흘러가리라 바람 따라 떠나간 너의 빈자리 너는 마치 홀로 피는 꽃 검은 구름아 저 달빛을 가려다오 한밤에 밤에 핀 눈부신 빛처럼 달빛에 반해 핀 하이얀 꽃처럼 한순간 사라진 하룻밤 꿈처럼 별 따라가다 십 리도 못 가라 한밤에 밤에 핀 눈부신 빛처럼 달빛에 반해 핀 하이얀 꽃처럼 한순간 사라진 하룻밤 꿈처럼 달 아래 너는 참 아름답구나 눈을 가려도 아름다워 넌 나를 바라보는 널 끌어안을 때 바람마저 널 찾아 오매불망인데 홀린 듯 밤을 새 헤매인다 가리워지는 너의 뒷모습 (모습) 붙잡지 못한 우리 이야기 되돌린다면 다시 한번 말할 수 있을 텐데 시간 따라 흘러가리라 바람 따라 널 따라가 너는 마치 홀로 피는 꽃 검은 구름아 저 달빛을 가려다오 한밤에 밤에 핀 눈부신 빛처럼';
        slider.appendChild(text);

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
                    humanPlays(div);
                });
            };
        };
    };

    //displays moves on the grid
    function guiManager(div, player){
        let sign = document.createElement('h1');
        sign.classList.add('sign');
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

    return {chooseSign, createBabyContainer, guiManager};
}());

botOpponent.addEventListener('click', function(){
    userChoice = 'bot';
    babyContainer.remove();
    guiClass.chooseSign();
});

personOpponent.addEventListener('click', function(){
    userChoice = 'human';
    babyContainer.remove();
    guiClass.chooseSign();
});

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

    // getBotInput(){
    //     let input = '';
    //     if(!this.isPlayer){
    //         input = board.getRandom();
    //     };
    //     return input;
    // };
};


const board = (function (){
    let letter = '';
    let number;

    const gameTable = [
        'a1', 'a2', 'a3',
        'b1', 'b2', 'b3',
        'c1', 'c2', 'c3'
    ];

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
        return letter;
    };
    
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

        number = move.slice(1);
        letter = move.slice(0, 1);

        (!player.object[letter]) ? player.object[letter] = 1 :  player.object[letter]++;
        (!player.object[number]) ? player.object[number] = 1 : player.object[number]++;
    };

    return{getRandom, checkMove, winCheck, makeMove};
})();

function whileLoopFunc(spot, title){
    let move;
    let player = playerGetter.getCP();
    (typeof spot === 'object') ? move = spot.classList.value : move = spot;
    if((count != 9) && (!win)){
        if(board.checkMove(move)){
            board.makeMove(player, move);
            player.addMove(move);
            guiClass.guiManager(spot, player);
            if (board.winCheck(player, true)){
                title.textContent = `Player with ${player.icon.textContent} sign won!`;
                win = true;
            };
            count++;
            playerGetter.toggleCP();
            return true;
        } else return false;
    };
};

function humanPlays(div){
    let whoPlaysH2 = document.querySelector('.whoPlaysText');
    if(whileLoopFunc(div, whoPlaysH2)){
        if(count === 9){
            playerGetter.drawCheck();
        };
    } else if(!win){
        alert('Field is already taken. Try another spot.');
    };
    mainLoop();
};

function mainLoop(){
    let whoPlaysH2 = document.querySelector('.whoPlaysText');

    if((userChoice === 'bot') && (userChoice2 === 'bot')){
        while ((count != 9) && (!win)){
            let move;
            do{
                setTimeout(() => {
                    console.log('fun');
                }, 2000);
                move = board.getRandom();
            } while(!whileLoopFunc(move, whoPlaysH2));
        };
    } else if(!playerGetter.getCP().isPlayer){
        if((count != 9) && (!win)){
            setTimeout(() => {
                let move;
                do{
                    move = board.getRandom();
                } while(!whileLoopFunc(move, whoPlaysH2));
            }, 1000);
        };
    };
    if(count === 9){
        playerGetter.drawCheck();
    };
};

function playSong(){
    audioPlaying = true;
    const mySong = document.querySelector('#my-song');
    mySong.play();
};