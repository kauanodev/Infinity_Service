window.onload = function () {
  const signatureClient = document.getElementById("divSignatureClient");
  const signatureTechnician = document.getElementById("divSignatureTechnician");

  function canvas_control(div) {
    const quadro = div.querySelector("canvas");
    const limpar = div.querySelector("button");
    const ctx = quadro.getContext("2d");
    let desenhando = false;

    // Função para ajustar a resolução interna ao tamanho CSS
    function resizeCanvas() {
      const rect = quadro.getBoundingClientRect(); // Tamanho do canvas no CSS
      quadro.width = rect.width;
      quadro.height = rect.height;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, quadro.width, quadro.height); // Limpa o canvas ao redimensionar
    }

    // Ajustar o canvas ao carregar e ao redimensionar a janela
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Função para obter coordenadas corretas no canvas
    function getCanvasCoordinates(evt) {
      const rect = quadro.getBoundingClientRect();
      const scaleX = quadro.width / rect.width; // Escala horizontal
      const scaleY = quadro.height / rect.height; // Escala vertical

      return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY,
      };
    }

    // Início do desenho
    quadro.onmousedown = function (evt) {
      const { x, y } = getCanvasCoordinates(evt);
      ctx.beginPath();
      ctx.moveTo(x, y);
      desenhando = true;
    };

    quadro.onmouseup = function () {
      desenhando = false;
    };

    quadro.onmousemove = function (evt) {
      if (desenhando) {
        const { x, y } = getCanvasCoordinates(evt);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    // Eventos de toque para dispositivos móveis
    quadro.addEventListener("touchstart", (evt) => {
   
      const { x, y } = getCanvasCoordinates(touch);
      ctx.beginPath();
      ctx.moveTo(x, y);
      desenhando = true;
      evt.preventDefault(); // Prevenir rolagem
    });

    quadro.addEventListener("touchmove", (evt) => {
      if (desenhando) {
        const touch = evt.touches[0];
        const { x, y } = getCanvasCoordinates(touch);
        ctx.lineTo(x, y);
        ctx.stroke();
        evt.preventDefault();
      }
    });

    quadro.addEventListener("touchend", () => {
      desenhando = false;
    });

    // Limpar o canvas
    limpar.onclick = function () {
      ctx.clearRect(0, 0, quadro.width, quadro.height);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, quadro.width, quadro.height); // Redesenha o fundo
    };
  }

  // Ativar controles para os dois canvases
  canvas_control(signatureTechnician);
  canvas_control(signatureClient);
};