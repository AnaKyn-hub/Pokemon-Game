var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 492;
canvas.height = 360;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
    bgReady = true;
}
bgImage.src = "image/bg.png";

var pokemonReady = false;
var pokemonImage = new Image();
pokemonImage.onload = function(){
    pokemonReady = true;
}
pokemonImage.src = "image/pokemon.png"

var jogadorReady = false;
var jogadorImage = new Image();
jogadorImage.onload = function(){
    jogadorReady = true;
}
jogadorImage.src = "image/ball.png";

var jogador = {
    speed: 250
};

var pokemon = {};

var pokemonCapturado = 0;

var keysDown = {};

addEventListener("keydown", function(e){keysDown[e.keyCode] = true;}, false);

addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
}, false);

var reset = function(){
    jogador.x = canvas.width / 2;
    jogador.y = canvas.height / 2;
    pokemon.x = 30 + (Math.random() * (canvas.width - 128));
    pokemon.y = 30 + (Math.random() * (canvas.height - 128));
};

var update = function(modifier){
    if(38 in keysDown){
        //para cima
        jogador.y -= jogador.speed * modifier;
    }
    if(40 in keysDown){
        //para baixo
        jogador.y += jogador.speed * modifier;
    }
    if(37 in keysDown){
        //esquerda
        jogador.x -= jogador.speed * modifier;
    }
    if(39 in keysDown){
        //direita
        jogador.x += jogador.speed * modifier;
    }
    //colisão
    if(jogador.x <= (pokemon.x + 32) && pokemon.x <= (jogador.x + 32) && jogador.y <= (pokemon.y + 32) && pokemon.y <= (jogador.y + 32)){
        ++pokemonCapturado;
        reset();
    }
    //Colisão do cenário
    if(jogador.x >= 430){
        jogador.x = 430;
    }
    if(jogador.x <= -2){
        jogador.x = -2;
    }
    if(jogador.y <= -2){
        jogador.y = -2;
    }
    if(jogador.y >= 298){
        jogador.y = 298;
    }
};

var render = function(){
    if(bgReady){
        ctx.drawImage(bgImage,0,0);
    }
    if(jogadorReady){
        ctx.drawImage(jogadorImage, jogador.x, jogador.y);
    }
    if(pokemonReady){
        ctx.drawImage(pokemonImage, pokemon.x, pokemon.y);
    }
    //Placar
    ctx.fillStyle = "rgb(255,222,173)";
    ctx.font = "22px Verdana";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Pokemon capturados: " + pokemonCapturado, 30, 30);
};

var gameLoop = function(){
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
}

//Inicia o jogo
reset();
var then = Date.now();
setInterval(gameLoop, 1);

