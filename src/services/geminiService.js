import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Fetch keys and strip any accidental hidden quotes that cause 403 errors
let keysString = import.meta.env.VITE_GEMINI_API_KEYS || import.meta.env.VITE_GEMINI_API_KEY || "";
keysString = keysString.replace(/['"]/g, ''); 
const apiKeys = keysString.split(',').map(key => key.trim()).filter(key => key.length > 0);

// 🚨 This will print your active key to the browser console so we can PROVE it updated
console.log("🚨 VITE IS USING THIS KEY:", apiKeys.length > 0 ? apiKeys[0].substring(0, 10) + "..." : "NO KEY FOUND");

let currentKeyIndex = 0;
let chatSession = null;

// 🚀 UPDATED INSTRUCTION: Fast, frictionless plan generation
const systemInstruction = `You are Routeify AI, an elite travel advisor for India. 

Your goal is to provide instant value. You NO LONGER need 10 inputs to start. As long as the user gives you a Destination and a rough Duration, you MUST generate a preliminary travel plan immediately.

CONVERSATION RULES:
- If the user provides basic details (e.g., "3 days in Mumbai"), generate a great baseline itinerary using logical assumptions (e.g., standard budget, popular tourist spots).
- At the very end of your response, politely ask ONE quick question to refine the plan.
- NEVER give the user a long list of questions to answer.

PLAN GENERATION RULES:
Format strictly in Markdown. You MUST include:

1. THE OVERVIEW
- Suggested Vibe, Seasonal Insights, and Local Event Detection.

2. COST BALANCING & BUDGET
- Break down estimated costs in Indian Rupees (₹).

3. DAY-BY-DAY ITINERARY
- Detailed schedule with 🌟 Must Visit, 👍 Good to Visit, and ☕ Optional categorizations.

4. ACCOMMODATION (WITH BOOKING LINKS)
- Suggest highly-rated hotels. Provide clickable Markdown links.

5. LOCAL GUIDES & ASSISTANCE
- Recommend specific types of local guides needed with clickable links.

6. SURVIVAL, FOOD & CULTURE GUIDE
- Local customs, safety levels, and must-try local food spots.

7. THE HIDDEN MAP TRIGGER (CRITICAL)
- At the very end of EVERY response, you MUST include a secret tag indicating the primary destination being discussed. 
- Format it exactly like this: |MAP: City, State|
- Example: |MAP: Mumbai, Maharashtra|
- If no specific place is discussed yet, use |MAP: India|

Be engaging and professional. Use emojis to make the UI look beautiful.`;

const getCurrentModel = () => {
  if (apiKeys.length === 0) throw new Error("No API Key configured.");
  const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
  
  // CHANGED: Upgraded to 1.5-flash to avoid 503 traffic spikes on the lite model
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemInstruction
  });
};

export const initializeChat = (existingHistory = []) => {
  const model = getCurrentModel();
  chatSession = model.startChat({
    history: existingHistory,
  });
};

export const generateAIResponse = async (userMessage, retryCount = 0) => {
  if (!chatSession) initializeChat();
  
  try {
    const result = await chatSession.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error(`Gemini API Error (Key Index ${currentKeyIndex}):`, error);

    if (retryCount < apiKeys.length - 1) {
      console.warn("Rotating API Key...");
      let history = [];
      try {
        history = await chatSession.getHistory();
      } catch (historyError) {
        console.error("Could not recover history.", historyError);
      }
      currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      initializeChat(history);
      return generateAIResponse(userMessage, retryCount + 1);
    }
    
    // 🛡️ GRACEFUL FALLBACK LOGIC
    const errMsg = error.message || "";
    if (errMsg.includes("429") || errMsg.includes("Quota") || errMsg.includes("exceeded")) {
      throw new Error("I am receiving a lot of requests right now! Please wait about 30 seconds and try asking me again. ⏳");
    }
    if (errMsg.includes("503") || errMsg.includes("high demand") || errMsg.includes("overloaded")) {
      throw new Error("My cloud servers are experiencing a massive traffic spike right now! Please wait a minute or two and try again. 🚀");
    }

    throw new Error("I hit a slight snag connecting to my brain. Please try again in a moment!");
  }
};

export const translateText = async (text, targetLanguage, retryCount = 0) => {
  if (apiKeys.length === 0) throw new Error("No API Key configured.");
  try {
    const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
    const translateModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const prompt = `Translate the following text into ${targetLanguage}. Maintain all Markdown and emojis.\n\n${text}`;
    const result = await translateModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    if (retryCount < apiKeys.length - 1) {
      currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
      return translateText(text, targetLanguage, retryCount + 1);
    }
    
    const errMsg = error.message || "";
    if (errMsg.includes("429") || errMsg.includes("503")) {
      throw new Error("Translation servers are busy! Please try again in a moment. 🌍");
    }
    
    throw new Error("Translation failed.");
  }
};