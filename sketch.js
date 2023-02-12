//desenho da bolinha
let eixoX = 300;
let eixoY = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeEixoX = 8;
let velocidadeEixoY = 8;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

// variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velociddadeYOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

let colidiu = false;

//sons do jogo
let trilha;
let ponto;
let raquetada;

function preload(){
  trilha = loadSound("trilha.ogg");
  ponto = loadSound("ponto.ogg");
  raquetada = loadSound("raquetada.ogg");

}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  desenhaBolinha();
  movimentaBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoComRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  mostraPlacar();
  marcaPonto();

}

function desenhaBolinha() {
  circle(eixoX, eixoY, diametro);

}

function movimentaBolinha() {
  eixoX += velocidadeEixoX;
  eixoY += velocidadeEixoY;
}

function colisaoBolinha() {
  if (eixoX + raio > width || eixoX < 0) {
    velocidadeEixoX *= -1;

  }
  if (eixoY + raio > height || eixoY - raio < 0) {
    velocidadeEixoY *= -1;

  }

}

function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);

}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente = ((eixoY - 8) - yRaqueteOponente - 82) / 2;
  yRaqueteOponente += velocidadeYOponente;

}

function verificaColisaoComRaquete() {
  if (eixoX - raio < xRaquete + comprimentoRaquete &&
    eixoY - raio < yRaquete + alturaRaquete &&
    eixoY + raio > yRaquete) {
    velocidadeEixoX *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu =
    collideRectCircle(x, y, comprimentoRaquete,
      alturaRaquete, eixoX, eixoY, raio);
  if (colidiu) {
    velocidadeEixoX *= -1;
    raquetada.play();
  }

}

function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0)); 
  rect(450, 10, 40, 20); 
  fill(255);
  text(pontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (eixoX > 592) {
    meusPontos += 1;
    ponto.play();

  }
  if (eixoX < -1) {
    pontosDoOponente += 1;
    ponto.play();

  }
}