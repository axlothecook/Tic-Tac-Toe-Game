let botOpponent = document.querySelector('.bot-opponent');
let personOpponent = document.querySelector('#person-opponent');
let chooseH1 = document.querySelector('#choose-h1');
let babyContainer = document.querySelector('.baby-container');


const gameTable = [
    'a1', 'a2', 'a3',
    'b1', 'b2', 'b3',
    'c1', 'c2', 'c3'
];

function whoPlaysWhat(){
    let bot = '';
    let userPlays, userPlays2;
    let userSpot, userSpot2;    
    let userMovesArray = [];
    let user2MovesArray = [];
    let botMovesArray = [];

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
        let playerObject = {}
         
        function playerMove(array, counter, player){
            counter++;
            for(let i = counter - 1; i < counter; i++){
                //code below is for diagonal win
                if(array.includes('a1') && array.includes('b2') && array.includes('c3')){
                    console.log(`${player} wins! [code: 0 - 4 - 8]`);
                    return false;
                } else if(array.includes('a3') && array.includes('b2') && array.includes('c1')){
                    console.log(`${player} wins! [code: 2 - 4 - 6]`);
                    return false;
                };

                // code below is for row & column win
                let letter = array[array.length - 1].slice(0, 1);
                let number = array[i].slice(1);   
                if(!playerObject[letter]){
                    playerObject[letter] = 1;
                } else {
                    playerObject[letter]++;
                };

                if(!playerObject[number]){
                    playerObject[number] = 1;
                } else {
                    playerObject[number]++;
                };

                if(playerObject[letter] === 3){
                    console.log(`${player} won! Letter ${letter} was played 3 times!`);
                    return false;
                    
                };
                if(playerObject[number] === 3){
                    console.log(`${player} won! Number ${number} appeared 3 times`);
                    return false;
                };
            };
            return true;
        }; 
        return playerMove;
    };
    //WINCHECK END

    var winCheckVar = winCheck();

    function getUserInput(){
        let player= 'Player 1'
        let count = 0;
        for(let x = 0; x < (count + 1); x++){
            userSpot = prompt(`Enter the name of the field you want to play, like a2: `, '').toLowerCase();
            for(let i = 0; i < gameTable.length; i++){
                if(gameTable[i] === userSpot){
                    if((gameTable[i] !== 'X') || (gameTable[i] !== 'O')){
                        userMovesArray.push(userSpot);
                        userCopyArray.push(userSpot);
                        gameTable.splice(i, 1, userPlays);
                        console.log('Player 1 plays: ' + userSpot);
                        printGameTable(); 
                        if(winCheckVar.playerMove(userMovesArray, count, player) == false){
                            return false;
                        } else if(userCopyArray.length === 5){
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

    function getUser2Input(){
        let player= 'Player 2';
        let count = 0;
        for(let x = 0; x < (count + 1); x++){
            userSpot2 = prompt(`Now you enter: `, '').toLowerCase();
            for(let i = 0; i < gameTable.length; i++){
                if(gameTable[i] === userSpot2){
                    if((gameTable[i] !== 'X') || (gameTable[i] !== 'O')){
                        user2MovesArray.push(userSpot2);
                        gameTable.splice(i, 1, userPlays2);
                        console.log('Player 2 plays: ' + userSpot2);
                        printGameTable(); 
                        if(winCheckVar.playerMove(user2MovesArray, count, player) == false){
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
        let player = 'Bot';
        let count = 0;
        if(userCopyArray.length === 5){
            return false;
        };
        let n = getRandom();
        while(((gameTable[n] == 'X') || (gameTable[n] == 'O'))){
            n = '';
            n = getRandom();
        };
        let saveVar = gameTable[n];
        botMovesArray.push(saveVar);
        gameTable.splice(n, 1, bot); 
        console.log('Bot plays: ' + saveVar);
        printGameTable();

        //condition for game to stop if bot wins
        if(winCheckVar.playerMove(botMovesArray, count, player) == false){
            count++;
            return false;
        };
        count++;
        return true;
    };


    

    let userChoice = prompt(`To play against bot type 'bot'. For another player type 'player': `, '').toLowerCase();
    console.log(userChoice);
    function User(player){
        this.array = [];
        this.counter = 0;
        this.isPlayer = (player === 'player') ? true : false;

        function getInput(){
            input = "";
            if(this.isPlayer){
                //Player input stuff here
            }
            else{
                //Bot random number here
            }
            return input;
        }
    }



    let playe = new User(userChoice);
    console.log(playe);



    if(userChoice === 'bot'){
        userPlays = prompt('Choose your player: X or O', '').toUpperCase();

        //reusable security check
        while(!(userPlays === 'X' || userPlays === 'x' || userPlays === 'O' || userPlays === 'o')){
            alert('Please enter X or O.');
            userPlays = prompt('Choose your player: X or O', '').toUpperCase();
        };
        
        //bot chooses sign
        if(userPlays === 'X' || userPlays === 'x'){
            bot = 'O';
        } else bot = 'X';
        
        //game starts
        while(getUserInput() && botFightsBack()){
            console.log('');
        };
    } 
    else if(userChoice === 'player'){
        userPlays = prompt('Choose your player: X or O', '').toUpperCase();

        //reusable security check
        while(!(userPlays === 'X' || userPlays === 'x' || userPlays === 'O' || userPlays === 'o')){
            alert('Please enter X or O.');
            userPlays = prompt('Choose your player: X or O', '').toUpperCase();
        };

        //variable that stores user input
        if((userPlays === 'x' || userPlays === 'X')){
            userPlays2 = 'O';
        } else if((userPlays === 'o' || userPlays === 'O')){
            userPlays2 = 'X';
        }; 

        //game starts 
        while(getUserInput() && getUser2Input()){
            console.log('');
        };
    } else{
        alert('invalid, like wtf u want dis game was written on 13+ redbulls and 6h sleep session why u joking with me rn put the fries in the bag lil bro sid down mfk if u cant type in one or the other eat your high school 12th grade graduation paper so ur iq can rise back to average so u know how to write and speak again cuz this 0/10 gyat uneducated fuck cant read and write like an average ape');
    };

    return{
        botFightsBack,
        winCheck
    };
};

const variable = whoPlaysWhat();
variable.winCheck();
