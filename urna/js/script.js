/* Construa uma tela simulando uma urna eletrônica conforme exemplo abaixo utilizando  
Javascript (podendo usar framework ou Javascript puro) para realizar as validações.
A  urna deverá ser capaz de receber apenas dois números, ao digitar o número deverá  trazer a 
foto do candidato e o nome do candidato (45 – Pedrinho ou 22 – Zezinho). 
Ao  clicar no botão verde (Confirma) a tela irá apresentar uma mensagem que o voto foi  realizado com sucesso. 
Caso seja apertado o botão vermelho (Corrige) a urna deverá apagar os números que  foram digitados pelo usuário. 
Caso seja apertado o botão cinza (Votar em Branco) a urna deverá apresentar uma  mensagem que o voto foi computado
em branco.*/

const submit = document.querySelector("#submit");
const reset = document.querySelector("#reset");
const white = document.querySelector("#white");
const nameCandidate = document.querySelector("#nameCandidate");
const party = document.querySelector("#party");
const image = document.querySelector("#image");
const input = document.querySelectorAll("input");
const numbers = document.querySelectorAll("#numbers");
const finish = document.querySelector(".fim");
const usersDisplay = document.querySelector(".screen");
const fimMensagem = document.querySelector(".fimMensagem");
const confirmedSubmit = document.querySelector(".confirmedSubmit");

let isWhite = false;
let pessoa = [];
let numbersDisplay = "";

const candidatos = [
  {
    name: "Pedrinho",
    number: 45,
    party: "PSPO",
    image: "./img/candidato1.jpg",
  },
  {
    name: "Zezinho",
    number: 22,
    party: "PMDB",
    image: "./img/candidato2.jpg",
  },
  {
    name: "Candidato",
    number: null,
    party: "Partido",
    image: "./img/default.png",
  },
];
function buscarCandidato(filter) {
  pessoa = candidatos.filter((candidato) => candidato.number == filter);
  if (pessoa != "") {
    nameCandidate.innerHTML = pessoa[0].name;
    party.innerText = pessoa[0].party;
    image.src = pessoa[0].image;
  }
}

input.forEach((element, i) => {
  element.addEventListener("keyup", (event) => {
    let str = event.target.value;
    if (str.length > 1) {
      event.target.value = str.substring(0, str.length - 1);
    }
  });
  element.addEventListener("input", () => {
    numbersDisplay += element.value;
    if (numbersDisplay.length > 1) {
      buscarCandidato(numbersDisplay);
    }
  });
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    playedSongs("./songs/effect_number.mp3");
    if (input[0].value) {
      input[1].value = button.innerText;
      numbersDisplay += button.innerText;
    } else {
      input[0].value = button.innerText;
      numbersDisplay += button.innerText;
    }
    if (numbersDisplay.length > 1) {
      buscarCandidato(numbersDisplay);
    }
  });
});

function playedSongs(path) {
  let audio = new Audio(path);
  audio.volume = 0.5;
  audio.play();
}

function resetcandidato() {
  nameCandidate.innerText = candidatos[2].name;
  party.innerText = candidatos[2].party;
  image.src = candidatos[2].image;
  numbersDisplay = "";
  input.forEach((element) => {
    element.value = "";
  });
  finish.style.display = "none";
  usersDisplay.style.display = "block";
}

function clickWhite() {
  fimMensagem.innerText = "VOTO EM BRANCO";
  confirmedSubmit.innerText = "Confirmar: Para confirmar seu voto em branco";
  resetcandidato();
  finish.style.display = "flex";
  usersDisplay.style.display = "none";
}

resetcandidato();

submit.addEventListener("click", () => {
  playedSongs("./songs/effect_confirmar.mp3");
  if (pessoa != "" || isWhite) {
    fimMensagem.innerText = "FIM";
  } else if (numbersDisplay == "") {
    fimMensagem.innerText = "Insira um candidato";
  } else {
    fimMensagem.innerText = "VOTO NULO";
    resetcandidato();
  }
  finish.style.display = "flex";
  usersDisplay.style.display = "none";
  confirmedSubmit.textContent = "";
  isWhite = false;
  setTimeout(resetcandidato, 2000);
});

reset.addEventListener("click", () => {
  resetcandidato();
  playedSongs("./songs/effect_corrigir.mp3");
});

white.addEventListener("click", () => {
  isWhite = true;
  clickWhite();
});
