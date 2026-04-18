const Conversation = require('../models/Conversation');
const { expandQuery } = require('../utils/queryExpansion');
const { searchPubMed } = require('../services/pubmedService');
const { searchOpenAlex } = require('../services/openAlexService');
const { searchClinicalTrials } = require('../services/clinicalTrialsService');
const { rankResults } = require('../services/rankingService');
const { generateResponse } = require('../llm/llmService');

const handleQuery = async (req, res) => {
  try {
    const { userId, patientName, disease, query, location } = req.body;

    if (!userId || !disease) {
      return res.status(400).json({ error: 'userId and disease are required' });
    }

    let conversation = await Conversation.findOne({ userId }).sort({ createdAt: -1 });
    
    let activeDisease = disease;
    if (!activeDisease && conversation) {
      activeDisease = conversation.context.disease;
    }

    const expanded = expandQuery(activeDisease, query);

    const [pubmedRes, openAlexRes, clinicalRes] = await Promise.all([
      searchPubMed(expanded),
      searchOpenAlex(expanded),
      searchClinicalTrials(activeDisease)
    ]);

    const { topPublications, topTrials } = await rankResults(pubmedRes, openAlexRes, clinicalRes, expanded);

    const llmResponse = await generateResponse(activeDisease, query, topPublications, topTrials);

    if (!conversation) {
      conversation = new Conversation({
        userId,
        messages: [],
        context: { disease: activeDisease, lastQuery: query }
      });
    }

    conversation.messages.push({ role: 'user', content: query || `Query regarding ${activeDisease}` });
    conversation.messages.push({ role: 'assistant', content: llmResponse });
    conversation.context.lastQuery = query;
    conversation.context.disease = activeDisease;

    console.log(`Saving conversation for userId: ${userId}...`);
    const savedDoc = await conversation.save();
    console.log('Conversation saved successfully:', savedDoc._id);

    res.json({
      response: llmResponse,
      sources: {
        publications: topPublications,
        trials: topTrials
      },
      context: conversation.context
    });

  } catch (error) {
    console.error('Query Controller Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { handleQuery };
