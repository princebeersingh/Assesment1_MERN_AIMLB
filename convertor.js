const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
async function fetchCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
      //   console.log(data);
        const currencies = Object.keys(data.rates);
      //   console.log(currencies);

        const fromCurrencySelect = document.getElementById('fromCurrency');
        const toCurrencySelect = document.getElementById('toCurrency');

        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencySelect.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencySelect.appendChild(optionTo);
        });
    } catch (error) {
        console.error('Error fetching currencies:', error);
        alert('Failed to fetch currency data.');
    }
}
async function convertCurrency(event) {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (fromCurrency === toCurrency) {
        alert("The source and target currencies are the same.");
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const exchangeRateFrom = data.rates[fromCurrency];
        const exchangeRateTo = data.rates[toCurrency];

        const convertedAmount = (amount * exchangeRateTo) / exchangeRateFrom;

        const resultText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        document.getElementById('result').innerText = resultText;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Error fetching exchange rate data.');
    }
}

document.getElementById('converterForm').addEventListener('submit', convertCurrency);
fetchCurrencies();