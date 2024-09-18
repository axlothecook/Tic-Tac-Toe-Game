const gameTable = [
    'a1', 'a2', 'a3',
    'b1', 'b2', 'b3',
    'c1', 'c2', 'c3'
];

function whoPlaysWhat(){
    // let userChoice = prompt(`To play against bot, type 'bot'. For another player, type 'player': `, '').toLowerCase();
    // console.log(userChoice);

    //user original choice
    let  userPlays = prompt('Choose your player: X or O', '').toUpperCase();

    //user input stored
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


    function winCheck(){
        let userMovesArray = [];
        let botMovesArray = [];
        let userObject = {};
        let botObject = {};
        let userCounter = 0;
        let botCounter = 0;
         
        function userFinalMove(user){
            userMovesArray.push(user);
            userCounter++;
            for(let i = userCounter - 1; i < userCounter; i++){
                //code below is for diagonal win
                if(userMovesArray.includes('a1') && userMovesArray.includes('b2') && userMovesArray.includes('c3')){
                    alert('You Win! [code: 0 - 4 - 8]');
                } else if(userMovesArray.includes('a3') && userMovesArray.includes('b2') && userMovesArray.includes('c1')){
                    alert('You Win! [code: 2 - 4 - 6]');
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
                    alert(`You Won! Letter ${letter} was played 3 times!`);
                };
                if(userObject[number] === 3){
                    console.log(`You Won! Number ${number} appeared 3 times`);
                };
            };
            console.log(userObject);
        };

        function botFinalMove(bot){
            botMovesArray.push(bot);
            console.log(botMovesArray);
            botCounter++;
            for(let i = botCounter - 1; i < botCounter; i++){
                //code below is for diagonal win
                if(botMovesArray.includes('a1') && botMovesArray.includes('b2') && botMovesArray.includes('c3')){
                    alert('You Lose! [code: 0 - 4 - 8]');
                } else if(botMovesArray.includes('a3') && botMovesArray.includes('b2') && botMovesArray.includes('c1')){
                    alert('You Lose! [code: 2 - 4 - 6]');
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
                    alert(`You Lost! Bot played letter ${letter} 3 times!`);
                };
                if(botObject[number] === 3){
                    console.log(`You Won! Number ${number} appeared 3 times`);
                };
            };
            console.log(botObject);
        };

        return {
            userFinalMove,
            botFinalMove
        };
    }

    var winCheckVar = winCheck();

    function getUserInput(){
        userSpot = prompt(`Enter the name of the field you want to play, like a2: `, '').toLowerCase();
        for(let i = 0; i < 9; i++){
            if(gameTable[i] === userSpot){
                gameTable.splice(i, 1, userPlays);
                break;
            };
        };
        console.log('Player plays:');
        printGameTable();
        winCheckVar.userFinalMove(userSpot);
    };

    let numArray = [];
    function getRandom(min = 0, max = 9){
        let num = Math.floor(Math.random() * (max - min) + min);
        while(numArray.includes(num, 0)){
            num = Math.floor(Math.random() * (max - min) + min);
        };
        numArray.push(num);
        console.log(numArray);
        num = numArray[numArray.length - 1];
        console.log('BOT PLAYS: ' + num);
        return num;
    };


    //checks to make sure player cnanot overwrite opponent's move
    function botFightsBack(){
        let n = getRandom();
        while(((gameTable[n] == 'X') || (gameTable[n] == 'O'))){
            console.log('second route');
            n = '';
            n = getRandom();
        };
        console.log('first route');
        let saveVar = gameTable[n];
        gameTable.splice(n, 1, bot); 
        printGameTable();
        winCheckVar.botFinalMove(saveVar);
    };

    for(let i = 0; i < 10; i++){
        getUserInput();
        botFightsBack();
    };
    
    return {
        winCheck,
        userPlays,
        bot,
        printGameTable,
        getUserInput,
        botFightsBack,
    };
}

const variable = whoPlaysWhat();
variable.winCheck();
variable.printGameTable();
variable.getUserInput();
variable.botFightsBack();