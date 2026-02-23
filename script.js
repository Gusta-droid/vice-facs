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
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970758936789052/1451770203104084089/image.png?ex=699dbc1d&is=699c6a9d&hm=cc8530645f4f7ab7fc146d9a382711c266bf000d865a49814174ec5ce82accf4&=&format=webp&quality=lossless&width=1207&height=960",
    cat: "ARMAS"
  },

  {
    id: "MAFIA",
    nome: "MAFIA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970606302134302/1451769711871131831/image.png?ex=699dbba7&is=699c6a27&hm=a8fcd6f703ead76404036678c3a94c80413630c122042e81d81b35b08a4ad7c8&=&format=webp&quality=lossless&width=550&height=309",
    cat: "ARMAS"
  },
   {
    id: "MANSÃO BRANCA",
    nome: "MANSÃO BRANCA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970631761301687/1451769784185126943/image.png?ex=699dbbb9&is=699c6a39&hm=2c27665960a1cc40fda3a68600fc0e35b29d476bca3e812c4d5411088cee8127&=&format=webp&quality=lossless&width=1542&height=856",
    cat: "ARMAS"
  },
  {
    id: "CASA CAMPO",
    nome: "CASA CAMPO",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970728767426702/1451770125094228109/image.png?ex=699dbc0a&is=699c6a8a&hm=edf206f4ad560ace31b85c7ee968056e96ea601b6501463f3fdd90945d64e6b0&=&format=webp&quality=lossless&width=1520&height=856",
    cat: "ARMAS"
  },
   {
    id: "VIDIGAL",
    nome: "VIDIGAL",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970781598875818/1451770283764748359/image.png?ex=699dbc30&is=699c6ab0&hm=0cedaf5493473f314c9e18451ef65a2cad4ac6e76d5c8f9e47ae8feba1953073&=&format=webp&quality=lossless&width=485&height=350",
    cat: "ARMAS"
  },
   {
    id: "CONTINENTAL",
    nome: "CONTINENTAL",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970860669767812/1451770340815671296/image.png?ex=699dbc3d&is=699c6abd&hm=896b8685bad0309b0b35535b6cfa676aecdabf74a9c86a138bceba7276ad0a50&=&format=webp&quality=lossless&width=1507&height=856",
    cat: "ARMAS"
  },
   {
    id: "GALAXY",
    nome: "GALAXY",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1458232693232898250/1458253029898719416/image.png?ex=699d96b7&is=699c4537&hm=64b28af918067546b162e25c0e81adce21114e662583ce702666c904106cf689&=&format=webp&quality=lossless&width=1872&height=617",
    cat: "ARMAS"
  },
   {
    id: "MANSÃO STARK",
    nome: "MANSÃO STARK",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1460383474484777122/1467553800062500884/image.png?ex=699dce7b&is=699c7cfb&hm=8723b79205caa01b7f59345cbdc36c5ff2fd61b90b1a0c3a79eb7955242e698d&=&format=webp&quality=lossless&width=550&height=292",
    cat: "ARMAS"
  },
   {
    id: "MANSÃO DA ILHA",
    nome: "MANSÃO DA ILHA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1460976194852749342/1461045288268464282/image.png?ex=699ddbf5&is=699c8a75&hm=54c340d8b0cc1ce8af4bed2aadf0b5033ca62dddd5d74159c1ea42023b36e3f9&=&format=webp&quality=lossless&width=550&height=276",
    cat: "ARMAS"
  },
   {
    id: "CASA PERDIDA",
    nome: "CASA PERDIDA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435003795200278689/1451769284069032077/image.png?ex=699dbb41&is=699c69c1&hm=96712076b17201f097bb8a21d86f4da232acf7fe65ad1b7713a4815c6c843ada&=&format=webp&quality=lossless&width=412&height=350",
    cat: "ARMAS"
  },
   {
    id: "FAVELA DO MORRO",
    nome: "FAVELA DO MORRO",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434969898756477104/1451767862900424736/image.png?ex=699db9ef&is=699c686f&hm=eb02268609298f43588e1cf4dda5d465d93eee740170fa32435fb36de195c7ae&=&format=webp&quality=lossless&width=550&height=321",
    cat: "ARMAS"
  },

   {
    id: "FAVELA DA PEDREIRA",
    nome: "FAVELA DA PEDREIRA",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434969542123196428/1451767748643389552/image.png?ex=699db9d3&is=699c6853&hm=63f924564381e3a9c7e47974cd943b89d5223172921b16c0765dc306a82d83bf&=&format=webp&quality=lossless&width=1641&height=856",
    cat: "ARMAS"
  },
   {
    id: "BUNKER",
    nome: "BUNKER",
    descCurta: "Contingente: 20",
    descricao: "20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1462655957992738911/1462671272197623871/image.png?ex=699dd786&is=699c8606&hm=e9812e28d9e05c64478801115ab59e836442d3c85ae41bcc43dc6eaf7e6a9faf&=&format=webp&quality=lossless",
    cat: "ARMAS"
  },
   {
    id: "CAMPINHO",
    nome: "CAMPINHO",
    descCurta: "Contingente: 10",
    descricao: " LEAN / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434969888266653808/1451767808659816520/image.png?ex=699db9e2&is=699c6862&hm=260be2effe0f55aab9ebf56a90cdecb21c75e9600c15c7dbc02672f72ad75333&=&format=webp&quality=lossless",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA DESCIDA",
    nome: "FAVELA DA DESCIDA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434969944906404051/1451767963777503232/image.png?ex=699dba07&is=699c6887&hm=6063c6359df0be93b7cbfb36218556dadfcb1d7b5dd449c24acfbb75dd47db03&=&format=webp&quality=lossless&width=550&height=291",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DO TREM",
    nome: "FAVELA DO TREM",
    descCurta: "Contingente: 10",
    descricao: "METANFETAMINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434969976682450955/1451768055838543943/image.png?ex=699dba1d&is=699c689d&hm=9b8528cdabc1538c3fba98127b089641143fe8374c2bb470334ea5b054c5d472&=&format=webp&quality=lossless&width=1522&height=856",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DOS ARTISTAS",
    nome: "FAVELA DOS ARTISTAS",
    descCurta: "Contingente: 10",
    descricao: "METANFETAMINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434969996232097913/1451768163862581430/image.png?ex=699dba36&is=699c68b6&hm=5dcd67094bdf5f4752ed016552576bf892d2138b54dbc00495851dfe18587524&=&format=webp&quality=lossless&width=1699&height=856",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA PISTA",
    nome: "FAVELA DA PISTA",
    descCurta: "Contingente: 10",
    descricao: "LEAN / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970047192891412/1451768238030458962/image.png?ex=699dba48&is=699c68c8&hm=9338053df712a4d48fb34b35c643dd7be040634cca8fbe62cc60ad07aa79372f&=&format=webp&quality=lossless&width=1513&height=856",
    cat: "DROGAS"
  },
   {
    id: "COMPLEXO DO SOL",
    nome: "COMPLEXO DO SOL",
    descCurta: "Contingente: 10",
    descricao: "LEAN / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970067350851664/1451768320268304504/image.png?ex=699dba5c&is=699c68dc&hm=bca52e82b373d8a941a301d64f8e863b8d2c7fc5b85ecc4ddd7e9bfb972e9788&=&format=webp&quality=lossless&width=550&height=306",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DO LIXÃO",
    nome: "FAVELA DO LIXÃO",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970186036805652/1451768397514936443/image.png?ex=699dba6e&is=699c68ee&hm=087aca2b46054c7f6174ae6a7c68e6bd9d0ba70f8c6f01ca57ecb0de6d50451e&=&format=webp&quality=lossless&width=1376&height=959",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DE VINEWOOD",
    nome: "FAVELA DE VINEWOOD",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970279120998621/1451768483779186780/image.png?ex=699dba83&is=699c6903&hm=1931c2c18d36a2c0a96052fa1df01352055573b3327cdbb7f1d471add3045784&=&format=webp&quality=lossless&width=1522&height=856",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA PONTE",
    nome: "FAVELA DA PONTE",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970299576746054/1451768573847666821/image.png?ex=699dba98&is=699c6918&hm=230b7be4dace6f5c88b1e73294f7987c8765f16abf2f09e304b47c0f4c26c2a9&=&format=webp&quality=lossless&width=1106&height=960",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DO ESGOTO",
    nome: "FAVELA DO ESGOTO",
    descCurta: "Contingente: 10",
    descricao: "HEROINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970318245728296/1451769052312764511/image.png?ex=699dbb0a&is=699c698a&hm=3f256cb10cd0a4e940098bd6a6db3055cc3e0fadcc487ae68f01070deea36c1b&=&format=webp&quality=lossless",
    cat: "DROGAS"
  },
   {
    id: "FAVELA DA BRISA",
    nome: "FAVELA DA BRISA",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970340273950874/1451769112140316794/image.png?ex=699dbb18&is=699c6998&hm=918b5dcd84d3cef1606500e5a970540c2082bf3afc74caedf5f3b6ac4ec9fb24&=&format=webp&quality=lossless&width=550&height=267",
    cat: "DROGAS"
  },
   {
    id: "FERRO VELHO",
    nome: "FERRO VELHO",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434970385253793883/1451769174496907354/image.png?ex=699dbb27&is=699c69a7&hm=da9dd5a799d8fca875a5c369b752d7b6a02204d555a60176351080ace5dbdf30&=&format=webp&quality=lossless&width=1703&height=856",
    cat: "DROGAS"
  },
   {
    id: "CASA DA PRAIA",
    nome: "CASA DA PRAIA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435003779077378198/1451769212769931354/image.png?ex=699dbb30&is=699c69b0&hm=ee08693cee334d664e1516cb054093987f1cb44b787d2d0d780cd6a2a8dd327d&=&format=webp&quality=lossless",
    cat: "DROGAS"
  },
   {
    id: "CASA CINZA",
    nome: "CASA CINZA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435003808580112394/1451769330827001997/image.png?ex=699dbb4d&is=699c69cd&hm=e744b3f21757289d20fbf75693189e8a6f1d7b47209235cc30751a39206cd72d&=&format=webp&quality=lossless&width=1208&height=960",
    cat: "DROGAS"
  },
   {
    id: "BLOODS",
    nome: "BLOODS",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435004879121940530/1451769400880271390/image.png?ex=699dbb5d&is=699c69dd&hm=a555430d60459723e1c026d730d99b24c7b8da91171c584c110fcc0cb2179ee3&=&format=webp&quality=lossless&width=1360&height=960",
    cat: "DROGAS"
  },
   {
    id: "BALLAS",
    nome: "BALLAS",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435034924976443534/1451769468685652191/image.png?ex=699dbb6d&is=699c69ed&hm=f35d57c90cd80fc1218a9656f710adf67749ec40f6c14061868a74ac2cb3e744&=&format=webp&quality=lossless&width=535&height=350",
    cat: "DROGAS"
  },
   {
    id: "GROOVE",
    nome: "GROOVE",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435035637513195661/1451769526483157083/image.png?ex=699dbb7b&is=699c69fb&hm=a967f04473e4a629064f9f1c886e84969cc9e87c2ac824a8ca3dc08bd3faeb65&=&format=webp&quality=lossless&width=1376&height=902",
    cat: "DROGAS"
  },
   {
    id: "CONTAINER",
    nome: "CONTAINER",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435037606021828753/1451769577758396497/image.png?ex=699dbb87&is=699c6a07&hm=c44c35d297cd6bfca72c8b1151ca297fe47f738e111a421b548beaab96a4d569&=&format=webp&quality=lossless&width=378&height=350",
    cat: "DROGAS"
  },
   {
    id: "MANSÃO HORIZONTE",
    nome: "MANSÃO HORIZONTE",
    descCurta: "Contingente: 10",
    descricao: "MACONHA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1434971260466499604/1451769619227476020/image.png?ex=699dbb91&is=699c6a11&hm=77a273222f04498e1d5ae3638de183c128c72ed77ab7ef402efccdd3255ba230&=&format=webp&quality=lossless&width=1376&height=906",
    cat: "DROGAS"
  },
   {
    id: "AUSTRALIA",
    nome: "AUSTRALIA",
    descCurta: "Contingente: 10",
    descricao: "COCAINA / 20 pessoas = kit fac / 35 pessoas = uniforme para a fac / 45 pessoas = blindado pro 00",
    img: "https://media.discordapp.net/attachments/1435003091027099818/1451769687649288263/image.png?ex=699dbba2&is=699c6a22&hm=6a76c39854c8125b1a0e8e3a0480ff564096d8f1920453a3f4dafd29ffcaf573&=&format=webp&quality=lossless&width=1522&height=856",
    cat: "DROGAS"
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