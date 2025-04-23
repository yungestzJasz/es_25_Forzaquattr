"use strict";

const RIGHE=6;
const COLONNE=7;

const GREY = "rgb(127, 127, 127)";
const YELLOW = "rgb(255, 255, 0)";
const RED = "rgb(255, 0, 0)";


window.onload=function(){
  creaTabella();
  turno();

}
function creaTabella(){
    let wrapper= document.getElementById("wrapper");
    for(let i=0;i<RIGHE;i++){
        let riga=document.createElement("div");
        for (let j = 0; j <COLONNE; j++)
        {
           let cella=document.createElement("div");
           cella.setAttribute("id",`cella${i}${j}`);
            cella.classList.add("pedina");
            wrapper.appendChild(cella);
        }        
    }
   
}
function turno(){
    let prossimoturnoTxt=document.getElementById("nextPlayer");
    
}