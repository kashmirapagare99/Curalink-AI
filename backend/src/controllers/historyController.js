const Conversation = require('../models/Conversation');

const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Conversation.find({ userId }).sort({ createdAt: -1 });
    
    res.json(history);
  } catch (error) {
    console.error('History Controller Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getChatHistory };
