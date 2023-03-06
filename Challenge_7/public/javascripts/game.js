//variable

//variable player
const pBatu = document.getElementById('p-batu');
const pKertas = document.getElementById('p-kertas');
const pGunting = document.getElementById('p-gunting');

//variable com
const cBatu = document.getElementById('c-batu');
const cKertas = document.getElementById('c-kertas');
const cGunting = document.getElementById('c-gunting');

//variable lain lain
const refresh = document.getElementById('refresh');
const result = document.getElementById('result');

let comChoices = ["batu", "kertas", "gunting"];
let resultValue;

//COM LOGIC
class comPlay{
    static comRandom(){
        let randomChoice = Math.floor(Math.random()*3);
        let com = comChoices[randomChoice];
        //console.log("comRandom : "+com);
        
        if(com === "batu"){
            //console.log("com pilih batu");
            cBatu.classList.add("btn-suit-choose-game");
        }else if (com === "kertas"){
            //console.log("com pilih kertas");
            cKertas.classList.add("btn-suit-choose-game");
            
        }else{
            //console.log("com pilih gunting");
            cGunting.classList.add("btn-suit-choose-game");
            
        }
        return com;
    }
}

//PLAY LOGIC
class logicPlay extends comPlay{
    static validate(pChoices){
        let comRandom = super.comRandom();
        // console.log("player : "+pChoices)
        // console.log(comRandom);

        if((pChoices === "batu" && comRandom === "gunting") ||
        (pChoices === "kertas" && comRandom === "batu") ||
        (pChoices === "gunting" && comRandom === "kertas")){
            //console.log("WIN");
            resultValue = "PLAYER 1\nWIN";
        }else if (pChoices === comRandom){
            //console.log("DRAW");
            resultValue = "DRAW";
        }else{
            //console.log("LOSE");
            resultValue = "COM\nWIN";
        }

        return resultValue;
    }
}


//DISABLE DOM
function disableFunction(){
    pBatu.classList.add("btn-suit-disable-game")
    pKertas.classList.add("btn-suit-disable-game")
    pGunting.classList.add("btn-suit-disable-game")
}

//RESULT DOM
function resultFunction(){
    //console.log("result : "+play(choose));
    result.innerText = resultValue;
    result.classList.remove("text-danger")
    result.classList.add("result-game")
}

//PLAY FUCNTION & DOM
function play(choose){
    if(choose === "batu"){
        logicPlay.validate("batu");
        pBatu.classList.add("btn-suit-choose-game");
    }else if(choose === "kertas"){
        logicPlay.validate("kertas");
        pKertas.classList.add("btn-suit-choose-game");
    }else{
        logicPlay.validate("gunting");
        pGunting.classList.add("btn-suit-choose-game");
    }
    
    resultFunction();
    disableFunction();
}

//PLAYER BATU ACTION
pBatu.addEventListener('click', function(){
    play("batu");
})

//PLAYER KERTAS ACTION
pKertas.addEventListener('click', function(){
    play("kertas");
})

//PLAYER GUNTING ACTION
pGunting.addEventListener('click', function(){
    play("gunting");
})

//REFRESH ACTION
refresh.addEventListener('click', function(){
    //remove disable btn player
    pBatu.classList.remove("btn-suit-disable-game");
    pKertas.classList.remove("btn-suit-disable-game");
    pGunting.classList.remove("btn-suit-disable-game");

    //remove bg btn player
    pBatu.classList.remove("btn-suit-choose-game");
    pKertas.classList.remove("btn-suit-choose-game");
    pGunting.classList.remove("btn-suit-choose-game");

    //remove bg btn com
    cBatu.classList.remove("btn-suit-choose-game");
    cKertas.classList.remove("btn-suit-choose-game");
    cGunting.classList.remove("btn-suit-choose-game");

    //remove result
    result.innerText = "VS";
    result.classList.add("text-danger")
    result.classList.remove("result-game")
    resultValue = "" 
})