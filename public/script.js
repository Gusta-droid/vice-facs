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

const SENHA_ADMIN = "gustarlq";
let isAdmin = sessionStorage.getItem("isAdmin") === "true";

const categorias = ["DISPONÍVEIS","ARMAS","MUNIÇÃO","DROGAS","DESMANCHE","LAVAGEM"];

const itens = [

  {
    id: "BARRAGEM",
    nome: "BARRAGEM",
    descCurta: "Contingente: 30",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/barragem.png",
    cat: "ARMAS"
  },

  {
    id: "MAFIA",
    nome: "MAFIA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mafia.png",
    cat: "ARMAS"
  },
   {
    id: "MANSÃO BRANCA",
    nome: "MANSÃO BRANCA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaobranca.png",
    cat: "ARMAS"
  },
  {
    id: "CASA CAMPO",
    nome: "CASA CAMPO",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/casacampo.png",
    cat: "ARMAS"
  },
   {
    id: "VIDIGAL",
    nome: "VIDIGAL",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/vidigal.png",
    cat: "ARMAS"
  },
   {
    id: "CONTINENTAL",
    nome: "CONTINENTAL",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/continental.png",
    cat: "ARMAS"
  },
   {
    id: "GALAXY",
    nome: "GALAXY",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/galaxy.png",
    cat: "ARMAS"
  },
   {
    id: "MANSÃO STARK",
    nome: "MANSÃO STARK",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaostark.png",
    cat: "ARMAS"
  },
   {
    id: "MANSÃO DA ILHA",
    nome: "MANSÃO DA ILHA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaodailha.png",
    cat: "ARMAS"
  },
   {
    id: "CASA PERDIDA",
    nome: "CASA PERDIDA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/casaperdida.png",
    cat: "ARMAS"
  },
   {
    id: "FAVELA DO MORRO",
    nome: "FAVELA DO MORRO",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladomorro.png",
    cat: "ARMAS"
  },

   {
    id: "FAVELA DA PEDREIRA",
    nome: "FAVELA DA PEDREIRA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladapedreira.png",
    cat: "ARMAS"
  },
   {
    id: "BUNKER",
    nome: "BUNKER",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/bunker.png",
    cat: "ARMAS"
  },
   {
    id: "CAMPINHO",
    nome: "CAMPINHO",
    descCurta: "Contingente: 10",
    descricao: " LEAN / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/campinho.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA DESCIDA",
    nome: "FAVELA DA DESCIDA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladadescida.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DO TREM",
    nome: "FAVELA DO TREM",
    descCurta: "Contingente: 10",
    descricao: "METANFETAMINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladotrem.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DOS ARTISTAS",
    nome: "FAVELA DOS ARTISTAS",
    descCurta: "Contingente: 10",
    descricao: "METANFETAMINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladosartistas.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA PISTA",
    nome: "FAVELA DA PISTA",
    descCurta: "Contingente: 10",
    descricao: "LEAN / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladapista.png",
    cat: "DROGAS"
  },
   {
    id: "COMPLEXO DO SOL",
    nome: "COMPLEXO DO SOL",
    descCurta: "Contingente: 10",
    descricao: "LEAN / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/complexodosol.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DO LIXÃO",
    nome: "FAVELA DO LIXÃO",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladolixao.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DE VINEWOOD",
    nome: "FAVELA DE VINEWOOD",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladevinewood.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA PONTE",
    nome: "FAVELA DA PONTE",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladaponte.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DO ESGOTO",
    nome: "FAVELA DO ESGOTO",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladoesgoto.png",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA BRISA",
    nome: "FAVELA DA BRISA",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladabrisa.png",
    cat: "DROGAS"
  },
   {
    id: "FERRO VELHO",
    nome: "FERRO VELHO",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/ferrovelho.png",
    cat: "DROGAS"
  },
   {
    id: "CASA DA PRAIA",
    nome: "CASA DA PRAIA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/casadapraia.png",
    cat: "DROGAS"
  },
   {
    id: "CASA CINZA",
    nome: "CASA CINZA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/casacinza.png",
    cat: "DROGAS"
  },
   {
    id: "BLOODS",
    nome: "BLOODS",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/bloods.png",
    cat: "DROGAS"
  },
   {
    id: "BALLAS",
    nome: "BALLAS",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/ballas.png",
    cat: "DROGAS"
  },
   {
    id: "GROOVE",
    nome: "GROOVE",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/groove.png",
    cat: "DROGAS"
  },
   {
    id: "CONTAINER",
    nome: "CONTAINER",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/container.png",
    cat: "DROGAS"
  },
   {
    id: "MANSÃO HORIZONTE",
    nome: "MANSÃO HORIZONTE",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaohorizonte.png",
    cat: "DROGAS"
  },
   {
    id: "AUSTRALIA",
    nome: "AUSTRALIA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/australia.png",
    cat: "DROGAS"
  },
  {
    id: "VINHEDO",
    nome: "VINHEDO",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/vinhedo.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "FAVELA DO PORTO",
    nome: "FAVELA DO PORTO",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladoporto.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "TROPICAL VILLA",
    nome: "TROPICAL VILLA",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/tropicalvilla.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "FAZENDA",
    nome: "FAZENDA",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/fazenda.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "FAVELA DO CATAVENTO",
    nome: "FAVELA DO CATAVENTO",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladocatavento.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "YAKUZA",
    nome: "YAKUZA",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/yakuza.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "HELIPA",
    nome: "HELIPA",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/helipa.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "TRIAD",
    nome: "TRIAD",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/triad.png",
    cat: "MUNIÇÃO"
  },
   {
    id: "MANSÃO MALIBU",
    nome: "MANSÃO MALIBU",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaomalibu.png",
    cat: "MUNIÇÃO"
  },
     {
    id: "MANSÃO FORTUNE",
    nome: "MANSÃO FORTUNE",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaofortune.png",
    cat: "MUNIÇÃO"
  },
     {
    id: "SCARFACE",
    nome: "SCARFACE",
    descCurta: "Contingente: 15",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/scarface.png",
    cat: "MUNIÇÃO"
  },
     {
    id: "PACIFIC",
    nome: "PACIFIC",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/pacific.png",
    cat: "DESMANCHE"
  },
    {
    id: "FAVELA DA PRAIA",
    nome: "FAVELA DA PRAIA",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladapraia.png",
    cat: "DESMANCHE"
  },
    {
    id: "FAVELA DA AGUA",
    nome: "FAVELA DA AGUA",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/faveladaagua.png",
    cat: "DESMANCHE"
  },
    {
    id: "LACOSTE",
    nome: "LACOSTE",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/lacoste.png",
    cat: "DESMANCHE"
  },
    {
    id: "HAYES AUTOS",
    nome: "HAYES AUTOS",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/heyesautos.png",
    cat: "DESMANCHE"
  },
    {
    id: "HELLS ANGELS",
    nome: "HELLS ANGELS",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/hellsangels.png",
    cat: "DESMANCHE"
  },
    {
    id: "MOTO CLUBE",
    nome: "MOTO CLUBE",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/motoclube.png",
    cat: "DESMANCHE"
  },
    {
    id: "LOST",
    nome: "LOST",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/lost.png",
    cat: "DESMANCHE"
  },
   {
    id: "CLUB77",
    nome: "CLUB77",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/club77.png",
    cat: "LAVAGEM"
  },
  {
    id: "WIWANG",
    nome: "WIWANG",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/wiwang.png",
    cat: "LAVAGEM"
  },
  {
    id: "MANSÃO PLAYBOY",
    nome: "MANSÃO PLAYBOY",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaoplayboy.png",
    cat: "LAVAGEM"
  },
  {
    id: "BAHAMAS",
    nome: "BAHAMAS",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/bahamas.png",
    cat: "LAVAGEM"
  },
  {
    id: "MANSÃO BOA VISTA",
    nome: "MANSÃO BOA VISTA",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/mansaoboavista.png",
    cat: "LAVAGEM"
  },
  {
    id: "CASSINO",
    nome: "CASSINO",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/cassino.png",
    cat: "LAVAGEM"
  },
  {
    id: "VANILLA",
    nome: "VANILLA",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/vanilla.png",
    cat: "LAVAGEM"
  },
  {
    id: "LUX",
    nome: "LUX",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/lux.png",
    cat: "LAVAGEM"
  },
  {
    id: "LS CLUB",
    nome: "LS CLUB",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/lsclub.png",
    cat: "LAVAGEM"
  },
   {
    id: "VANILLA PALETO",
    nome: "VANILLA PALETO",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/vanillapaleto.png",
    cat: "LAVAGEM"
  },
  {
    id: "VAGOS",
    nome: "VAGOS",
    descCurta: "Contingente: 10",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "img/vagos.png",
    cat: "LAVAGEM"
  },
  
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
  //  seção DISPONÍVEIS
    const secDisponiveis = document.createElement("section");
      secDisponiveis.id = "sec-DISPONÍVEIS";

    const tituloDisp = document.createElement("h2");
          tituloDisp.textContent = "DISPONÍVEIS";
      secDisponiveis.appendChild(tituloDisp);

    const gridDisp = document.createElement("div");
          gridDisp.classList.add("grid");
      secDisponiveis.appendChild(gridDisp);

conteudo.appendChild(secDisponiveis);

for(const cat of categorias){

    if(cat === "DISPONÍVEIS") continue;

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


            //  ATUALIZA EM TEMPO REAL
            onSnapshot(doc(db,"status",item.id),(docSnap)=>{

                if(docSnap.exists()){

                    const status = docSnap.data().status;

                    if(status === "disponivel"){
                      aplicarDisponivel(card,statusBtn);
                      adicionarNaDisponiveis(item);
                    }else{
                      aplicarIndisponivel(card,statusBtn);
                      removerDaDisponiveis(item.id);
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
// ===== ABA DISPONÍVEIS

function adicionarNaDisponiveis(item){

    const grid = document.querySelector("#sec-DISPONÍVEIS .grid");

    if(!grid) return;

    // evita duplicar
    if(document.getElementById("disp-"+item.id)) return;

    const clone = document.createElement("div");
    clone.classList.add("card");
    clone.id = "disp-"+item.id;

    clone.innerHTML = `
        <img src="${item.img}">
        <div class="info">
            <h3>${item.nome}</h3>
            <p>${item.descCurta}</p>
        </div>
    `;

    grid.appendChild(clone);
}

function removerDaDisponiveis(id){

    const card = document.getElementById("disp-"+id);
    if(card){
        card.remove();
    }
}