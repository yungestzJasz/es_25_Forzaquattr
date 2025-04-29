"use strict";

const RIGHE = 6;
const COLONNE = 7;
const GREY = "rgb(127, 127, 127)";
const YELLOW = "rgb(255, 255, 0)";
const RED = "rgb(255, 0, 0)";

let turnoRosso = true;
let griglia = Array.from({ length: RIGHE }, () => Array(COLONNE).fill(null));

window.onload = function () {
    creaTabella();
    aggiornaTurno();
};

function creaTabella() {
    let wrapper = document.getElementById("wrapper");
    wrapper.innerHTML = ""; // Pulisce la griglia prima di ricrearla

    for (let i = 0; i < RIGHE; i++) {
        for (let j = 0; j < COLONNE; j++) {
            let cella = document.createElement("div");
            cella.setAttribute("id", `cella${i}${j}`);
            cella.classList.add("pedina");
            cella.dataset.row = i;
            cella.dataset.col = j;
            cella.addEventListener("click", () => inserisciPedina(j));
            wrapper.appendChild(cella);
        }
    }
}

function inserisciPedina(colonna) {
    for (let i = RIGHE - 1; i >= 0; i--) {
        if (!griglia[i][colonna]) {
            griglia[i][colonna] = turnoRosso ? RED : YELLOW;
            let cella = document.getElementById(`cella${i}${colonna}`);
            cella.style.backgroundColor = turnoRosso ? RED : YELLOW;

            if (controlloVittoria(i, colonna)) {
                setTimeout(() => {
                    alert(`Giocatore ${turnoRosso ? "Rosso" : "Giallo"} ha vinto!`);
                    window.location.reload();
                }, 100);
                return;
            }

            turnoRosso = !turnoRosso;
            aggiornaTurno();
            return;
        }
    }
    alert("Colonna piena! Scegli un'altra colonna.");
}

function aggiornaTurno() {
    const nextPlayer = document.getElementById("nextPlayer");
    nextPlayer.textContent = turnoRosso ? "Rosso" : "Giallo";
    nextPlayer.style.color = turnoRosso ? RED : YELLOW;
}

function controlloVittoria(row, col) {
    let colore = griglia[row][col];
    if (!colore) return false;

    return (
        controllaDirezione(row, col, 1, 0) || // Controlla orizzontale
        controllaDirezione(row, col, 0, 1) || // Controlla verticale
        controllaDirezione(row, col, 1, 1) || // Controlla diagonale /
        controllaDirezione(row, col, 1, -1)   // Controlla diagonale \
    );
}

function controllaDirezione(row, col, dRow, dCol) {
    let colore = griglia[row][col];
    let conteggio = 1;

    for (let dir = -1; dir <= 1; dir += 2) {
        let r = row + dRow * dir;
        let c = col + dCol * dir;

        while (r >= 0 && r < RIGHE && c >= 0 && c < COLONNE && griglia[r][c] === colore) {
            conteggio++;
            r += dRow * dir;
            c += dCol * dir;
        }
    }

    return conteggio >= 4;
}