const SENHA_ADMIN = "facilegal";
let isAdmin = localStorage.getItem("isAdmin") === "true";

const categorias = ["ARMAS","MUNIÇÃO","DROGAS","DESMANCHE","LAVAGEM"];

const itens = [
{
    id:"barragem",
    nome:"BARRAGEM",
    descCurta:"Contingente: 30",
    descricao:"Com 20 pessoas a fac ganha kit fac, com 35 pessoas ganha",
    img:"https://media.discordapp.net/attachments/1434970758936789052/1451770203104084089/image.png?ex=699c6a9d&is=699b191d&hm=699f3acc7726a5334520108c733d4786152b9d5f05e9227d109e86b83100a8a9&=&format=webp&quality=lossless&width=1207&height=960",
    cat:"ARMAS"
}];



const menu = document.getElementById("menu");
const conteudo = document.getElementById("conteudo");

categorias.forEach(cat=>{
    const btn=document.createElement("button");
    btn.textContent=cat;
    btn.onclick=()=>mostrarCategoria(cat,btn);
    menu.appendChild(btn);
});

categorias.forEach(cat=>{
    const section=document.createElement("section");
    section.id="sec-"+cat;

    const titulo=document.createElement("h2");
    titulo.textContent=cat;
    section.appendChild(titulo);

    const grid=document.createElement("div");
    grid.classList.add("grid");

    itens.forEach(item=>{
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

                detalhesBtn.addEventListener("click", ()=>{
                abrirDetalhe(item);
                });

            const statusSalvo = localStorage.getItem("status_"+item.id);

            if(statusSalvo === "disponivel"){
                aplicarDisponivel(card,statusBtn);
            }else{
                aplicarIndisponivel(card,statusBtn);
            }

            atualizarPermissao(statusBtn);

            statusBtn.addEventListener("click", ()=>{
                if(!isAdmin) return;

                if(card.classList.contains("disponivel")){
                    aplicarIndisponivel(card,statusBtn);
                    localStorage.setItem("status_"+item.id,"indisponivel");
                }else{
                    aplicarDisponivel(card,statusBtn);
                    localStorage.setItem("status_"+item.id,"disponivel");
                }
            });

            grid.appendChild(card);
        }
    });

    section.appendChild(grid);
    conteudo.appendChild(section);
});

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

function atualizarPermissao(btn){
    btn.disabled = !isAdmin;

    document.querySelector(".login-btn").style.display = isAdmin ? "none" : "inline-block";
    document.querySelector(".logout-btn").style.display = isAdmin ? "inline-block" : "none";
}

function abrirLogin(){
    document.getElementById("loginModal").style.display="flex";
}

function fecharLogin(){
    document.getElementById("loginModal").style.display="none";
}

function verificarSenha(){
    const senha = document.getElementById("senhaInput").value;

    if(senha === SENHA_ADMIN){
        localStorage.setItem("isAdmin","true");
        location.reload();
    }else{
        alert("Senha incorreta!");
    }
}

function logout(){
    localStorage.removeItem("isAdmin");
    location.reload();
}

function mostrarCategoria(cat,btn){
    document.querySelectorAll("nav button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
    document.getElementById("sec-"+cat).classList.add("active");
}

document.querySelector("nav button").click();

function abrirDetalhe(item){
    document.getElementById("detalheTitulo").innerText = item.nome;
    document.getElementById("detalheDescricao").innerText = item.descricao;
    document.getElementById("detalheModal").style.display = "flex";
}

function fecharDetalhe(){
    document.getElementById("detalheModal").style.display = "none";
}