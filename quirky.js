function User(player){
    this.array = [];
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

    function addMove(move){
        //TODO add move to this array
    }
}

const board = (function (){
    const gameTable = [
        'a1', 'a2', 'a3',
        'b1', 'b2', 'b3',
        'c1', 'c2', 'c3'
    ];

    const printTable = () => {
        //TODO add print function
    };

    const checkMove = (move) => {
        //TODO check if move exists
        //return true/false
    };

    const winCheck = (player) => {
        //TODO check if player won
        //return true/false
    };

    const makeMove = (move) => {
        //TODO adds move to table!
    }

})();

// TODO: ask for players (1/2 players or bot or 2 bots)
//initialize two objects with above inputs
// let p1 = User(option); x2

let totalMoves = 0;

while (totalMoves != 9){
    let move;
    do {
        move = p1.getInput();
    }
    while (!board.checkMove(move))
    board.addMove(move);
    p1.addMove(move);
    totalMoves++;
    if (board.winCheck(p1)){
        //player won!
    }
    else{
        if (totalMoves != 9){
            do {
                move = p2.getInput();
            }
            while (!board.checkMove(move))
            board.addMove(move);
            p2.addMove(move);
            totalMoves++;

            if (board.winCheck(p2)){
                //player won!
            }
        }
    }
}

if (!board.winCheck(p1) && !board.winCheck(p2)){
    //DRAW
}
