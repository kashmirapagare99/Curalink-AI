const expandQuery = (disease, query) => {
  if (query && query.trim() !== '') {
    return `${query} + ${disease}`;
  } else {
    return `latest research on ${disease}`;
  }
};

module.exports = { expandQuery };
