
// Função para capturar os dados do formulário e gerar o PDF
document.getElementById("generatePdf").addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  console.log("pdf")

  // Coleta os dados do formulário
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
    testesRealizados: document.querySelector(
      "input[name='testsPerformed']:checked"
    )?.value || "Não informado",
    clienteAcompanhou: document.querySelector(
      "input[name='clientAccompanied']:checked"
    )?.value || "Não informado",
    equipamentoApto: document.querySelector(
      "input[name='equipmentReady']:checked"
    )?.value || "Não informado",
  };

  // Adiciona os dados ao PDF
  let y = 10;
  doc.setFontSize(12);
  doc.text("DADOS DO CHAMADO", 10, y);
  y += 10;

  for (const [key, value] of Object.entries(formData)) {
    doc.text(`${key}: ${value}`, 10, y);
    y += 8;
  }


 // Capturar assinaturas
 const technicianSignature = document
 .getElementById("canvasTechnician")
 .toDataURL("image/png");
const clientSignature = document
 .getElementById("canvasClient")
 .toDataURL("image/png");

// Adicionar as assinaturas ao PDF
y += 10;
doc.text("Assinatura do Técnico:", 10, y);
doc.addImage(technicianSignature, "PNG", 10, y + 5, 70, 35);

y += 45;
doc.text("Assinatura do Cliente:", 10, y);
doc.addImage(clientSignature, "PNG", 10, y + 5, 70, 35);

  // Salva o arquivo PDF
  doc.save("chamado_tecnico.pdf");
});