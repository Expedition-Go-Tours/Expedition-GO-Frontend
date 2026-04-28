import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

// Currency conversion rates (relative to USD)
const exchangeRates = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  JPY: { symbol: "¥", rate: 149.50, name: "Japanese Yen" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australian Dollar" },
  CAD: { symbol: "C$", rate: 1.36, name: "Canadian Dollar" },
  CHF: { symbol: "CHF", rate: 0.88, name: "Swiss Franc" },
  CNY: { symbol: "¥", rate: 7.24, name: "Chinese Yuan" }
};

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const convertPrice = (priceInUSD) => {
    const numericPrice = typeof priceInUSD === 'string' 
      ? parseFloat(priceInUSD.replace(/[^0-9.]/g, ''))
      : priceInUSD;
    
    const rate = exchangeRates[currency].rate;
    const convertedPrice = numericPrice * rate;
    
    return {
      amount: convertedPrice,
      formatted: `${exchangeRates[currency].symbol}${Math.round(convertedPrice)}`,
      symbol: exchangeRates[currency].symbol,
      code: currency
    };
  };

  const getCurrencyInfo = () => {
    return exchangeRates[currency];
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        getCurrencyInfo,
        availableCurrencies: Object.keys(exchangeRates).map(code => ({
          code,
          ...exchangeRates[code]
        }))
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
