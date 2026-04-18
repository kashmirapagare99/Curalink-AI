const calculateScore = (item, keywords) => {
  let score = 0;
  const textToSearch = `${item.title} ${item.abstract}`.toLowerCase();
  
  keywords.forEach(kw => {
    if (textToSearch.includes(kw.toLowerCase())) {
      score += 10;
    }
  });

  const currentYear = new Date().getFullYear();
  const itemYear = parseInt(item.year, 10);
  if (!isNaN(itemYear)) {
    const age = currentYear - itemYear;
    score += Math.max(0, 10 - age);
  }

  return score;
};

const rankResults = async (pubmedRes, openAlexRes, clinicalRes, query) => {
  const keywords = query.split(' ').filter(word => word.length > 3);
  
  const combinedPubs = [
    ...pubmedRes.map(p => ({ ...p, _scoreBonus: 5 })), 
    ...openAlexRes.map(o => ({ ...o, _scoreBonus: 0 }))
  ];

  combinedPubs.forEach(item => {
    item.score = calculateScore(item, keywords) + item._scoreBonus;
  });

  combinedPubs.sort((a, b) => b.score - a.score);
  
  const uniquePubs = [];
  const titles = new Set();
  for (const item of combinedPubs) {
    const t = item.title.toLowerCase();
    if (!titles.has(t)) {
      titles.add(t);
      uniquePubs.push(item);
    }
  }

  const topPublications = uniquePubs.slice(0, 8);

  clinicalRes.forEach(item => {
    item.score = calculateScore(item, keywords);
  });
  
  clinicalRes.sort((a, b) => b.score - a.score);
  const topTrials = clinicalRes.slice(0, 6);

  return { topPublications, topTrials };
};

module.exports = { rankResults };
