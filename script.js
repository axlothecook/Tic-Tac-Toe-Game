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
        let successA = 0;
        // let successB = 0;
        // let successC = 0;

        function userFinalMove(user){
            userMovesArray.push(user);
            for(let i = 0; i < userMovesArray.length; i++){ //doesnt work bc if first item 
                console.log('userMovesArray[i]:');          //includes a, it will always call
                console.log(userMovesArray[i]);             //successA and wont read beyond 
                if(userMovesArray[i].includes('a', i)){     //beyond first item
                    console.log('userMovesArray[i]:');
                    console.log(userMovesArray[i]);
                    successA++;
                    console.log('successA: ' + successA);
                    if(successA === 3){
                        alert('You Have won (A)');
                        // return true;
                    };
                } 
            };
            console.log('User Array: ');
            console.log(userMovesArray);
            // return user;
        };

        function botFinalMove(bot){
            botMovesArray.push(bot);
            // let successA = 0;
            // let successB = 0;
            // let successC = 0;

            // for(let i = 0; i < botMovesArray.length; i++){
            //     if(botMovesArray[i].includes('a', i)){
            //         successA++;
            //         if(successA === 3){
            //             alert('You Lost (A)');
            //             // return true;
            //         };
            //     } else if(botMovesArray[i].includes('b', i)){
            //         successB++;
            //         if(successB === 3){
            //             alert('You Lost (B)');
            //             // return true;
            //         };
            //     } else if(botMovesArray[i].includes('c', i)){
            //         successC++;
            //         if(successC === 3){
            //             alert('You Lost (C)');
            //             // return true;
            //         };
            //     } else{
            //         console.log('not yet' + `$`);
            //         // return false;
            //     }; 
            // };
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
        printGameTable();
        winCheckVar.userFinalMove(userSpot);
    };

    let numArray = [];
    function getRandom(min = 0, max = 9){
        let num = Math.floor(Math.random() * (max - min) + min);
        if(!(numArray.includes(num, 0))){
            numArray.push(num);
        };
        console.log(numArray);
        num = numArray[numArray.length - 1];
        console.log('BOT PLAYS: ' + num);
        return num;
    };


    //checks to make sure player cnanot overwrite opponent's move
    function botFightsBack(){
        let n = getRandom();
        // console.log('gameTable[n]:');
        // console.log(gameTable[n]);
        if((gameTable[n] !== 'X') && (gameTable[n] !== 'O')){
            // console.log('first route');
            gameTable.splice(n, 1, bot); 
            printGameTable();
            winCheckVar.botFinalMove(gameTable[n]);
        } 
        else{
            // console.log('second route');
            n = '';
            n = getRandom();
            if((gameTable[n] !== 'X') && (gameTable[n] !== 'O')){
                gameTable.splice(n, 1, bot); 
                printGameTable();
                winCheckVar.botFinalMove(gameTable[n]);
            };
        };
    };

    for(let i = 0; i < 10; i++){
        getUserInput();
        botFightsBack();
        winCheck();
        // winCheckVar.userFinalMove();
        // winCheckVar.botFinalMove();
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