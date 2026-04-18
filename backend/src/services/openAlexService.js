const axios = require('axios');

const searchOpenAlex = async (query) => {
  try {
    const currentYear = new Date().getFullYear();
    const fromYear = currentYear - 5;
    
    const searchUrl = `https://api.openalex.org/works`;
    const res = await axios.get(searchUrl, {
      params: {
        search: query,
        per_page: 100,
        sort: 'relevance_score:desc',
        'filter': `publication_year:>${fromYear}`
      },
      timeout: 5000
    });

    const results = [];
    const works = res.data?.results || [];
    for (const work of works) {
      results.push({
        title: work.title || '',
        abstract: '', 
        authors: work.authorships ? work.authorships.map(a => a.author?.display_name) : [],
        year: work.publication_year ? work.publication_year.toString() : '',
        source: 'OpenAlex',
        url: work.id || '',
        id: work.id
      });
    }

    return results;
  } catch (error) {
    console.error('OpenAlex Service Error:', error.message);
    return [];
  }
};

module.exports = { searchOpenAlex };
