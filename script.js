// fire base

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


//  config firebase
const firebaseConfig = {
  apiKey: "AIzaSyDdXm_SH0jn_9CL6GfAeDlZLZS0zmG-y94",
  authDomain: "facsvice.firebaseapp.com",
  projectId: "facsvice",
  storageBucket: "facsvice.firebasestorage.app",
  messagingSenderId: "374858768003",
  appId: "1:374858768003:web:25545bdbafa801309c45b6",
  measurementId: "G-CNJGHSV5GX"
};



// --- init

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// --- sistema

const SENHA_ADMIN = "facilegal";
let isAdmin = sessionStorage.getItem("isAdmin") === "true";

const categorias = ["ARMAS","MUNIÇÃO","DROGAS","DESMANCHE","LAVAGEM"];

const itens = [

  {
    id: "BARRAGEM",
    nome: "BARRAGEM",
    descCurta: "Contingente: 30",
    descricao: [
  "20 pessoas = kit fac",
  "35 pessoas = uniforme para a fac",
  "45 pessoas = blindado pro 00"
],
    img: "https://media.discordapp.net/attachments/1434970758936789052/1451770203104084089/image.png?ex=699dbc1d&is=699c6a9d&hm=cc8530645f4f7ab7fc146d9a382711c266bf000d865a49814174ec5ce82accf4&=&format=webp&quality=lossless&width=1207&height=960",
    cat: "ARMAS"
  },

  {
    id: "MAFIA",
    nome: "MAFIA",
    descCurta: "Contingente: 10",
     descricao: [
  "20 pessoas = kit fac",
  "35 pessoas = uniforme para a fac",
  "45 pessoas = blindado pro 00"
],
    img: "https://media.discordapp.net/attachments/1434970606302134302/1451769711871131831/image.png?ex=699dbba7&is=699c6a27&hm=a8fcd6f703ead76404036678c3a94c80413630c122042e81d81b35b08a4ad7c8&=&format=webp&quality=lossless&width=550&height=309",
    cat: "ARMAS"
  }

];


const menu = document.getElementById("menu");
const conteudo = document.getElementById("conteudo");


// ----- menu 

categorias.forEach(cat=>{
    const btn=document.createElement("button");
    btn.textContent=cat;
    btn.onclick=()=>mostrarCategoria(cat,btn);
    menu.appendChild(btn);
});


// ----- fire status
async function salvarStatus(id, status){
    await setDoc(doc(db,"status",id),{
        status: status
    });
}

async function carregarStatus(id){
    const snap = await getDoc(doc(db,"status",id));

    if(snap.exists()){
        return snap.data().status;
    }else{
        await salvarStatus(id,"indisponivel");
        return "indisponivel";
    }
}


//  -----carregar itens 

async function carregarSistema(){

for(const cat of categorias){

    const section=document.createElement("section");
    section.id="sec-"+cat;

    const titulo=document.createElement("h2");
    titulo.textContent=cat;
    section.appendChild(titulo);

    const grid=document.createElement("div");
    grid.classList.add("grid");

    for(const item of itens){

        if(item.cat===cat){

            const card=document.createElement("div");
            card.classList.add("card");

            card.innerHTML=`
                <img src="${item.img}">
                <div class="info">
                    <h3>${item.nome}</h3>
                    <p>${item.descCurta}</p>
                    <div class="actions">
                        <button class="details-btn">DETALHES</button>
                        <button class="status-btn"></button>
                    </div>
                </div>
            `;

            const statusBtn = card.querySelector(".status-btn");
            const detalhesBtn = card.querySelector(".details-btn");


            detalhesBtn.onclick = ()=>{
                abrirDetalhe(item);
            };


            // 🔄 ATUALIZA EM TEMPO REAL
            onSnapshot(doc(db,"status",item.id),(docSnap)=>{

                if(docSnap.exists()){

                    const status = docSnap.data().status;

                    if(status === "disponivel"){
                        aplicarDisponivel(card,statusBtn);
                    }else{
                        aplicarIndisponivel(card,statusBtn);
                    }

                }

            });


            atualizarPermissao(statusBtn);


            statusBtn.onclick = async ()=>{

                if(!isAdmin) return;

                if(card.classList.contains("disponivel")){
                    await salvarStatus(item.id,"indisponivel");
                }else{
                    await salvarStatus(item.id,"disponivel");
                }

            };


            grid.appendChild(card);
        }
    }

    section.appendChild(grid);
    conteudo.appendChild(section);
}

document.querySelector("nav button").click();

}

carregarSistema();


// ----- status

function aplicarDisponivel(card,btn){
    card.classList.add("disponivel");
    btn.classList.remove("status-indisponivel");
    btn.classList.add("status-disponivel");
    btn.innerText="DISPONÍVEL";
}

function aplicarIndisponivel(card,btn){
    card.classList.remove("disponivel");
    btn.classList.remove("status-disponivel");
    btn.classList.add("status-indisponivel");
    btn.innerText="INDISPONÍVEL";
}


// ----- permissao 

function atualizarPermissao(btn){

    btn.disabled = !isAdmin;

    document.querySelector(".login-btn").style.display = isAdmin ? "none" : "inline-block";
    document.querySelector(".logout-btn").style.display = isAdmin ? "inline-block" : "none";
}


// --- login

window.abrirLogin = function(){
    document.getElementById("loginModal").style.display="flex";
}

window.fecharLogin = function(){
    document.getElementById("loginModal").style.display="none";
}

window.verificarSenha = function(){

    const senha = document.getElementById("senhaInput").value;

    if(senha === SENHA_ADMIN){

        sessionStorage.setItem("isAdmin","true");
        location.reload();

    }else{
        alert("Senha incorreta!");
    }
}

window.logout = function(){

    sessionStorage.removeItem("isAdmin");
    location.reload();
}


// --- nav

function mostrarCategoria(cat,btn){

    document.querySelectorAll("nav button")
    .forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");

    document.querySelectorAll("section")
    .forEach(s=>s.classList.remove("active"));

    document.getElementById("sec-"+cat)
    .classList.add("active");
}


// ------ modal

function abrirDetalhe(item){

    document.getElementById("detalheTitulo").innerText = item.nome;
    document.getElementById("detalheDescricao").innerText = item.descricao;
    document.getElementById("detalheModal").style.display = "flex";
}

window.fecharDetalhe = function(){
    document.getElementById("detalheModal").style.display = "none";
}