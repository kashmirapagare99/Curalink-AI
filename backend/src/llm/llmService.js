const axios = require('axios');

const generateResponse = async (disease, query, topPublications, topTrials) => {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const MODEL = process.env.OLLAMA_MODEL || 'llama-3.1-8b-instant';

  const limitedPubs = topPublications.slice(0, 3);
  const limitedTrials = topTrials.slice(0, 2);

  const pubsText = limitedPubs.map((p, i) => `${i+1}. ${p.title}`).join('\n');
  const trialsText = limitedTrials.map((t, i) => `${i+1}. ${t.title}`).join('\n');

  const prompt = `Medical Assistant. Summarize this query briefly based on context.
Disease: ${disease}
Query: ${query}
Papers: ${pubsText || 'None'}
Trials: ${trialsText || 'None'}
Format: 1. Overview 2. Insights 3. Trials 4. Personal 5. Sources. Be professional and concise.`;

  try {
    const res = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a professional medical research assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 1000
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error('Groq LLM Service Error:', error.response?.data || error.message);
    return "Error: Could not generate response from the Cloud LLM. Please check your API key.";
  }
};

module.exports = { generateResponse };
