const RIGHE = 6;
const COLONNE = 7;


const GRIGIO = "gray";
const GIALLO = "yellow";
const ROSSO = "red";


let turno = 0;
let partitaFinita = false;


window.onload = function () {
    /*creaTabella();
    aggiornaTurno();*/
    caricaWrapper();
    const nextPlayer = document.getElementById("nextPlayer");
    nextPlayer.classList.add("pedina");
    nextPlayer.style.backgroundColor = GIALLO;
};


function caricaWrapper() {
    const wrapper = document.querySelector("#wrapper");
    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            const div = document.createElement("div");
            div.classList.add("pedina");
            div.id = `div-${i}-${j}`;
            wrapper.appendChild(div);


            if (i == 5) {
                div.addEventListener("click", pedinaClick);
            }
        }


    }
}
function pedinaClick() {


    const turno = recuperaTurno();
    if (turno == "G") {
        this.style.backgroundColor = GIALLO;
    } else {
        this.style.backgroundColor = ROSSO;
    }
    this.removeEventListener("click", pedinaClick);


    //Aggiorno e rendo cliccabile la cella superiore
    const rSup = parseInt(this.id.split("-")[1] - 1);
    const cSup = parseInt(this.id.split("-")[2]);
    if (rSup >= 0) {
        const cellaSup = document.getElementById(`div-${rSup}-${cSup}`);
        cellaSup.addEventListener("click", pedinaClick);
    }


    //Aggiorno il cololre della pedina in basso in base al turno
    const nextPlayer = document.getElementById("nextPlayer");
    if (turno == "G") {
        nextPlayer.style.backgroundColor = ROSSO;
    }
    else {
        nextPlayer.style.backgroundColor = GIALLO;
    }const Vittoria = controllaVittoria(this);


    if (Vittoria) {
        const colore = turno == "G" ? GIALLO : ROSSO;
        alert(`Il giocatore ${turno} ha vinto!`);
        disabilitaPedine();
    }
}


function disabilitaPedine() {
    const pedina = document.querySelectorAll(".pedina");
    for (const pedine of pedina) {
        pedine.removeEventListener("click", pedinaClick);
    }
}



function controllaVittoria(pedinaC) {
    // Check verticale
    let cont = 1;
    for (let i = 1; i < 4; i++) {
        const righe = parseInt(pedinaC.id.split("-")[1]) + i;
        const colonne = parseInt(pedinaC.id.split("-")[2]);
        if (righe < RIGHE) {
            const cellainf = document.getElementById(`div-${righe}-${colonne}`);
            if (cellainf && cellainf.style.backgroundColor == pedinaC.style.backgroundColor) {
                cont++;
            } else {
                break;
            }
        } else {
            break;
        }
    }
    if (cont >= 4) {
        return true;
    }

    // Check orizzontale
    cont = 1;
    let stopSx = false, stopDx = false;
    let i = 1;

    do {
        const r = parseInt(pedinaC.id.split("-")[1]);

        // Verso sinistra
        if (!stopSx) {
            const csX = parseInt(pedinaC.id.split("-")[2]) - i;
            if (csX >= 0) {
                const cellaSx = document.getElementById(`div-${r}-${csX}`);
                if (cellaSx && cellaSx.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopSx = true;
                }
            } else {
                stopSx = true;
            }
        }

        // Verso destra
        if (!stopDx) {
            const cdX = parseInt(pedinaC.id.split("-")[2]) + i;
            if (cdX < COLONNE) {
                const cellaDx = document.getElementById(`div-${r}-${cdX}`);
                if (cellaDx && cellaDx.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopDx = true;
                }
            } else {
                stopDx = true;
            }
        }

        i++;
    } while ((!stopSx || !stopDx) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    // Check diagonale (verso basso a destra e alto a sinistra)
    cont = 1;
    i = 1;
    let stopBD = false, stopAS = false;

    do {
        // Verso basso a destra
        if (!stopBD) {
            const rBD = parseInt(pedinaC.id.split("-")[1]) + i;
            const cBD = parseInt(pedinaC.id.split("-")[2]) + i;
            if (rBD < RIGHE && cBD < COLONNE) {
                const cellaBD = document.getElementById(`div-${rBD}-${cBD}`);
                if (cellaBD && cellaBD.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopBD = true;
                }
            } else {
                stopBD = true;
            }
        }

        // Verso alto a sinistra
        if (!stopAS) {
            const rAS = parseInt(pedinaC.id.split("-")[1]) - i;
            const cAS = parseInt(pedinaC.id.split("-")[2]) - i;
            if (rAS >= 0 && cAS >= 0) {
                const cellaAS = document.getElementById(`div-${rAS}-${cAS}`);
                if (cellaAS && cellaAS.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopAS = true;
                }
            } else {
                stopAS = true;
            }
        }

        i++;
    } while ((!stopBD || !stopAS) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    // Check diagonale (verso basso a sinistra e alto a destra)
    cont = 1;
    i = 1;
    let stopBS = false, stopAD = false;

    do {
        // Verso basso a sinistra
        if (!stopBS) {
            const rBS = parseInt(pedinaC.id.split("-")[1]) + i;
            const cBS = parseInt(pedinaC.id.split("-")[2]) - i;
            if (rBS < RIGHE && cBS >= 0) {
                const cellaBS = document.getElementById(`div-${rBS}-${cBS}`);
                if (cellaBS && cellaBS.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopBS = true;
                }
            } else {
                stopBS = true;
            }
        }

        // Verso alto a destra
        if (!stopAD) {
            const rAD = parseInt(pedinaC.id.split("-")[1]) - i;
            const cAD = parseInt(pedinaC.id.split("-")[2]) + i;
            if (rAD >= 0 && cAD < COLONNE) {
                const cellaAD = document.getElementById(`div-${rAD}-${cAD}`);
                if (cellaAD && cellaAD.style.backgroundColor == pedinaC.style.backgroundColor) {
                    cont++;
                } else {
                    stopAD = true;
                }
            } else {
                stopAD = true;
            }
        }

        i++;
    } while ((!stopBS || !stopAD) && cont < 4);

    if (cont >= 4) {
        return true;
    }

    return false;
}
function recuperaTurno() {
    const nextPlayer = document.getElementById("nextPlayer");
    if (nextPlayer.style.backgroundColor == GIALLO) {
        return "G";
    } else {
        return "R";
    }
}