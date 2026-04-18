const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      }
    }
  ],
  context: {
    disease: {
      type: String,
      default: ''
    },
    lastQuery: {
      type: String,
      default: ''
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
