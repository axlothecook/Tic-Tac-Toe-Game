let botOpponent = document.querySelector('.bot-opponent');
let personOpponent = document.querySelector('#person-opponent');
let chooseH1 = document.querySelector('#choose-h1');
let babyContainer = document.querySelector('.baby-container');


const gameTable = [
    'a1', 'a2', 'a3',
    'b1', 'b2', 'b3',
    'c1', 'c2', 'c3'
];

                     //userPlays
function whoPlaysWhat(){
    // let userChoice = prompt(`To play against bot, type 'bot'. For another player, type 'player': `, '').toLowerCase();
    // console.log(userChoice);

    //vairable that stores user's sign choice
    let  userPlays = prompt('Choose your player: X or O', '').toUpperCase();

    //variable that stores user input
    let userSpot;

    //reusable security check
    while(!(userPlays === 'X' || userPlays === 'x' || userPlays === 'O' || userPlays === 'o')){
        alert('Please enter X or O.');
        userPlays = prompt('Choose your player: X or O', '').toUpperCase();
    };


    //bot chooses sign
    let bot = '';
    if(userPlays === 'X' || userPlays === 'x'){
        bot = 'O';
    } else bot = 'X';

    function printGameTable(){
        console.log(
        `        [${gameTable[0]}] [${gameTable[1]}] [${gameTable[2]}] \n
        [${gameTable[3]}] [${gameTable[4]}] [${gameTable[5]}] \n
        [${gameTable[6]}] [${gameTable[7]}] [${gameTable[8]}]`
        );
    }

    printGameTable();

    let userCopyArray = [];

    //WINCHECK START
    function winCheck(){
        let userMovesArray = [];
        let botMovesArray = [];
        let userObject = {};
        let botObject = {};
        let userCounter = 0;
        let botCounter = 0;
         
        function userFinalMove(user){
            userMovesArray.push(user);
            userCopyArray.push(user);
            userCounter++;
            for(let i = userCounter - 1; i < userCounter; i++){
                //code below is for diagonal win
                if(userMovesArray.includes('a1') && userMovesArray.includes('b2') && userMovesArray.includes('c3')){
                    console.log('You Win! [code: 0 - 4 - 8]');
                    return false;
                } else if(userMovesArray.includes('a3') && userMovesArray.includes('b2') && userMovesArray.includes('c1')){
                    console.log('You Win! [code: 2 - 4 - 6]');
                    return false;
                };

                // code below is for row & column win
                let letter = userMovesArray[i].slice(0, 1);
                let number = userMovesArray[i].slice(1);   
                if(!userObject[letter]){
                    userObject[letter] = 1;
                } else {
                    userObject[letter]++;
                };

                if(!userObject[number]){
                    userObject[number] = 1;
                } else {
                    userObject[number]++;
                };

                if(userObject[letter] === 3){
                    console.log(`You Won! Letter ${letter} was played 3 times!`);
                    return false;
                    
                };
                if(userObject[number] === 3){
                    console.log(`You Won! Number ${number} appeared 3 times`);
                    return false;
                };
            };
            return true;
        };

        function botFinalMove(bot){
            botMovesArray.push(bot);
            botCounter++;
            for(let i = botCounter - 1; i < botCounter; i++){
                //code below is for diagonal win
                if(botMovesArray.includes('a1') && botMovesArray.includes('b2') && botMovesArray.includes('c3')){
                    console.log('You Lose! [code: 0 - 4 - 8]');
                    return false;
                } else if(botMovesArray.includes('a3') && botMovesArray.includes('b2') && botMovesArray.includes('c1')){
                    console.log('You Lose! [code: 2 - 4 - 6]');
                    return false;
                };

                // code below is for row & column win
                let letter = botMovesArray[i].slice(0, 1);
                let number = botMovesArray[i].slice(1);
                if(!botObject[letter]){
                    botObject[letter] = 1;
                } else {
                    botObject[letter]++;
                };

                if(!botObject[number]){
                    botObject[number] = 1;
                } else {
                    botObject[number]++;
                };

                if(botObject[letter] === 3){
                    console.log(`You Lost! Bot played letter ${letter} 3 times!`);
                    return false;
                };
                if(botObject[number] === 3){
                    console.log(`You Won! Number ${number} appeared 3 times`);
                    return false;
                };
            };
            return true;
        };

        return {
            userFinalMove,
            botFinalMove,
        };
    };
    //WINCHECK END

    var winCheckVar = winCheck();

    function getUserInput(){
        let count = 0;
        for(let x = 0; x < (count + 1); x++){
            userSpot = prompt(`Enter the name of the field you want to play, like a2: `, '').toLowerCase();
            for(let i = 0; i < gameTable.length; i++){
                if(gameTable[i] === userSpot){
                    if((gameTable[i] !== 'X') || (gameTable[i] !== 'O')){
                        gameTable.splice(i, 1, userPlays);
                        console.log('Player plays: ' + userSpot);
                        printGameTable(); 
                        if(winCheckVar.userFinalMove(userSpot) == false){
                            return false;
                        } 
                        else if(userCopyArray.length === 5){
                            return console.log(`It's a draw!`); 
                        } else{
                            return true;
                        };
                    } else break;
                };
            };
            alert('That field is not available. Please choose another.');
            count++;
        };
    };

    let numArray = [];
    function getRandom(min = 0, max = 9){
        let num = Math.floor(Math.random() * (max - min) + min);
        while(numArray.includes(num, 0)){
            num = Math.floor(Math.random() * (max - min) + min);
        };
        numArray.push(num);
        num = numArray[numArray.length - 1];
        return num;
    };


    //checks to make sure bot cannot overwrite human's move
    function botFightsBack(){
        if(userCopyArray.length === 5){
            return false;
        };
        let n = getRandom();
        while(((gameTable[n] == 'X') || (gameTable[n] == 'O'))){
            n = '';
            n = getRandom();
        };
        let saveVar = gameTable[n];
        gameTable.splice(n, 1, bot); 
        console.log('Bot plays: ' + saveVar);
        printGameTable();

        //condition for game to stop if bot wins
        if(winCheckVar.botFinalMove(saveVar) == false){
            return false;
        };
        return true;
    };

    while(getUserInput() && botFightsBack()){
        console.log('');
    };

    return{
        botFightsBack,
        winCheck
    };
};

const variable = whoPlaysWhat();
variable.winCheck();
