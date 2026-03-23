// Enhanced AI Travel Advisor Responses with proper trip planning
const getAIResponse = (userInput) => {
  const input = userInput.toLowerCase().trim()
  
  // Extract travel details intelligently
  const travelDetails = extractTravelDetails(input)
  
  // If we have destination but missing details, ask follow-up questions
  if (travelDetails.destination && !travelDetails.hasAllDetails) {
    return askFollowUpQuestions(travelDetails)
  }
  
  // If we have complete details, generate FULL trip plan
  if (travelDetails.destination && travelDetails.duration && travelDetails.budget && 
      travelDetails.travelers && travelDetails.style) {
    return generateCompleteTripPlan(travelDetails)
  }
  
  // Check for specific queries
  if (input.match(/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)/i)) {
    return getWarmGreeting(input)
  }
  
  if (input.match(/destination|place|where|go|visit|trip|vacation|holiday/i)) {
    return getDestinationInspiration(input)
  }
  
  if (input.match(/hotel|stay|accommodation|lodge|resort|hostel|room/i)) {
    return getAccommodationAdvice(input)
  }
  
  if (input.match(/budget|cost|price|expensive|cheap|afford|spend|money/i)) {
    return getBudgetGuidance(input)
  }
  
  if (input.match(/food|eat|restaurant|cuisine|dish|meal|breakfast|lunch|dinner/i)) {
    return getCulinaryAdvice(input)
  }
  
  if (input.match(/translate|language|speak|phrase|how to say/i)) {
    return getLanguageHelp(input)
  }
  
  if (input.match(/conversation|talk|people|locals|etiquette|customs/i)) {
    return getSocialGuidance(input)
  }
  
  if (input.match(/hidden|gem|offbeat|secret|unexplored|local secret/i)) {
    return getHiddenGems(input)
  }
  
  if (input.match(/quote|motivation|inspire|positive/i)) {
    return getTravelQuote()
  }
  
  // Default: ask what they'd like to plan
  return getWarmWelcome()
}

// Extract travel details from user input
const extractTravelDetails = (input) => {
  const details = {
    destination: null,
    duration: null,
    budget: null,
    travelers: null,
    style: null,
    hasAllDetails: false
  }
  
  // Extract destination
  const destinationMatch = input.match(/(?:to|in|visit|going to|planning for|trip to)\s+([a-zA-Z\s]+?)(?:\s+for|\s+with|\s+on|\s+budget|\s+days?|\s+night|\s*$)/i)
  if (destinationMatch) {
    details.destination = destinationMatch[1].trim()
  }
  
  // ===== IMPROVED DURATION EXTRACTION =====
  // Log the input for debugging
  console.log('Extracting duration from:', input)
  
  // Multiple patterns to catch different ways people write durations
  const durationPatterns = [
    // Pattern: "2 days", "3 days", "5 nights"
    { regex: /(\d+)\s*(days?|nights?)/i, group: 1 },
    
    // Pattern: "2-day", "3-day" (with hyphen)
    { regex: /(\d+)[-\s]day/i, group: 1 },
    
    // Pattern: "for 2 days", "for 3 nights"
    { regex: /for\s+(\d+)\s*(days?|nights?)/i, group: 1 },
    
    // Pattern: "2 days in Paris", "3 nights in Paris"
    { regex: /(\d+)\s*(days?|nights?)\s+(?:in|trip|stay|visit)/i, group: 1 },
    
    // Pattern: "2-day trip", "3-day vacation"
    { regex: /(\d+)[-\s]day\s+(?:trip|vacation|visit|stay)/i, group: 1 },
    
    // Pattern: "plan a 2 day trip", "plan a 3 night stay"
    { regex: /plan\s+a\s+(\d+)\s*(days?|nights?)/i, group: 1 },
    
    // Pattern: "I have 2 days", "I have 3 days leave"
    { regex: /i\s+have\s+(\d+)\s*(days?|nights?)/i, group: 1 },
    
    // Pattern: "2d" (shorthand)
    { regex: /(\d+)[d]\s/i, group: 1 },
    
    // Pattern: just a number followed by context (last resort)
    { regex: /\b(\d+)\b\s*(?:day|night)/i, group: 1 }
  ]
  
  // Try each pattern
  for (const pattern of durationPatterns) {
    const match = input.match(pattern.regex)
    if (match) {
      details.duration = parseInt(match[pattern.group])
      console.log('Found duration with pattern:', pattern.regex, 'value:', details.duration)
      break
    }
  }
  
  // If still no duration, try to find any number that might represent days
  if (!details.duration) {
    // Look for "X days" anywhere in the text
    const simpleMatch = input.match(/\b(\d+)\s*days?\b/i)
    if (simpleMatch) {
      details.duration = parseInt(simpleMatch[1])
      console.log('Found duration with simple pattern:', details.duration)
    }
  }
  
  // Special handling for your specific query: "2 days leave"
  if (!details.duration && input.includes('days leave')) {
    const leaveMatch = input.match(/(\d+)\s*days?\s+leave/i)
    if (leaveMatch) {
      details.duration = parseInt(leaveMatch[1])
      console.log('Found duration from leave pattern:', details.duration)
    }
  }
  
  // Special handling for "2-day" format
  if (!details.duration && input.includes('-day')) {
    const hyphenMatch = input.match(/(\d+)-day/i)
    if (hyphenMatch) {
      details.duration = parseInt(hyphenMatch[1])
      console.log('Found duration from hyphen pattern:', details.duration)
    }
  }
  
  // Extract budget
  if (input.match(/budget|low cost|cheap|backpacker|budget-friendly/i)) details.budget = 'low'
  else if (input.match(/mid|medium|moderate|comfortable|standard/i)) details.budget = 'medium'
  else if (input.match(/luxury|premium|high end|5 star|five star|expensive/i)) details.budget = 'luxury'
  
  // Extract travelers
  if (input.match(/solo|alone|by myself|single|just me/i)) details.travelers = 'solo'
  else if (input.match(/couple|partner|girlfriend|boyfriend|romantic|honeymoon|together|we|us/i)) details.travelers = 'couple'
  else if (input.match(/family|kids|children|baby|toddler|parent|with child/i)) details.travelers = 'family'
  else if (input.match(/group|friends|buddies|colleagues|team|with friends/i)) details.travelers = 'group'
  
  // Extract style
  if (input.match(/adventure|trek|hike|wild|extreme|sports|active|outdoor/i)) details.style = 'adventure'
  else if (input.match(/relax|beach|leisure|calm|spa|peaceful|chill|lazy/i)) details.style = 'relaxed'
  else if (input.match(/culture|history|museum|heritage|art|architecture|sightseeing|historical/i)) details.style = 'cultural'
  else if (input.match(/food|culinary|eat|restaurant|cuisine|gastronomy|foodie|dining/i)) details.style = 'culinary'
  else if (input.match(/romantic|honeymoon|couple|love|valentine|anniversary/i)) details.style = 'romantic'
  
  // Check if we have enough details
  details.hasAllDetails = details.destination && details.duration && details.budget && 
                          details.travelers && details.style
  
  console.log('Final extracted details:', details)
  return details
}

// Ask follow-up questions when details are missing
const askFollowUpQuestions = (details) => {
  let response = `🌍 **Great choice! Planning a trip to ${details.destination || 'your dream destination'}**\n\n`
  
  if (!details.duration) {
    response += "**📅 How many days are you planning to stay?**\n(e.g., 3 days, 1 week, 5 nights)\n\n"
  }
  
  if (!details.budget) {
    response += "**💰 What's your budget range?**\n"
    response += "• 🎒 **Budget** - Save money, hostels, street food\n"
    response += "• 🏨 **Medium** - Comfortable hotels, mix of activities\n"
    response += "• ✨ **Luxury** - Premium experiences, fine dining\n\n"
  }
  
  if (!details.travelers) {
    response += "**👥 Who's joining the adventure?**\n"
    response += "• 👤 Solo traveler\n"
    response += "• 💑 Couple\n"
    response += "• 👨‍👩‍👧‍👦 Family\n"
    response += "• 👥 Group of friends\n\n"
  }
  
  if (!details.style) {
    response += "**🎯 What kind of experience are you seeking?**\n"
    response += "• 🏃 Adventure & activities\n"
    response += "• 🧘 Relaxed & peaceful\n"
    response += "• 🏛️ Culture & history\n"
    response += "• 🍜 Food & culinary\n"
    response += "• 💕 Romantic getaway\n\n"
  }
  
  response += "✨ **Just reply with the missing details** and I'll create your perfect itinerary!"
  
  return response
}


// Generate complete trip plan with all details
const generateCompleteTripPlan = (details) => {
  const { destination, duration, budget, travelers, style } = details
  
  // Capitalize destination
  const destCapitalized = destination.charAt(0).toUpperCase() + destination.slice(1)
  
  // Generate personalized greeting
  const greeting = getPersonalizedGreeting(travelers, style)
  
  // Generate day-by-day itinerary
  const itinerary = generateDayByDayItinerary(destination, duration, style, budget)
  
  // Generate accommodation based on budget and travelers
  const accommodation = generateAccommodationDetails(destination, budget, travelers)
  
  // Generate food recommendations
  const food = generateFoodRecommendations(destination, budget, style)
  
  // Generate activities
  const activities = generateActivities(destination, style, duration)
  
  // Generate hidden gems
  const hiddenGems = generateHiddenGemsForDestination(destination)
  
  // Generate transportation tips
  const transport = generateTransportTips(destination)
  
  // Generate estimated costs
  const costs = generateEstimatedCosts(destination, duration, budget)
  
  // Generate traveler reviews
  const reviews = generateDestinationReviews(destination)
  
  // Generate conversation starters
  const conversations = generateConversationStarters(destination)
  
  // Generate translation phrases
  const phrases = generateTranslationPhrases(destination)
  
  return `# 🌟 **Your Complete ${destCapitalized} Travel Plan** 🌟

${greeting}

## 📅 **${duration}-Day Itinerary**

${itinerary}

## 🏨 **Where to Stay**
${accommodation}

## 🍜 **Must-Try Food & Restaurants**
${food}

## 🎯 **Top Activities & Experiences**
${activities}

## 💎 **Hidden Gems Near ${destCapitalized}**
${hiddenGems}

## 🚗 **Getting Around**
${transport}

## 💰 **Estimated Budget Breakdown**
${costs}

## ⭐ **Traveler Reviews**
${reviews}

## 💬 **Connect with Locals**
${conversations}

## 🗣️ **Helpful Local Phrases**
${phrases}

## 🗺️ **Pro Tips**
• Book popular attractions in advance (skip-the-line tickets)
• Get a city pass for discounts on multiple attractions
• Learn a few local phrases - locals appreciate the effort!
• Carry cash for small purchases and street food
• Visit popular spots early morning to avoid crowds
• Download offline maps before you go

**Ready to book?** I can help with specific hotel recommendations, restaurant reservations, or activity bookings. Just ask! ✨

*"${getRandomTravelQuote()}"*`
}

// Generate day-by-day itinerary based on duration and style
const generateDayByDayItinerary = (destination, duration, style, budget) => {
  const itinerary = []
  
  const dayActivities = {
    adventure: [
      "Morning hiking/wildlife adventure",
      "Afternoon water sports/extreme activities",
      "Evening local adventure sports meetup"
    ],
    relaxed: [
      "Sleep in, leisurely breakfast at local café",
      "Morning stroll through parks/gardens",
      "Afternoon spa/wellness break",
      "Evening sunset viewing, relaxed dinner"
    ],
    cultural: [
      "Morning museum/historical site visit",
      "Afternoon guided cultural tour",
      "Evening traditional performance/show",
      "Learn about local crafts/workshops"
    ],
    culinary: [
      "Morning food market exploration",
      "Cooking class with local chef",
      "Afternoon food tour of hidden gems",
      "Evening fine dining experience"
    ],
    romantic: [
      "Breakfast with a view",
      "Couples spa/massage",
      "Sunset boat ride/walk",
      "Candlelit dinner at romantic restaurant"
    ]
  }
  
  for (let i = 1; i <= duration; i++) {
    let dayPlan = `**Day ${i}:** `
    
    if (i === 1) {
      dayPlan += `Arrival in ${destination}, check-in, explore nearby area, welcome dinner`
    } else if (i === duration) {
      dayPlan += `Last day: Souvenir shopping, final sightseeing, departure`
    } else {
      const activities = dayActivities[style] || dayActivities.relaxed
      const activity = activities[(i - 2) % activities.length]
      dayPlan += activity
    }
    
    itinerary.push(dayPlan)
  }
  
  return itinerary.map(day => `• ${day}`).join('\n')
}

// Generate accommodation based on budget and travelers
const generateAccommodationDetails = (destination, budget, travelers) => {
  const accommodations = {
    low: {
      solo: "**Hostel** - Dorm bed ($20-40/night), social atmosphere, free WiFi\n• **Budget Guesthouse** - Private room ($40-60/night), basic but clean",
      couple: "**Budget Hotel** - Double room ($50-80/night), private bathroom\n• **Hostel Private Room** - ($45-70/night), good for meeting people",
      family: "**Budget Apartment** - 2-bedroom ($70-100/night), kitchenette\n• **Family Hostel** - Family room ($60-90/night), kid-friendly",
      group: "**Multiple Hostel Beds** - ($25-45/person/night)\n• **Budget Airbnb** - Entire place ($80-120/night for group)"
    },
    medium: {
      solo: "**Boutique Hotel** - Single room ($80-120/night), central location\n• **Mid-range Hotel** - ($70-110/night), good amenities",
      couple: "**3-Star Hotel** - Double room ($100-150/night), breakfast included\n• **Boutique B&B** - ($120-180/night), charming experience",
      family: "**Family Suite** - ($150-220/night), extra space for kids\n• **Serviced Apartment** - ($130-200/night), kitchen, laundry",
      group: "**Hotel Rooms** - 2-3 rooms ($90-140/room/night)\n• **Large Airbnb** - Entire place ($150-250/night for group)"
    },
    luxury: {
      solo: "**5-Star Hotel** - Luxury single ($200-350/night), premium service\n• **Boutique Luxury** - ($250-400/night), personalized attention",
      couple: "**Luxury Resort** - Premium double ($300-500/night), spa access\n• **Heritage Property** - ($350-600/night), unique experience",
      family: "**Luxury Family Suite** - ($400-700/night), kids' club\n• **Private Villa** - ($500-1000/night), full service",
      group: "**Luxury Hotel** - Multiple premium rooms ($250-400/room/night)\n• **Private Luxury Villa** - ($600-1200/night), staff included"
    }
  }
  
  return accommodations[budget]?.[travelers] || accommodations.medium.solo
}

// Generate food recommendations
const generateFoodRecommendations = (destination, budget, style) => {
  const foods = {
    breakfast: "Local bakery/café with fresh pastries and coffee",
    lunch: "Family-run restaurant serving authentic local cuisine",
    dinner: style === 'culinary' ? "Michelin-starred/fine dining experience" : "Popular local restaurant with traditional dishes",
    street: "Famous street food market - try the local specialty!",
    budget: "Food courts and local markets - cheapest and most authentic"
  }
  
  if (budget === 'low') {
    return `**Budget Eats:**\n• Breakfast: ${foods.breakfast} ($3-7)\n• Lunch: ${foods.budget} ($5-10)\n• Dinner: ${foods.budget} ($8-15)\n• Must-try street food: ${foods.street} ($2-5)`
  } else if (budget === 'medium') {
    return `**Mid-Range Dining:**\n• Breakfast: Café with local specialties ($8-15)\n• Lunch: ${foods.lunch} ($15-25)\n• Dinner: ${foods.dinner} ($25-45)\n• Food tour: Sample multiple local dishes ($40-60)`
  } else {
    return `**Luxury Dining:**\n• Breakfast: Hotel breakfast or gourmet café ($15-30)\n• Lunch: ${foods.lunch} premium option ($30-50)\n• Dinner: ${foods.dinner} ($50-100+)\n• Private chef experience or exclusive food tour ($100-200)`
  }
}

// Generate activities
const generateActivities = (destination, style, duration) => {
  const activities = {
    adventure: ["Hiking/trekking", "Water sports", "Bike tours", "Rock climbing", "Zip-lining"],
    relaxed: ["Spa day", "Beach time", "Park picnics", "Sunset cruises", "Café hopping"],
    cultural: ["Museum visits", "Historical tours", "Art galleries", "Cultural workshops", "Temple/church visits"],
    culinary: ["Cooking classes", "Food tours", "Wine tasting", "Market visits", "Restaurant hopping"],
    romantic: ["Sunset dinners", "Couple spa", "Boat rides", "Stargazing", "Romantic walks"]
  }
  
  const selectedActivities = activities[style] || activities.relaxed
  const numActivities = Math.min(5, Math.ceil(duration * 1.5))
  
  return selectedActivities.slice(0, numActivities).map(activity => `• ${activity}`).join('\n')
}

// Generate hidden gems for specific destination
const generateHiddenGemsForDestination = (destination) => {
  const gems = [
    `**Secret Spot:** Local favorite just 20 mins from city center - ask a local for directions!`,
    `**Hidden Viewpoint:** Lesser-known spot with better views and no crowds`,
    `**Local Market:** Where locals shop - prices are 50% less than tourist areas`,
    `**Secret Garden:** Peaceful oasis away from tourist crowds`,
    `**Family Restaurant:** 3 generations of recipes, no English menu - just point and smile!`
  ]
  
  return gems.slice(0, 3).map(gem => `• ${gem}`).join('\n')
}

// Generate transport tips
const generateTransportTips = (destination) => {
  return `• **Public Transport:** Buy a multi-day pass for unlimited travel\n• **Taxis/Rideshare:** Use apps to avoid language barriers\n• **Walking:** Most city centers are walkable\n• **Bike Rental:** Great for exploring at your own pace\n• **Airport Transfer:** Pre-book to save money and stress`
}

// Generate estimated costs
const generateEstimatedCosts = (destination, duration, budget) => {
  const dailyRates = {
    low: { accommodation: 40, food: 25, activities: 20, transport: 10 },
    medium: { accommodation: 100, food: 50, activities: 40, transport: 20 },
    luxury: { accommodation: 300, food: 150, activities: 100, transport: 50 }
  }
  
  const rates = dailyRates[budget] || dailyRates.medium
  const total = (rates.accommodation + rates.food + rates.activities + rates.transport) * duration
  
  return `**Daily Breakdown:**\n• 🏨 Accommodation: $${rates.accommodation}/day\n• 🍜 Food: $${rates.food}/day\n• 🎯 Activities: $${rates.activities}/day\n• 🚗 Transport: $${rates.transport}/day\n\n**Total Estimated Cost for ${duration} days: $${total}**`
}

// Generate destination reviews
const generateDestinationReviews = (destination) => {
  const reviews = [
    { text: "Absolutely magical! Exceeded all expectations", rating: 5, author: "Sarah" },
    { text: "Perfect blend of culture and relaxation", rating: 5, author: "Mike" },
    { text: "Hidden gems everywhere - explore beyond the tourist spots!", rating: 5, author: "Elena" },
    { text: "Food was incredible - take a cooking class!", rating: 4, author: "David" },
    { text: "Locals were so welcoming, felt like home", rating: 5, author: "Lisa" }
  ]
  
  return reviews.slice(0, 3).map(r => `⭐ "${r.text}" - ${r.author}`).join('\n')
}

// Generate conversation starters
const generateConversationStarters = (destination) => {
  return `• "Excuse me, where do locals eat around here?"\n• "Is there a hidden spot you'd recommend?"\n• "What's your favorite thing about ${destination}?"\n• "I'm visiting from [country], any tips for me?"`
}

// Generate translation phrases
const generateTranslationPhrases = (destination) => {
  return `• Hello: [Learn this first!]\n• Thank you: [Shows respect]\n• How much?: [Essential for markets]\n• Delicious!: [Makes cooks smile]\n• Where is...?: [For directions]`
}

// Get personalized greeting
const getPersonalizedGreeting = (travelers, style) => {
  const greetings = {
    solo: "👋 **Hello solo adventurer!** Ready for an amazing journey of self-discovery?",
    couple: "💑 **Hello lovebirds!** I've planned something romantic and memorable just for you.",
    family: "👨‍👩‍👧‍👦 **Hello wonderful family!** Get ready for smiles, laughter, and unforgettable memories.",
    group: "👥 **Hello friends!** Time for an epic group adventure you'll talk about for years.",
    default: "👋 **Hello traveler!** Let's create your perfect adventure."
  }
  
  return greetings[travelers] || greetings.default
}

// Get warm greeting
const getWarmGreeting = (input) => {
  const hour = new Date().getHours()
  let timeGreeting = "Hello"
  
  if (hour < 12) timeGreeting = "Good morning"
  else if (hour < 17) timeGreeting = "Good afternoon"
  else timeGreeting = "Good evening"
  
  return `${timeGreeting}! 👋 I'm your Routeify AI travel companion! 

I can help you plan complete trips with day-by-day itineraries, find hidden gems, suggest accommodations for your budget, recommend local food, and much more!

**Where shall we explore today?** Just tell me your destination and how many days!`
}

// Get random travel quote
const getRandomTravelQuote = () => {
  const quotes = [
    "Travel not to escape life, but to discover it.",
    "The world is a book, and those who don't travel read only one page.",
    "Adventure may hurt you, but monotony will kill you.",
    "Take only memories, leave only footprints.",
    "Not all those who wander are lost.",
    "Travel is the only thing you buy that makes you richer."
  ]
  return quotes[Math.floor(Math.random() * quotes.length)]
}

// Get warm welcome
const getWarmWelcome = () => {
  return `👋 **Hello there, fellow traveler!**

I'm your Routeify AI travel companion, and I'm here to make your travel dreams come true!

**I can help you with:**
• 🌍 **Complete trip planning** - Tell me where, how long, your budget, and travel style
• 💎 **Hidden gems** - Places only locals know
• 🏨 **Accommodation** - Budget to luxury recommendations
• 🍜 **Food adventures** - Street food to fine dining
• 💬 **Local connections** - Conversation starters & etiquette
• 🗣️ **Language help** - Translation & essential phrases

**Try asking me:**
"Plan a 5-day trip to Paris on medium budget for a couple"
"7 days in Tokyo on a budget, solo traveler, love food"
"4-day romantic getaway to Santorini, luxury"

**Where shall we explore today?** 🌟`
}

// Get random review for floating UI
const getRandomReview = () => {
  const reviews = [
    { text: "Hidden gem, peaceful and worth the visit", rating: 5, author: "Sarah", id: Date.now() + Math.random() },
    { text: "Budget friendly and unforgettable experience", rating: 5, author: "Mike", id: Date.now() + Math.random() },
    { text: "Perfect for first-time travelers", rating: 4, author: "Elena", id: Date.now() + Math.random() },
    { text: "Locals were so welcoming, felt like home", rating: 5, author: "David", id: Date.now() + Math.random() },
    { text: "Found spots not in any guidebook - magical!", rating: 5, author: "Lisa", id: Date.now() + Math.random() }
  ]
  return reviews[Math.floor(Math.random() * reviews.length)]
}

// Get random quote
const getRandomQuote = () => {
  return getRandomTravelQuote()
}

// Get conversation starters for a destination
const getConversationStarters = (destination) => {
  return [
    `"Excuse me, could you recommend a good local restaurant near ${destination}?"`,
    `"Is this place popular with locals? It's beautiful!"`,
    `"I'm visiting from [country], what's your favorite thing about ${destination}?"`,
    `"What would you recommend I don't miss here?"`
  ]
}

// Get destination inspiration
const getDestinationInspiration = (input) => {
  return `**✨ Dreaming of your next adventure? Let me inspire you!**

**Popular Choices:**
• 🇫🇷 **Paris** - Romance, art, incredible food
• 🇯🇵 **Tokyo** - Futuristic meets traditional
• 🇮🇹 **Rome** - History at every corner

**Hidden Gems:**
• 🇵🇹 **Porto** - Authentic, charming, affordable
• 🇻🇳 **Hoi An** - Lantern-lit streets, tailors, beaches

**Tell me your preferences and I'll find the perfect destination!**`
}

// Get accommodation advice
const getAccommodationAdvice = (input) => {
  return `**🏨 Finding Your Perfect Stay**

**Types of Stays:**
• **Hostels** ($15-40) - Meet travelers, shared dorms
• **Guesthouses** ($30-70) - Local experience, basic comfort
• **Hotels** ($60-200) - Privacy, amenities, service

**Pro Tips:**
✅ Read recent reviews
✅ Check location on maps
✅ Look for free cancellation

Want specific recommendations for a destination? Just tell me where!`
}

// Get budget guidance
const getBudgetGuidance = (input) => {
  return `**💰 Smart Travel Budgeting**

**Daily Budget Estimates:**
• **Southeast Asia:** $30-50 (budget), $60-100 (comfort)
• **Europe:** $70-120 (budget), $150-300 (comfort)

**Money-Saving Secrets:**
✅ Travel in shoulder season
✅ Eat where locals eat
✅ Use public transport

Want a detailed budget breakdown? Tell me your destination!`
}

// Get culinary advice
const getCulinaryAdvice = (input) => {
  return `**🍜 Culinary Adventures Await!**

**Must-Try Experiences:**
• Cooking classes (learn local secrets!)
• Food tours (eat with experts)
• Local markets (shop like a local)

**Tips for Foodies:**
✅ Look for busy stalls (locals know best!)
✅ Try one new thing daily

Craving something specific? Tell me your destination!`
}

// Get language help
const getLanguageHelp = (input) => {
  return `**🗣️ Break the Language Barrier!**

**Essential Phrases:**
• "Hello" - Opens every door
• "Thank you" - Shows respect
• "How much?" - For shopping
• "Where is...?" - For directions

**Translation Tools:**
📱 Text translation available
🎤 Voice mode supported
📸 Camera scan for menus

Want survival phrases for a specific country? Just ask!`
}

// Get social guidance
const getSocialGuidance = (input) => {
  return `**💬 Connect with the World**

**Conversation Starters:**
• "This place is beautiful! Do you come here often?"
• "What's your favorite local dish?"
• "Any hidden spots you'd recommend?"

**Cultural Etiquette:**
• Research local customs
• Dress appropriately
• Learn basic greetings

*"The best memories are the people you meet!"*`
}

// Get hidden gems
const getHiddenGems = (input) => {
  return `**✨ Hidden Gems Worth Seeking:**

• **Secret Garden** - Peaceful oasis away from crowds
• **Local Food Alley** - Family recipes, not in guidebooks
• **Sunset Point** - Better than the famous viewpoint

Want hidden gems for a specific destination? Just tell me where you're going!`
}

// Get travel quote
const getTravelQuote = () => {
  return getRandomTravelQuote()
}

// EXPORT ALL FUNCTIONS AT THE END - SINGLE EXPORT BLOCK
export {
  getAIResponse,
  extractTravelDetails,
  askFollowUpQuestions,
  generateCompleteTripPlan,
  getRandomReview,
  getRandomQuote,
  getConversationStarters,
  getWarmGreeting,
  getDestinationInspiration,
  getAccommodationAdvice,
  getBudgetGuidance,
  getCulinaryAdvice,
  getLanguageHelp,
  getSocialGuidance,
  getHiddenGems,
  getTravelQuote,
  getWarmWelcome,
  generateDayByDayItinerary,
  generateAccommodationDetails,
  generateFoodRecommendations,
  generateActivities,
  generateHiddenGemsForDestination,
  generateTransportTips,
  generateEstimatedCosts,
  generateDestinationReviews,
  getPersonalizedGreeting,
  getRandomTravelQuote
}