
function formataRealBRL(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

async function getDollarValue() {
  try {
    const response = await fetch("https://api.exchangeratesapi.io/latest?base=USD");
    const data = await response.json();
    return data.rates.BRL;
  } catch (error) {
    console.error(error);
  }
}   

async function getAllTimeMaxValue(cryptoName) {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`);
  const data = await response.json();
  return data.market_data.ath;
}
function converteDolarReal(valorEmDolar) {
    return formataRealBRL(valorEmDolar * taxaCambio);
  }

async function consultaPreco(criptomoeda) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${criptomoeda}`);
        const data = await response.json();
        const preco = data.market_data.current_price.usd.toString();
        const suply = data.market_data.total_supply;
        criarLinha(criptomoeda, (preco), (suply/1000000000))
    } catch (error) {
        console.log(error);
    }
  }
  
  const criarLinha = (criptomoeda, preco, maximo) => {
    const newRow = document.createElement('tr')
   
    newRow.innerHTML = `
    <td>${criptomoeda.toUpperCase()}</td>
    <td>${converteDolarReal(preco)}</td>       
    <td>${maximo.toFixed(2)} bi</td>       
    `
    document.querySelector('#tabela>tbody').appendChild(newRow)
}

const principaisCriptomoedas = [
    "bitcoin",
    "cardano",
    "ethereum",
    "solana",
    "litecoin",
    "ripple",
    "binancecoin",
    "tether",
    "meld",
    "polkadot",
    "singularitynet",
    "chainlink"
  ];

  function getUserId() {
    var userId = localStorage.getItem("userId");
    if (!userId) {
        userId = Date.now() + Math.random().toString(36).substring(2);
        localStorage.setItem("userId", userId);
    }
    return userId;
}

async function getDollarExchangeRate() {
  try {
      // Faz a chamada à API
      const response = await fetch("https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='11-20-2020'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao");
      // Transforma o resultado em JSON
      const data = await response.json();
      // Acessa o objeto "value" e pega a primeira cotação
      const exchangeRate = data.value[0];
      // seta a cotação de compra (para compra de dólares)
      taxaCambio = exchangeRate.cotacaoCompra;
  } catch (error) {
      // Trata o erro caso ocorra algum problema com a chamada à API
      console.error(error);
  }
}

getDollarExchangeRate().then(valor => {
  principaisCriptomoedas.forEach(async (criptomoeda) => {
    (await consultaPreco(criptomoeda));
  });
});
