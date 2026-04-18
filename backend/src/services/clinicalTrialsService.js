const axios = require('axios');

const searchClinicalTrials = async (query) => {
  try {
    const searchUrl = `https://clinicaltrials.gov/api/v2/studies`;
    const res = await axios.get(searchUrl, {
      params: {
        'query.cond': query,
        'filter.overallStatus': 'RECRUITING,ACTIVE_NOT_RECRUITING',
        pageSize: 50
      },
      timeout: 5000
    });

    const results = [];
    const studies = res.data?.studies || [];
    for (const study of studies) {
      const protocol = study.protocolSection || {};
      const idModule = protocol.identificationModule || {};
      const descModule = protocol.descriptionModule || {};
      const statusModule = protocol.statusModule || {};
      const designModule = protocol.designModule || {};
      const eligibilityModule = protocol.eligibilityModule || {};
      const contactsLocationsModule = protocol.contactsLocationsModule || {};
      
      const locations = contactsLocationsModule.locations || [];
      const primaryLocation = locations[0] ? `${locations[0].facility || ''}, ${locations[0].city || ''}, ${locations[0].country || ''}`.replace(/^, /, '') : 'Multicenter / Global';
      
      const contacts = contactsLocationsModule.centralContacts || [];
      const primaryContact = contacts[0] ? `${contacts[0].name || ''} (${contacts[0].phone || ''})` : 'Contact via ClinicalTrials.gov';

      results.push({
        title: idModule.officialTitle || idModule.briefTitle || '',
        abstract: descModule.briefSummary || '',
        nctId: idModule.nctId || '',
        status: statusModule.overallStatus ? statusModule.overallStatus.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown',
        phase: designModule.phases ? designModule.phases.join(', ') : 'Not applicable',
        location: primaryLocation,
        eligibility: eligibilityModule.eligibilityCriteria || 'Check source website for criteria.',
        contact: primaryContact,
        source: 'ClinicalTrials.gov',
        url: `https://clinicaltrials.gov/study/${idModule.nctId}`,
        id: idModule.nctId
      });
    }

    return results;
  } catch (error) {
    console.error('ClinicalTrials Service Error:', error.message);
    return [];
  }
};

module.exports = { searchClinicalTrials };
