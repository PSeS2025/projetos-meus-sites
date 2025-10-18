console.log("Site da ONG carregado com sucesso!");
// Mensagem no console para indicar que o JS foi carregado corretamente

// js/main.js
document.addEventListener("DOMContentLoaded", () => {
  // Espera o carregamento completo do DOM antes de executar o código

  // -------------------------------
  // Máscaras simples para campos de telefone
  const telInputs = document.querySelectorAll('[data-mask="tel"]');
  telInputs.forEach(input => {
    input.addEventListener("input", () => {
      // Remove qualquer caractere que não seja número
      let v = input.value.replace(/\D/g, "");
      
      // Aplica a máscara de telefone conforme o tamanho do número
      if (v.length > 10) {
        // Telefone com 11 dígitos (ex.: celular) -> (XX) XXXXX-XXXX
        v = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (v.length > 5) {
        // Telefone com 10 dígitos (ex.: fixo) -> (XX) XXXX-XXXX
        v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (v.length > 2) {
        // Começo do telefone -> (XX) XXXX...
        v = v.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else {
        // Apenas código de área parcial -> (XX
        v = v.replace(/^(\d*)/, "($1");
      }

      input.value = v; // Atualiza o valor do input com a máscara
    });
  });

  // -------------------------------
  // Validação simples para todos os formulários da página
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      // Se o formulário não estiver válido, impede envio
      if (!form.checkValidity()) {
        e.preventDefault();
        alert("Por favor, preencha todos os campos obrigatórios corretamente.");
      }
    });
  });

  // -------------------------------
  // Gráfico 1 - Pizza (Recursos por projeto)
  const ctxRecursos = document.getElementById("grafico-recursos");
  if (ctxRecursos) {
    new Chart(ctxRecursos, {
      type: "pie", // Tipo de gráfico: pizza
      data: {
        labels: ["Educação", "Saúde", "Alimentação", "Infraestrutura"],
        datasets: [{
          label: "Recursos",
          data: [40, 25, 20, 15], // Valores para cada setor
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, // Gráfico se adapta ao tamanho da tela
        plugins: {
          legend: { position: "bottom" }, // Legenda na parte inferior
          title: { display: true, text: "Distribuição de Recursos por Projeto" } // Título do gráfico
        }
      }
    });
  }

  // -------------------------------
  // Gráfico 2 - Linha (Evolução de voluntários)
  const ctxVoluntarios = document.getElementById("grafico-voluntarios");
  if (ctxVoluntarios) {
    new Chart(ctxVoluntarios, {
      type: "line", // Gráfico de linha
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023", "2024"], // Eixo X
        datasets: [{
          label: "Número de Voluntários",
          data: [50, 80, 120, 160, 200, 250], // Eixo Y
          fill: false, // Sem preenchimento abaixo da linha
          borderColor: "rgba(75, 192, 192, 1)", // Cor da linha
          tension: 0.2 // Curvatura da linha
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Crescimento de Voluntários" }
        },
        scales: {
          y: { beginAtZero: true } // Eixo Y inicia em zero
        }
      }
    });
  }

  // -------------------------------
  // Gráfico 3 - Barras (Impacto social por região)
  const ctxImpacto = document.getElementById("impacto-social");
  if (ctxImpacto) {
    new Chart(ctxImpacto, {
      type: "bar", // Gráfico de barras
      data: {
        labels: ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"], // Eixo X
        datasets: [{
          label: "Impacto Social",
          data: [120, 150, 80, 200, 90], // Eixo Y
          backgroundColor: "rgba(54, 162, 235, 0.7)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: "Impacto Social por Região" },
          legend: { display: false } // Esconde legenda
        },
        scales: {
          y: { beginAtZero: true } // Eixo Y inicia em zero
        }
      }
    });
  }
});


