const jogosHoje = [
  { casa: "Flamengo", fora: "Palmeiras" },
  { casa: "Real Madrid", fora: "Barcelona" },
  { casa: "Manchester City", fora: "Liverpool" }
];

async function analisarJogo(timeA, timeB) {
  return `Probabilidade:
${timeA}: 48%
${timeB}: 52%

Placar provável: 1x2
Risco: Médio
Melhor aposta: Mais de 1.5 gols`;
}

async function gerarAnalises() {
  const container = document.getElementById("analises");
  let html = "";

  for (const jogo of jogosHoje) {
    const resultado = await analisarJogo(jogo.casa, jogo.fora);
    html += `
      <div class="card">
        <h3>${jogo.casa} vs ${jogo.fora}</h3>
        <pre>${resultado}</pre>
      </div>`;
  }

  container.innerHTML = html;
}

window.onload = gerarAnalises;
