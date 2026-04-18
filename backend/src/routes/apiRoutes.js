const express = require('express');
const { handleQuery } = require('../controllers/queryController');
const { getChatHistory } = require('../controllers/historyController');

const router = express.Router();

router.post('/query', handleQuery);
router.get('/chat-history/:userId', getChatHistory);
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = router;
