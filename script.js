const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const resultDisplay = document.getElementById("result");

// Populate currency dropdowns
async function loadCurrencies() {
  try {
    const res = await fetch("https://api.exchangerate.host/symbols");
    const data = await res.json();
    const symbols = data.symbols;

    for (let code in symbols) {
      let option1 = document.createElement("option");
      let option2 = document.createElement("option");

      option1.value = option2.value = code;
      option1.textContent = `${code} - ${symbols[code].description}`;
      option2.textContent = `${code} - ${symbols[code].description}`;

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    // Default selections
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    resultDisplay.textContent = "Failed to load currencies.";
    console.error("Error loading currency symbols:", error);
  }
}

// Convert currency
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount) || amount <= 0) {
    resultDisplay.textContent = "Please enter a valid amount.";
    return;
  }

  try {
    const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`;
    const res = await fetch(url);
    const data = await res.json();

    resultDisplay.textContent = `Converted Amount: ${data.result.toFixed(2)} ${to}`;
  } catch (error) {
    resultDisplay.textContent = "Error fetching conversion.";
    console.error("Conversion error:", error);
  }
}

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  loadCurrencies();
});
