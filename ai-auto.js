const API_KEY = "300843a9bfecf9babf1af862ec5626b2"

async function buscarJogosHoje() {
  const hoje = new Date().toISOString().split("T")[0];

  const resposta = await fetch(
    `https://api-football-v1.p.rapidapi.com/v3/fixtures?date=${hoje}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
      }
    }
  );

  const dados = await resposta.json();
  return dados.response.slice(0, 10);
}

function gerarAnalise(jogo) {
  const casa = jogo.teams.home.name;
  const fora = jogo.teams.away.name;

  const probCasa = Math.floor(Math.random() * 40) + 40;
  const probFora = 100 - probCasa;

  return `
Probabilidade:
${casa}: ${probCasa}%
${fora}: ${probFora}%

Sugestão: Mais de 1.5 gols
Risco: Médio
`;
}

async function gerarAnalises() {
  const container = document.getElementById("analises");
  container.innerHTML = "Carregando jogos de hoje...";

  const jogos = await buscarJogosHoje();

  let html = "";

  jogos.forEach(jogo => {
    html += `
      <div class="card">
        <h3>${jogo.teams.home.name} vs ${jogo.teams.away.name}</h3>
        <pre>${gerarAnalise(jogo)}</pre>
      </div>
    `;
  });

  container.innerHTML = html;
}

window.onload = gerarAnalises;
