let game = (() => {
    let gameArray = ["","","","","","","","",""];
    let symbol = "x";
    //select 0 or x inside the array
    function select(placeNumber){
        placeNumber = placeNumber -1;

        if (placeNumber >= 0 && placeNumber < 9 &&
           gameArray[placeNumber] === ""
        )
        {  
            gameArray[placeNumber] = symbol;
            console.log(gameArray);
            gameFunction.winCheck(gameArray);

            if(symbol === "x"){
                symbol = "o"
            }
            else if(symbol === "o"){
               symbol = "x"
            };
            display.board(gameArray, symbol);
        }
        else{
            console.error("select a valid input or in a valid space");
        }    
    };
    
    //console the array
    function consoleArray(){
        console.log(gameArray);
    };

    return {select, consoleArray};
})();


//manages the game
let gameFunction = (() => {

    let pointX = 0;
    let pointO = 0;
    let rounds = 1;
    let winPatternArray = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function resetArray(gameArray){
        gameArray[0] = "";
        gameArray[1] = "";
        gameArray[2] = "";
        gameArray[3] = "";
        gameArray[4] = "";
        gameArray[5] = "";
        gameArray[6] = "";
        gameArray[7] = "";
        gameArray[8] = "";
    };

    function winCheck(gameArray){

        for(let i=0;i < winPatternArray.length; i++){
            let numberArray = winPatternArray[i];
            const first = numberArray[0];
            const second = numberArray[1];
            const third = numberArray[2];

            if( gameArray[first] === "x" && 
                gameArray[second] === "x" && 
                gameArray[third]=== "x"){

                pointX = ++pointX;
                console.log("x: " + pointX)
                console.log("o: " + pointO)

                rounds = ++rounds;

                resetArray(gameArray);

            }
            else if( gameArray[first] === "o" && 
                gameArray[second] === "o" && 
                gameArray[third]=== "o"){

                pointO = ++pointO;
                console.log("o: " + pointO)
                console.log("x: " + pointX)
                
                rounds = ++rounds;
                resetArray(gameArray);

            }

        };
        if(gameArray.includes("") !== true){
            console.log("DRAW \n Board reset");
            symbol = "x"
            rounds = ++rounds;
            resetArray(gameArray);
        };
  
        if(pointX === 3){
            console.log( "won the game!");
        }
        else if(pointO === 3){
            console.log("won the game!");
        };

    };

    let retry = () => {
        pointX = 0;
        pointO = 0;
        rounds = 1;
    }

    let updateRounds = () => {
        return rounds
    }

    let updatePointX = () => {
        return pointX;
    };

    let updatePointO = () => {
        return pointO;
    };

   


    return {winCheck, updatePointX, updatePointO, updateRounds, retry}
})();    


let display = (() => {
    //home page
    let homePage = document.querySelector("#home-page");
    let playerNamePage = document.querySelector("#player-name-page");
    let gamePage = document.querySelector("#game-page");
    let winPage = document.querySelector("#win-page");

    let homePageButton = document.querySelector(".start-button");

    homePageButton.addEventListener("click", (a) => {
        homePage.hidden = true;
        playerNamePage.hidden = false;
    });

//player name page
    let playerBtn = document.querySelector(".player-button");
    let inputX = document.querySelector(".x-name");
    let inputO = document.querySelector(".o-name");
    let playerX = "";
    let playerO = "";

    playerBtn.addEventListener("click", () =>{
        playerX = inputX.value;
        playerO = inputO.value;
        if(playerX === "" || playerO === "") {
            alert("please enter your name!");
        }
        else{
            console.log(playerX, playerO)
            playerNamePage.hidden = true;
            gamePage.hidden = false;
        }
    })
    //game page
    let gameTurn = document.querySelector(".game-turn");
    let gameRound = document.querySelector(".game-round");
    let gameBoard = document.querySelector(".game-board");
    let displayPointX = document.querySelector(".point-x");
    let displayPointO = document.querySelector(".point-o");
    let winPointX = document.querySelector(".win-point-x");
    let winPointO = document.querySelector(".win-point-o");

    let board = (array,symbol) => {
        for(let i = 0 ;i < 9; i++){
            id = i +1;
            let gameTile = document.getElementById(id);
            gameTile.innerHTML = array[i];
        };
        gameTurn.innerHTML = symbol + " turn";
        gameRound.innerHTML = "Round " + gameFunction.updateRounds();
    };

    let winName = document.querySelector(".win-page-text");
    gameBoard.addEventListener("click", (a)=>{
        let gameTile = a.target;
        game.select(gameTile.id);
        displayPointX.innerHTML = "point-X: " + gameFunction.updatePointX();
        displayPointO.innerHTML = "point-O: " + gameFunction.updatePointO();
        console.log(gameFunction.updatePointX())
       if(gameFunction.updatePointX() === 3){
        winName.innerHTML = playerX + " WIN!"
        winPointX.innerHTML = "point-X: " + gameFunction.updatePointX();
        winPointO.innerHTML = "point-O: " + gameFunction.updatePointO();

        gamePage.hidden = true;
        winPage.hidden = false;
       }
       else if(gameFunction.updatePointO() === 3){
        winName.innerHTML = playerO + " WIN!"
        winPointX.innerHTML = "point-X: " + gameFunction.updatePointX();
        winPointO.innerHTML = "point-O: " + gameFunction.updatePointO();

        gamePage.hidden = true;
        winPage.hidden = false;
       };
        
    });
 
    let retry = document.querySelector(".retry-button");
    retry.addEventListener("click", (a) => {
        gameFunction.retry();
        displayPointX.innerHTML = "Point-X: ";
        displayPointO.innerHTML = "Point-O: ";
        gameRound.innerHTML = "Round 1";
        gamePage.hidden = false;
        winPage.hidden = true;
    })
    return {board}
})();


