import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Fetch and parse multiple API keys from the .env file
// Falls back to singular VITE_GEMINI_API_KEY if plural isn't found
const keysString = import.meta.env.VITE_GEMINI_API_KEYS || import.meta.env.VITE_GEMINI_API_KEY || "";
const apiKeys = keysString.split(',').map(key => key.trim()).filter(key => key.length > 0);

if (apiKeys.length === 0) {
  console.error("CRITICAL ERROR: No Gemini API keys found in .env file.");
}

// Global state for rotation and chat history
let currentKeyIndex = 0;
let chatSession = null;

const systemInstruction = `You are Routeify AI, an elite travel advisor for India. 

Your goal is to have a natural conversation with the user to collect the following 10 inputs before generating a final plan:
1. Destination
2. Budget
3. Travel dates
4. Trip duration
5. Number of travelers & Age Group
6. Travel Type
7. Travel Purpose
8. Preferred transport
9. Accommodation type
10. Activity preferences

CONVERSATION RULES:
- If you do not have enough of these 10 inputs, DO NOT generate the itinerary yet. 
- Ask friendly follow-up questions to gather the missing info.

PLAN GENERATION RULES:
Once you have the details, generate a complete trip plan formatted strictly in Markdown. You MUST include:

1. THE OVERVIEW
- Suggested Destination, Vibe, Seasonal Insights, and Local Event Detection.

2. COST BALANCING & BUDGET
- Break down estimated costs in Indian Rupees (₹) for Transport, Accommodation, Food, and Entry Tickets.

3. DAY-BY-DAY ITINERARY
- Detailed schedule with 🌟 Must Visit, 👍 Good to Visit, and ☕ Optional categorizations.
- Include estimated distance/time between attractions.

4. ACCOMMODATION (WITH BOOKING LINKS)
- Suggest specific, highly-rated hotels based on their budget.
- CRITICAL: You MUST provide a clickable Markdown link for every hotel.

5. LOCAL GUIDES & ASSISTANCE
- Recommend specific types of local guides needed.
- Provide clickable links to reliable platforms where they can hire verified local guides.

6. SURVIVAL, FOOD & CULTURE GUIDE
- Local customs, dress codes, safety levels, and must-try local food spots.

Be engaging and professional. Use emojis to make the UI look beautiful.`;

// Helper to get a fresh GenerativeModel instance with the CURRENT active key
const getCurrentModel = () => {
  const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
    systemInstruction: systemInstruction
  });
};

// Modified to accept existing history so we don't lose context during a key rotation
export const initializeChat = (existingHistory = []) => {
  const model = getCurrentModel();
  chatSession = model.startChat({
    history: existingHistory,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  });
};

// Main generation function with auto-retry and key rotation
export const generateAIResponse = async (userMessage, retryCount = 0) => {
  if (!chatSession) initializeChat();
  
  try {
    const result = await chatSession.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error(`Gemini API Error (Key Index ${currentKeyIndex}):`, error);

    // If we hit an error (like rate limit/quota) and haven't exhausted all keys
    if (retryCount < apiKeys.length - 1) {
      console.warn("Rotating API Key and retrying chat request...");
      
      // 1. Save the conversation history before it's lost
      let history = [];
      try {
        history = await chatSession.getHistory();
      } catch (historyError) {
        console.error("Could not recover history during rotation.", historyError);
      }
      
      // 2. Rotate to the next API key
      currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      
      // 3. Re-initialize the session with the new key but keep the old history
      initializeChat(history);
      
      // 4. Retry the exact same message
      return generateAIResponse(userMessage, retryCount + 1);
    }

    throw new Error(error.message || "Failed to generate AI response. All API keys exhausted.");
  }
};

// Translation function with auto-retry and key rotation
export const translateText = async (text, targetLanguage, retryCount = 0) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
    const translateModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" }); 
    
    const prompt = `You are an expert translator. Translate the following travel itinerary/text into ${targetLanguage}. 
    CRITICAL RULES:
    1. Maintain ALL Markdown formatting perfectly (headings, bold, bullets).
    2. Keep all emojis intact.
    3. Do NOT add any extra conversational text, just return the exact translation.
    
    TEXT TO TRANSLATE:
    ${text}`;
    
    const result = await translateModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error(`Translation API Error (Key Index ${currentKeyIndex}):`, error);
    
    // If translation fails, rotate key and retry
    if (retryCount < apiKeys.length - 1) {
      console.warn("Rotating API Key and retrying translation...");
      currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      return translateText(text, targetLanguage, retryCount + 1);
    }
    
    throw new Error(error.message || "Translation failed. All API keys exhausted.");
  }
};