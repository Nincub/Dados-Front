/*
Reglas de juego!

El juego tiene dos jugadores, los cuales participan por turno
En cada turno, un jugador lanza el dado las veces que quiera y
el resultado de dichos dados es sumado al puntaje de RONDA de dicho jugador
Pero si el jugador obtiene un 1, todo el puntaje de la ronda
se pierde y continúa el siguiente jugador.
Cada jugador en su ronda puede elegir 'Hold', lo que significa que el puntaje de RONDA
se es sumado a su puntuación global, depues de esto, es el turno del siguiente jugador.
El que logre completar 100 puntos gana! :D
*/

window.onload = () => {
    document.getElementById("newgame").click();
};

var turno = 1;
var intervalo;
var ban = 0;

document.getElementById("newgame").addEventListener("click", () => {
   setScore0(0);
   setScore1(0);
   setCurrent0(0);
   setCurrent1(0);
   changeActive(1);
//   if (turno === 1) {
//        changeActive(2);
//   } else {
//       changeActive(1);
//   }
   
});



document.getElementsByClassName("btn-roll")[0].addEventListener("click", () => {
    let ran = random();
    let ran1 = random1();
    while (Number.isNaN(ran)) {
        ran = random();
    }
    while (Number.isNaN(ran1)) {
        ran1 = random1();
    }
    document.getElementsByClassName("dice")[0].src = "dice-" + ran + ".png";
    document.getElementsByClassName("dice")[0].alt = "dice-" + ran;
    document.getElementsByClassName("dice1")[0].src = "dice-" + ran1 + ".png";
    document.getElementsByClassName("dice1")[0].alt = "dice-" + ran1;
    if (ran !== 1 && ran1 !==1) {
        if (ran === 6 && ran1 === 6) {
            if (turno === 1) {
                getScore0() <= 0? setScore0(getScore0() - 50) : setScore0(0);
                setCurrent0(0);
                changeActive(2);
            } else {
                getScore1() <= 0? setScore1(getScore1() - 50) : setScore1(0);
                setCurrent1(0);
                changeActive(1);
            }
        } else {
            if (turno === 1) {
                setCurrent0(getCurrent0() + ran + ran1); 
            } else {
                setCurrent1(getCurrent1() + ran + ran1);
            }
        }
    } else {
        if (turno === 1) {
            setCurrent0(0);
            changeActive(2);
        } else {
            setCurrent1(0);
            changeActive(1);
        }
        
    }
});

document.getElementsByClassName("btn-hold")[0].addEventListener("click", () => {
    if (turno === 1) {
        setScore0(getScore0() + getCurrent0());
        setCurrent0(0);
        changeActive(2);
        if (getScore0() > 99) {
            alert("Player 1 winn");
            document.getElementById("newgame").click();
        }
            
    } else {
        setScore1(getScore1() + getCurrent1());
        setCurrent1(0);
        changeActive(1);
        if (getScore1() > 99) {
            alert("Player 2 winns");
            document.getElementById("newgame").click();
        }
            
    }
});

function vsCPU () {
    return setInterval('intFun()', 1123);
}

function intFun () {
    document.getElementsByClassName("btn-roll")[0].click();
    ban++;
    if(getCurrent1() > 15) {
        window.clearInterval(intervalo);
        document.getElementsByClassName("btn-hold")[0].click();
        ban = 0;
    }
}


function changeActive (a) {
    if (a === 1)
        window.clearInterval(intervalo);
    document.getElementsByClassName("player-0-panel")[0].className = document.getElementsByClassName("player-0-panel")[0].className.replace("active", "");
    document.getElementsByClassName("player-1-panel")[0].className = document.getElementsByClassName("player-1-panel")[0].className.replace("active", "");
    switch (a) {
        case 1:
            document.getElementsByClassName("player-0-panel")[0].className += " active";
            turno = a;
            break;
        case 2:
            document.getElementsByClassName("player-1-panel")[0].className += " active";
            turno = a;
            intervalo = vsCPU();
            break;
        default : 
            console.log("se paso un valor no valido");
            break;
    }
}

function setScore0 (a) {
    document.getElementById("score-0").innerHTML = a;
}

function getScore0 () {
    return parseInt(document.getElementById("score-0").innerHTML);
}

function setScore1 (a) {
    document.getElementById("score-1").innerHTML = a;
}

function getScore1 () {
    return parseInt(document.getElementById("score-1").innerHTML);
}

function setCurrent0 (a) {
    document.getElementById("current-0").innerHTML = a;
}

function getCurrent0 () {
    return parseInt(document.getElementById("current-0").innerHTML);
}

function setCurrent1 (a) {
    document.getElementById("current-1").innerHTML = a;
}

function getCurrent1 () {
    return parseInt(document.getElementById("current-1").innerHTML);
}

function random () {
    let date = new Date();   
    let mili =  parseFloat(date.getMilliseconds());
    mili = 1.0 / mili;
    mili *= 10000;
    mili = parseInt(mili);
    mili %= 6;
    return mili + 1;
}

function random1 () {
    let date = new Date();   
    let mili =  parseFloat(date.getMilliseconds());
    mili = 1.0 / (mili * mili);
    mili *= 1000000;
    mili = parseInt(mili);
    mili %= 6;
    return mili + 1;
}

