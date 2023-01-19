function formataRealBRL(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }
function converteDolarReal(valorEmDolar) {
    // Taxa de câmbio atual (valor fictício)
    const taxaCambio = 5.7;
    return formataRealBRL(valorEmDolar * taxaCambio);
  }

async function consultaPreco(criptomoeda) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${criptomoeda}`);
        const data = await response.json();
        const preco = data.market_data.current_price.usd.toString();
        criarLinha(criptomoeda, converteDolarReal(preco))
    } catch (error) {
        console.log(error);
    }
  }
  
  const criarLinha = (criptomoeda, preco) => {
    const newRow = document.createElement('tr')
   
    newRow.innerHTML = `
    <td>${criptomoeda.toUpperCase()}</td>
    <td>${preco}</td>       
    `
    document.querySelector('#tabela>tbody').appendChild(newRow)
}
const principaisCriptomoedas = [
    "bitcoin",
    "cardano",
    "ethereum",
    "xrp",
    "solana",
    "litecoin",
    "ripple",
    "binancecoin",
    "tether",
    "litecoin",
    "polkadot",
    "chainlink"
  ];
  principaisCriptomoedas.forEach(async (criptomoeda) => {
    console.log(await consultaPreco(criptomoeda));
  });