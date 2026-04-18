const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your React app to talk to this server
app.use(express.json()); // Allows the server to read JSON data

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB!'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// --- MONGODB SCHEMA ---
// This tells MongoDB exactly what our data should look like
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  chatHistory: [{
    id: Number,
    type: { type: String }, // 'user' or 'assistant'
    content: String,
    timestamp: String
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// --- API ROUTES ---

// 1. Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Routeify Backend is running smoothly!' });
});

// 2. Save/Update Chat History Route
app.post('/api/chats/save', async (req, res) => {
  try {
    const { email, messages } = req.body;
    
    // Find the user by email, update their chat history. If they don't exist, create them!
    const user = await User.findOneAndUpdate(
      { email: email }, 
      { chatHistory: messages }, 
      { new: true, upsert: true } 
    );
    
    res.status(200).json({ success: true, message: 'Chat saved successfully' });
  } catch (error) {
    console.error("Save Chat Error:", error);
    res.status(500).json({ success: false, error: 'Failed to save chat' });
  }
});

// 3. Fetch Chat History Route
app.get('/api/chats/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'No chat history found' });
    }
    res.status(200).json({ success: true, messages: user.chatHistory });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch chat history' });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Routeify Backend Server running on http://localhost:${PORT}`);
});