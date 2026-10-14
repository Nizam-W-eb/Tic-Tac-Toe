let game = (() => {
    let gameArray = ["","","","","","","","",""];
    let nextSymbol = "x";
    let isActive = false;

    //select 0 or x inside the array
    function select(placeNumber, placeHolder){
        placeNumber = placeNumber -1;

        if (placeNumber >= 0 && placeNumber < 9 &&
          (placeHolder === "x" || placeHolder === "o") && gameArray[placeNumber] === "" 
          && (placeHolder === nextSymbol || isActive !== true))
        {  
            gameArray[placeNumber] = placeHolder;
            console.log(gameArray);
            gameFunction.winCheck(gameArray, isActive);

            if(placeHolder === "x"){
                nextSymbol = "o"
            }
            else if(placeHolder === "o"){
                nextSymbol = "x"
            };
            isActive = true;
        }
        else{
            console.error("select a valid input or in a valid space");
        }    
    };
    
    //console the array
    function consoleArray(){
        console.log(gameArray);
    }

    return {select, consoleArray};
})();


//manages the game
let gameFunction = (() => {

    let pointX = 0;
    let pointO = 0;
    winPatternArray = [
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

    function winCheck(gameArray, isActive){
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
                resetArray(gameArray);

                isActive = false;
            }
            else if( gameArray[first] === "o" && 
                gameArray[second] === "o" && 
                gameArray[third]=== "o"){

                pointO = ++pointO;
                console.log("o: " + pointO)
                console.log("x: " + pointX)
                resetArray(gameArray);

                isActive = false;
            }
        };
        if(gameArray.includes("") !== true){
            console.log("DRAW \n Board reset");
            resetArray(gameArray);
        };

        if(pointX === 3){
            console.log(players.playerX.name + " won the game!");
        }
        else if(pointO === 3){
            console.log(players.playerO.name + " won the game!");
        };

    };

    return {winCheck, pointX, pointO}
})();    

let player = (() => {
    let playerX = "";
    let playerO = "";
})();
let display = (() => {
    let homePage = document.querySelector("#home-page");
    let playerNamePage = document.querySelector("#player-name-page");
    let gamePage = document.querySelector("#game-page");
    let winPage = document.querySelector("#win-page");

    let homePageButton = document.querySelector(".start-button");

    homePageButton.addEventListener("click", (a) => {
        homePage.hidden = true;
        playerNamePage.hidden = false;
    });


    let playerBtn = document.querySelector(".player-button");
    let inputX = document.querySelector(".x-text");
    let inputO = document.querySelector(".o-name").value;
    let playerX = "";
    let playerO = "";

    playerBtn.addEventListener("click", () =>{
        playerX = inputX.value;
        playerO = inputO.value;
        if(playerX === "" || playerO === "") {
            alert("please enter your name!");
        }
        else{
            playerNamePage.hidden = true;
            gamePage.hidden = false;
        }
    })
})();


