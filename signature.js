async function canvas_control(div) {
  var largura = 500;
  var altura = 300;
  var desenhando = false;
  console.log(div);
  quadro = div.querySelector("canvas");
  console.log(quadro);
  quadro.setAttribute("width", largura);
  quadro.setAttribute("height", altura);
  var limpar = div.querySelector("button");
  console.log(limpar);

  var ctx = quadro.getContext("2d");

  quadro.onmousedown = function (evt) {
    var coordenadas_quadro = posicao(quadro);
    ctx.moveTo(
      evt.clientX - coordenadas_quadro.x,
      evt.clientY - coordenadas_quadro.y
    );
    desenhando = true;
  };

  quadro.touchstart = function (evt) {
    console.log("tocou");
    var coordenadas_quadro = posicao(quadro);
    ctx.moveTo(
      evt.clientX - coordenadas_quadro.x,
      evt.clientY - coordenadas_quadro.y
    );
    desenhando = true;
  };

  quadro.onmouseup = function () {
    desenhando = false;
  };
  quadro.touchend = function () {
    desenhando = false;
  };

  quadro.onmousemove = function (evt) {
    if (desenhando) {
      // ctx.lineTo(evt.clientX, evt.clientY-175);
      var coordenadas_quadro = posicao(quadro);

      ctx.lineTo(
        evt.clientX - coordenadas_quadro.x,
        evt.clientY - coordenadas_quadro.y
      );
      ctx.stroke();
      console.log(quadro.dataset);
    }
  };

  limpar.onclick = function () {
    ctx.beginPath();
    ctx.clearRect(0, 0, largura, altura);
    quadro.dataset = {};
    console.log(quadro.dataset);
  };

  function posicao(obj) {
    var coordenadas = obj.getBoundingClientRect();
    var x = coordenadas.left;
    var y = coordenadas.top;
    console.log("posição x", x, "posição y", y);
    return {
      x: x,
      y: y,
    };
  }
}

//consertar paralelismo
window.onload = function () {
  var signatureClient = document.getElementById("divSignatureClient");
  var signatureTechnician = document.getElementById("divSignatureTechnician");
  if(signatureClient.mousedown()){
    canvas_control(signatureClient);
  }
  else{canvas_control(signatureTechnician);}
  
};
