const axios = require('axios');

const searchPubMed = async (query) => {
  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi`;
    const searchRes = await axios.get(searchUrl, {
      params: {
        db: 'pubmed',
        term: query,
        retmode: 'json',
        retmax: 100,
        sort: 'pub date'
      },
      timeout: 5000
    });

    const idList = searchRes.data?.esearchresult?.idlist || [];
    if (idList.length === 0) return [];

    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi`;
    const summaryRes = await axios.get(summaryUrl, {
      params: {
        db: 'pubmed',
        id: idList.join(','),
        retmode: 'json'
      },
      timeout: 5000
    });

    const results = [];
    const uidList = summaryRes.data?.result?.uids || [];
    for (const uid of uidList) {
      const doc = summaryRes.data.result[uid];
      results.push({
        title: doc.title || '',
        abstract: '', 
        authors: doc.authors ? doc.authors.map(a => a.name) : [],
        year: doc.pubdate ? doc.pubdate.split(' ')[0] : '',
        source: 'PubMed',
        url: `https://pubmed.ncbi.nlm.nih.gov/${uid}/`,
        id: uid
      });
    }

    return results;
  } catch (error) {
    console.error('PubMed Service Error:', error.message);
    return [];
  }
};

module.exports = { searchPubMed };
