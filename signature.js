window.onload = function () {
  
  var signatureClient = document.getElementById("divSignatureClient");
  var signatureTechnician = document.getElementById("divSignatureTechnician");

  function canvas_control(div) {
    //verificar questão da altura e largura na adaptação
    var largura = "500px";
    var altura = "300px";
    var desenhando = false;
    var quadro = div.querySelector("canvas");
    var limpar = div.querySelector("button");
    var ctx = quadro.getContext("2d");
    quadro.setAttribute("width", largura);
    quadro.setAttribute("height", altura);

    quadro.onmousedown = function (evt) {
      var coordenadas_quadro = posicao(quadro);
      ctx.moveTo(
        evt.clientX - coordenadas_quadro.x,
        evt.clientY - coordenadas_quadro.y
      );
      desenhando = true;
    };

    quadro.touchstart = function (evt) {
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
      }
    };

    limpar.onclick = function () {
      //#TODO fazer com que as medidas do canva sejam atribuidas no lugar do 500
      ctx.beginPath();
      ctx.clearRect(0, 0, 500, 500);
      quadro.dataset = {};
      console.log(quadro.dataset);
    };
  }

  canvas_control(signatureTechnician);
  canvas_control(signatureClient);
};

function posicao(obj) {
  // console.log(obj)
  var coordenadas = obj.getBoundingClientRect();
  var x = coordenadas.left;
  var y = coordenadas.top;
  var coo = {
    x: x,
    y: y,
  };
  return coo;
}
