document.getElementById("generatePdf").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Configuração das margens de 5px
  const margin = 5;
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Coordenadas iniciais
  let xPos = margin; // Posição inicial do eixo X
  let yPos = margin + 10; // Posição inicial do eixo Y

  // Função para adicionar texto ao PDF
  function addText(text, x, y) {
    doc.setFontSize(12);
    doc.text(text, x, y);
  }

  // Função para desenhar retângulo ao redor de um campo
  function drawRectangle(x, y, width, height) {
    doc.setDrawColor(0, 0, 0); // Cor da borda preta
    doc.rect(x, y, width, height); // Desenha o retângulo
  }

  // Função para adicionar um campo com texto e retângulo
  function addField(label, value, x, y, labelWidth = 50, valueWidth = 80) {
    addText(label + ":", x, y);
    drawRectangle(x, y, labelWidth, 8); // Retângulo do label
    addText(value, x + labelWidth + 5, y); // Texto do campo
    // drawRectangle(x + labelWidth + 50, y, valueWidth, 8); // Retângulo do valor
    return y + 10; // Retorna a nova posição Y após o campo
  }

  // Dados do formulário (para facilitar, pode-se coletar diretamente como antes)
  const formData = {
    tecnico: document.getElementById("technician").value,
    cliente: document.getElementById("client").value,
    numeroChamado: document.getElementById("serviceNum").value,
    email: document.getElementById("email").value,
    data: document.getElementById("date").value,
    codigo: document.getElementById("code").value,
    descricao: document.getElementById("description").value,
    motivo: document.getElementById("reason").value,
    departamento: document.getElementById("department").value,
    modelo: document.getElementById("model").value,
    etiqueta: document.getElementById("tag").value,
    paginasMono: document.getElementById("monoPages").value,
    paginasColoridas: document.getElementById("colorPages").value,
    totalPaginas: document.getElementById("totalPages").value,
    procedimento: document.getElementById("procedure").value,
    testesRealizados:
      document.querySelector("input[name='testsPerformed']:checked")?.value ||
      "Não informado",
    clienteAcompanhou:
      document.querySelector("input[name='clientAccompanied']:checked")
        ?.value || "Não informado",
    equipamentoApto:
      document.querySelector("input[name='equipmentReady']:checked")?.value ||
      "Não informado",
  };

  // Adicionando título
  addText("DADOS DO CHAMADO", xPos, yPos);
  yPos += 10;

  // Adicionando os campos
  yPos = addField("Número do Chamado", formData.numeroChamado, xPos, yPos);
  xPos+=75
  yPos -= 10;
  yPos = addField("E-mail", formData.email, xPos, yPos);
  xPos+=75
  yPos -= 10;
  yPos = addField("Data", formData.data, xPos, yPos);
  xPos-=150
  // Adiciona o resto dos dados
  for (const [key, value] of Object.entries(formData)) {
    if (key === 'numeroChamado' || key === 'email' || key === 'data') continue;
    yPos = addField(key, value, xPos, yPos);
  }

  // Captura as assinaturas
  const technicianSignature = document
    .getElementById("canvasTechnician")
    .toDataURL("image/png");
  const clientSignature = document
    .getElementById("canvasClient")
    .toDataURL("image/png");

  // Adiciona as assinaturas ao PDF
  yPos += 10;
  addText("Assinatura do Técnico:", xPos, yPos);
  doc.addImage(technicianSignature, "PNG", xPos, yPos + 5, 70, 35);

  // Linha preta abaixo da assinatura do técnico
  doc.setDrawColor(0, 0, 0);
  doc.line(xPos, yPos + 40, xPos + 70, yPos + 40);

  addText("Assinatura do Cliente:", pageWidth - 80, yPos);
  doc.addImage(clientSignature, "PNG", pageWidth - 80, yPos + 5, 70, 35);

  // Linha preta abaixo da assinatura do cliente
  doc.setDrawColor(0, 0, 0);
  doc.line(pageWidth - 80, yPos + 40, pageWidth - 10, yPos + 40);

  // Salva o arquivo PDF
  doc.save("chamado_tecnico.pdf");
});