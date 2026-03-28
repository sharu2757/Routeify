import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowRightLeft, ChevronDown, Banknote } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const currencies = ['USD', 'EUR', 'GBP', 'INR', 'AED', 'AUD', 'CAD', 'SGD', 'JPY', 'CNY'];

// 🔑 Import Gemini API Keys from .env
const keysString = import.meta.env.VITE_GEMINI_API_KEYS || import.meta.env.VITE_GEMINI_API_KEY || "";
const apiKeys = keysString.split(',').map(key => key.trim()).filter(key => key.length > 0);

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState("Gemini 2.5 Flash");
  
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);

  useEffect(() => {
    setExchangeRate(null);
    setError(null);
  }, [fromCurrency, toCurrency]);

  const handleConvertClick = async (retryCount = 0) => {
    setIsLoading(true);
    setError(null);
    setDataSource("Gemini 2.5 Flash"); // Default source

    try {
      if (apiKeys.length === 0) {
        throw new Error("No API Key");
      }

      const genAI = new GoogleGenerativeAI(apiKeys[retryCount % apiKeys.length]);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `You are a strict financial API. Return exactly ONE number: the current exchange rate for 1 ${fromCurrency} to ${toCurrency}. Do not include text, explanations, or currency symbols.`;

      const result = await model.generateContent(prompt);
      const rateText = result.response.text();
      
      console.log("Gemini Raw Output:", rateText);
      
      // 🛠️ FIX: Bulletproof Regex to extract ONLY the first decimal number found
      const match = rateText.match(/[0-9]+(\.[0-9]+)?/);
      
      if (!match) {
        throw new Error("Gemini did not return a valid number.");
      }

      const rate = parseFloat(match[0]);
      if (rate === 0) throw new Error("Rate cannot be zero.");

      setExchangeRate(rate);

    } catch (err) {
      console.error(`Gemini failed, rotating or falling back...`, err);
      
      // Try next API key first
      if (retryCount < apiKeys.length - 1) {
        return handleConvertClick(retryCount + 1);
      }
      
      // 🚀 THE MAGIC FIX: If Gemini completely fails, silently use a free Open API so the user NEVER sees an error!
      try {
        console.log("Using silent fallback Open API...");
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();
        setExchangeRate(data.rates[toCurrency]);
        setDataSource("Live Market API"); // Update the UI to show we used the fallback
      } catch (fallbackErr) {
        setError("Could not fetch live rates. Check your internet connection.");
        setExchangeRate(null);
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = exchangeRate ? (amount * exchangeRate).toFixed(2) : null;

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/50 dark:border-emerald-900/30 overflow-hidden flex flex-col w-full max-w-2xl mx-auto">
      
      <div className="px-6 py-5 border-b border-white/20 dark:border-gray-800 bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-600 dark:from-emerald-800 dark:via-green-700 dark:to-yellow-600 animate-gradient-x text-white flex items-center space-x-3 shrink-0 shadow-md">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/30">
          <Banknote className="w-5 h-5 text-white drop-shadow-sm" />
        </div>
        <h3 className="font-extrabold text-lg tracking-tight drop-shadow-md">AI Currency Converter</h3>
      </div>

      <div className="p-6 md:p-8 flex flex-col space-y-6">
        
        <div className="flex flex-col">
          <label className="text-sm font-extrabold text-gray-700 dark:text-emerald-100/70 mb-2">Amount</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 font-bold text-gray-400">
              {fromCurrency === 'USD' ? '$' : fromCurrency === 'EUR' ? '€' : fromCurrency === 'GBP' ? '£' : fromCurrency === 'INR' ? '₹' : ''}
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-4 bg-white dark:bg-emerald-950/50 border border-gray-200 dark:border-emerald-800/50 rounded-2xl focus:ring-2 focus:ring-rose-500 dark:focus:ring-yellow-500 outline-none text-gray-900 dark:text-white font-extrabold text-lg shadow-inner transition-all"
              min="0"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          
          <div className="relative w-full">
            <label className="text-sm font-extrabold text-gray-700 dark:text-emerald-100/70 mb-2 block">From</label>
            <button
              onClick={() => { setIsFromOpen(!isFromOpen); setIsToOpen(false); }}
              className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 dark:bg-emerald-900/40 dark:hover:bg-emerald-800/50 border border-gray-200 dark:border-emerald-800/50 rounded-2xl px-4 py-4 text-sm font-extrabold outline-none transition-all shadow-sm text-gray-900 dark:text-white"
            >
              <span>{fromCurrency}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFromOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isFromOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-emerald-950 border border-gray-100 dark:border-emerald-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="max-h-48 overflow-y-auto">
                    {currencies.map(c => (
                      <button key={c} onClick={() => { setFromCurrency(c); setIsFromOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-rose-50 dark:hover:bg-emerald-900/50 text-gray-700 dark:text-gray-200 transition-colors">
                        {c}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
            className="mt-6 p-4 bg-gray-100 dark:bg-emerald-900 text-gray-700 dark:text-white rounded-full shadow-lg z-10 hidden md:block border border-gray-200 dark:border-emerald-800"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </motion.button>

          <motion.button onClick={handleSwap} className="p-3 bg-gray-100 dark:bg-emerald-900 text-gray-700 dark:text-white rounded-full shadow-lg z-10 md:hidden border border-gray-200 dark:border-emerald-800">
            <ArrowRightLeft className="w-5 h-5 rotate-90" />
          </motion.button>

          <div className="relative w-full">
            <label className="text-sm font-extrabold text-gray-700 dark:text-emerald-100/70 mb-2 block">To</label>
            <button
              onClick={() => { setIsToOpen(!isToOpen); setIsFromOpen(false); }}
              className="flex items-center justify-between w-full bg-gray-50 hover:bg-gray-100 dark:bg-emerald-900/40 dark:hover:bg-emerald-800/50 border border-gray-200 dark:border-emerald-800/50 rounded-2xl px-4 py-4 text-sm font-extrabold outline-none transition-all shadow-sm text-gray-900 dark:text-white"
            >
              <span>{toCurrency}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isToOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isToOpen && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-emerald-950 border border-gray-100 dark:border-emerald-800 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="max-h-48 overflow-y-auto">
                    {currencies.map(c => (
                      <button key={c} onClick={() => { setToCurrency(c); setIsToOpen(false); }} className="w-full text-left px-4 py-3 text-sm font-bold hover:bg-rose-50 dark:hover:bg-emerald-900/50 text-gray-700 dark:text-gray-200 transition-colors">
                        {c}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 🚀 FIXED THEMED CONVERT BUTTON */}
        <button
          onClick={() => handleConvertClick()}
          disabled={isLoading}
          className={`w-full py-4 mt-2 rounded-2xl text-base font-extrabold text-white transition-all flex items-center justify-center space-x-2 border-none ${
            isLoading
              ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-600 dark:via-green-600 dark:to-yellow-500 hover:shadow-lg animate-gradient-x hover:scale-[1.02] active:scale-95'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          ) : (
            <span>Convert Currency</span>
          )}
        </button>

        {/* Results Area */}
        <AnimatePresence>
          {(convertedAmount || error) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-6 border-t border-gray-200 dark:border-emerald-800/50 flex flex-col items-center justify-center text-center"
            >
              {error ? (
                <p className="text-sm font-bold text-red-500 dark:text-red-400">{error}</p>
              ) : (
                <>
                  <p className="text-sm font-bold text-gray-500 dark:text-emerald-100/60 mb-2">
                    {amount} {fromCurrency} equals
                  </p>
                  <h2 className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-fuchsia-600 dark:from-emerald-400 dark:via-green-500 dark:to-yellow-400 animate-gradient-x tracking-tight">
                    {convertedAmount} {toCurrency}
                  </h2>
                  <p className="text-xs font-bold text-gray-400 mt-3 flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                    Powered by {dataSource}
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default CurrencyConverter;