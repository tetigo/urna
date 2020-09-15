
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('body div.d-1--right');
let numeros = document.querySelector('body div.d-1-3');

let etapaAtual = 0;
let numero = '';
let etapa = '';
let votobranco = false;
let votos = [];

function comecarEtapa() {
    etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votobranco = false;
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
    console.log('atualizando interface', numero);
    let candidato = etapa.candidatos.filter((item) => {
        return item.numero === numero;
    });
    console.log(candidato);
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>`;
        let fotosHtml = '';
        for (let x in candidato.fotos) {
            fotosHtml += `<div class="d-1--image">
            <img src="images/${candidato.fotos[x].url}" alt="">
            ${candidato.fotos[x].legenda}
        </div>`;
        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;

    }
}
function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}
function branco() {
    numero = '';
    votobranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    lateral.innerHTML = '';
    descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    let votoConfirmado = false;

    if(votobranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
        console.log('confirmando como Branco');
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
        console.log('confirmando como ', numero);
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
            console.log(votos);
            console.log('FIM!!!');
        }

    }
}

comecarEtapa();
