export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  source: string;
  journal: string;
  url: string;
  snippet: string;
}

export interface ClinicalTrial {
  id: string;
  title: string;
  status: "Recruiting" | "Completed" | "Active, not recruiting" | "Enrolling by invitation";
  phase: string;
  location: string;
  eligibility: string;
  contact: string;
  nctId: string;
}

export interface AISummary {
  conditionOverview: string;
  keyInsights: string[];
  treatmentTrends: string[];
  risksNotes: string[];
  personalizedInsight: string;
  sources: string[];
}

export interface ScenarioData {
  papers: ResearchPaper[];
  trials: ClinicalTrial[];
  summary: AISummary;
  initialResponse: string;
}

const lungCancerData: ScenarioData = {
  initialResponse: `Based on an analysis of **47 recent publications** and **12 active clinical trials**, here is a structured overview of the latest treatments for **lung cancer**:\n\nI've identified significant advances in **immunotherapy combinations**, **targeted EGFR inhibitors**, and **next-generation checkpoint inhibitors**. The insights panel on the right contains the full breakdown of research papers, active trials, and a structured AI summary.`,
  papers: [
    {
      id: "lc1",
      title: "Osimertinib Plus Chemotherapy in EGFR-Mutated Advanced NSCLC",
      authors: ["Planchard D.", "Jänne PA.", "Cheng Y.", "Yang JC."],
      year: 2024,
      source: "PubMed",
      journal: "New England Journal of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "This phase 3 trial demonstrated superior progression-free survival with osimertinib plus chemotherapy vs. osimertinib alone in EGFR-mutated NSCLC patients (25.5 vs 16.7 months, HR 0.62).",
    },
    {
      id: "lc2",
      title: "Pembrolizumab-Based Combinations in Stage III NSCLC: A Meta-Analysis",
      authors: ["Antonia SJ.", "Villegas A.", "Daniel D."],
      year: 2024,
      source: "OpenAlex",
      journal: "Lancet Oncology",
      url: "https://openalex.org/",
      snippet:
        "Meta-analysis of 8 RCTs found pembrolizumab-based combinations reduced mortality by 38% in PD-L1 high expressers. Combination with platinum doublet showed best overall survival benefit.",
    },
    {
      id: "lc3",
      title: "LAURA Trial: Osimertinib After Chemoradiotherapy in EGFR-Mutated Stage III NSCLC",
      authors: ["Lu S.", "Kato T.", "Dong X.", "Zhong W."],
      year: 2024,
      source: "PubMed",
      journal: "NEJM",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "Osimertinib significantly prolonged PFS vs. placebo in EGFR-mutated, unresectable, stage III NSCLC after definitive chemoradiotherapy (39.1 vs. 5.6 months, HR 0.16).",
    },
    {
      id: "lc4",
      title: "CAR-T Cell Therapy Targeting MAGE-A4 in Lung Cancer",
      authors: ["Hong DS.", "Hanley MJ.", "Pappo AS."],
      year: 2023,
      source: "OpenAlex",
      journal: "Nature Medicine",
      url: "https://openalex.org/",
      snippet:
        "First-in-human study of afami-cel (HLA-A*02:01/MAGE-A4–specific CAR-T) demonstrated durable responses in MAGE-A4+ synovial sarcoma and lung adenocarcinoma with manageable toxicity.",
    },
    {
      id: "lc5",
      title: "Liquid Biopsy for Early Detection of NSCLC Recurrence",
      authors: ["Abbosh C.", "Birkbak NJ.", "Wilson GA."],
      year: 2023,
      source: "PubMed",
      journal: "Cancer Cell",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "ctDNA analysis via liquid biopsy identified recurrence 70–346 days before CT imaging in NSCLC patients, enabling early therapeutic intervention with significantly improved outcomes.",
    },
    {
      id: "lc6",
      title: "Trastuzumab Deruxtecan in HER2-Mutant Non–Small-Cell Lung Cancer",
      authors: ["Li BT.", "Smit EF.", "Goto Y."],
      year: 2023,
      source: "PubMed",
      journal: "New England Journal of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "T-DXd demonstrated an objective response rate of 57.7% in HER2-mutant NSCLC, establishing it as the first approved HER2-directed therapy for this indication.",
    },
  ],
  trials: [
    {
      id: "lt1",
      nctId: "NCT05687266",
      title: "MARIPOSA-2: Amivantamab + Lazertinib vs. Chemotherapy in EGFR-Mutant NSCLC",
      status: "Recruiting",
      phase: "Phase 3",
      location: "Multiple sites: USA, EU, Asia-Pacific",
      eligibility:
        "Adults 18+, EGFR exon 19 del or L858R mutation, progression on osimertinib, ECOG PS 0-1",
      contact: "Janssen Research & Development — clinicaltrials@its.jnj.com",
    },
    {
      id: "lt2",
      nctId: "NCT04879030",
      title: "Neoadjuvant Nivolumab + Ipilimumab in Resectable NSCLC",
      status: "Active, not recruiting",
      phase: "Phase 2",
      location: "MD Anderson Cancer Center, Houston TX; Memorial Sloan Kettering, New York",
      eligibility: "Resectable stage IB–IIIA NSCLC, no prior systemic therapy, ECOG 0-1",
      contact: "Dr. Sarah Kim, MD — skim@mdanderson.org | (713) 792-6161",
    },
    {
      id: "lt3",
      nctId: "NCT05491642",
      title: "TROPION-Lung08: Datopotamab Deruxtecan + Pembrolizumab for 1L Metastatic NSCLC",
      status: "Recruiting",
      phase: "Phase 3",
      location: "200+ sites globally including UCSF, Johns Hopkins, Mayo Clinic",
      eligibility:
        "Metastatic NSCLC without actionable genomic alterations, PD-L1 ≥1%, no prior systemic therapy",
      contact: "AstraZeneca Global Trial Line — oncologytrials@astrazeneca.com",
    },
    {
      id: "lt4",
      nctId: "NCT04947501",
      title: "SCLC-GO: Tarlatamab (BiTE) in Extensive-Stage Small Cell Lung Cancer",
      status: "Completed",
      phase: "Phase 2",
      location: "Stanford Medical Center, Dana-Farber Cancer Institute, Mayo Clinic",
      eligibility:
        "Extensive-stage SCLC, 2+ prior lines of therapy, adequate organ function",
      contact: "Amgen Clinical Trials — medinfo@amgen.com",
    },
  ],
  summary: {
    conditionOverview:
      "Lung cancer remains the leading cause of cancer-related mortality worldwide, responsible for approximately 1.8 million deaths annually. Non-small cell lung cancer (NSCLC) accounts for ~85% of cases, with adenocarcinoma being the most common histological subtype. Actionable genomic alterations (EGFR, ALK, ROS1, KRAS G12C, HER2, MET) are identified in ~50% of advanced NSCLC cases, enabling precision oncology approaches.",
    keyInsights: [
      "EGFR-targeted therapy (osimertinib) combined with chemotherapy now shows median PFS of 25.5 months vs. 16.7 months with monotherapy alone in EGFR-mutated NSCLC (FLAURA2 trial).",
      "Immunotherapy combinations (pembrolizumab + platinum doublet) remain standard of care for PD-L1 ≥50% NSCLC, with 5-year OS reaching 31.9% in the KEYNOTE-024 trial.",
      "HER2-directed therapy (T-DXd) achieved 57.7% ORR in HER2-mutant NSCLC, representing a new targeted treatment option for this subset.",
      "ctDNA liquid biopsy now enables recurrence detection 70–346 days before CT imaging, revolutionizing surveillance protocols.",
      "CAR-T cell therapies targeting MAGE-A4 show early promise in early-phase trials for MAGE-A4+ lung adenocarcinoma.",
    ],
    treatmentTrends: [
      "Perioperative immunotherapy (neoadjuvant + adjuvant) combinations are increasingly studied for resectable NSCLC.",
      "Bispecific T-cell engagers (BiTE) like tarlatamab showing promise in SCLC post-second line.",
      "KRAS G12C inhibitors (sotorasib, adagrasib) now approved; next-generation combos in development.",
      "Antibody-drug conjugates (ADCs) like datopotamab deruxtecan entering first-line settings.",
      "Consolidation immunotherapy after chemoradiation in Stage III becoming standard of care.",
    ],
    risksNotes: [
      "EGFR TKI resistance remains a major challenge — ~50% develop MET amplification or C797S mutation upon osimertinib progression.",
      "Immune-related adverse events (irAEs) with checkpoint inhibitors require close monitoring, particularly pneumonitis in lung cancer patients.",
      "Interstitial lung disease (ILD) is a class effect of ADCs including T-DXd; reported in ~12% of patients (Grade ≥3 in 3%).",
      "KRAS G12C inhibitor combinations carry risk of SHP2 pathway reactivation requiring sequential targeting strategies.",
    ],
    personalizedInsight:
      "Based on current evidence, patients with EGFR-mutated advanced NSCLC should be considered for osimertinib ± chemotherapy per the FLAURA2 data. For patients without actionable mutations and PD-L1 ≥50%, pembrolizumab monotherapy remains a strong standard. Molecular profiling at diagnosis is essential to identify all actionable alterations and enroll in appropriate clinical trials.",
    sources: [
      "PubMed (pubmed.ncbi.nlm.nih.gov)",
      "OpenAlex (openalex.org)",
      "ClinicalTrials.gov",
      "NEJM, Lancet Oncology, Nature Medicine, Cancer Cell",
    ],
  },
};

const diabetesData: ScenarioData = {
  initialResponse: `I've analyzed **61 recent publications** and **15 active clinical trials** related to **diabetes**. The research landscape shows exciting developments in **GLP-1/GIP dual agonists**, **closed-loop insulin systems**, and **stem cell-derived beta cell therapies**.\n\nExplore the detailed research papers, ongoing trials, and structured AI insights in the right panel.`,
  papers: [
    {
      id: "db1",
      title: "Tirzepatide vs. Semaglutide in Type 2 Diabetes: SURPASS-CVOT Results",
      authors: ["Bhatt DL.", "Nikolaidis LA.", "Del Prato S."],
      year: 2024,
      source: "PubMed",
      journal: "New England Journal of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "Tirzepatide demonstrated superior HbA1c reduction (−2.1% vs −1.9%) and weight loss (−5.5 kg vs −3.1 kg) compared to semaglutide in adults with T2DM. Cardiovascular outcomes were non-inferior.",
    },
    {
      id: "db2",
      title: "Stem Cell-Derived Islet Transplantation in Type 1 Diabetes: Phase 1/2 Trial",
      authors: ["Shapiro AMJ.", "Senior PA.", "Lakey JRT."],
      year: 2024,
      source: "OpenAlex",
      journal: "Cell Stem Cell",
      url: "https://openalex.org/",
      snippet:
        "VX-880 (stem cell-derived islet cells) demonstrated insulin independence in 6 of 12 T1DM patients at 12 months. Represents a potential functional cure approach for Type 1 diabetes.",
    },
    {
      id: "db3",
      title: "Closed-Loop Insulin Delivery System (iLet Bionic Pancreas): 13-Week RCT",
      authors: ["Russell SJ.", "Beck RW.", "Damiano ER."],
      year: 2024,
      source: "PubMed",
      journal: "New England Journal of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "The iLet bionic pancreas achieved significantly lower HbA1c (7.3% vs 8.7%) and more time-in-range (68% vs 48%) vs. standard care in T1DM adults over 13 weeks.",
    },
    {
      id: "db4",
      title: "Semaglutide and Kidney Disease Progression in Type 2 Diabetes",
      authors: ["Perkovic V.", "Tuttle KR.", "Rossing P."],
      year: 2024,
      source: "PubMed",
      journal: "New England Journal of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "FLOW trial: Semaglutide reduced the risk of kidney disease progression and cardiovascular death by 24% vs placebo in T2DM patients with CKD (HR 0.76, 95% CI 0.66–0.88).",
    },
    {
      id: "db5",
      title: "SGLT2 Inhibitors in Non-Diabetic CKD: Mechanisms and Outcomes",
      authors: ["Heerspink HJL.", "Stefánsson BV.", "Correa-Rotter R."],
      year: 2023,
      source: "OpenAlex",
      journal: "Lancet",
      url: "https://openalex.org/",
      snippet:
        "Dapagliflozin reduced kidney failure risk by 39% in CKD patients independent of diabetes status, establishing a new paradigm for nephroprotection beyond glycemic control.",
    },
    {
      id: "db6",
      title: "Gut Microbiome Modulation as a Treatment Strategy for Type 2 Diabetes",
      authors: ["Zhao L.", "Zhang F.", "Ding X."],
      year: 2023,
      source: "PubMed",
      journal: "Science",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "A dietary intervention promoting specific gut bacteria (short-chain fatty acid producers) improved glycemic control (HbA1c −1.04% vs −0.32%) more effectively than standard diet in T2DM.",
    },
  ],
  trials: [
    {
      id: "dt1",
      nctId: "NCT05893225",
      title: "REDEFINE 1: Retatrutide (Triple GIP/GLP-1/Glucagon Agonist) in Obesity + T2DM",
      status: "Recruiting",
      phase: "Phase 3",
      location: "Eli Lilly trial sites: 180+ centers in USA, EU, Latin America",
      eligibility: "Adults 18–75 with T2DM, BMI ≥27, HbA1c 7.0–10.5%, stable background therapy",
      contact: "Eli Lilly Clinical Trials — 1-800-545-6962 | www.lillytrialguide.com",
    },
    {
      id: "dt2",
      nctId: "NCT04848467",
      title: "VX-880 Stem Cell-Derived Islets in T1DM (Expansion Cohort)",
      status: "Recruiting",
      phase: "Phase 1/2",
      location: "University of Minnesota, University of Alberta, Leiden University Medical Center",
      eligibility:
        "T1DM for ≥5 years, recurrent severe hypoglycemia, undetectable C-peptide, ages 18–65",
      contact: "Vertex Pharmaceuticals — clinicalinfo@vrtx.com",
    },
    {
      id: "dt3",
      nctId: "NCT05647148",
      title: "CGM-Guided Insulin Titration Algorithm in T2DM Primary Care Settings",
      status: "Active, not recruiting",
      phase: "Phase 4",
      location: "Primary care centers across California, Texas, and New York",
      eligibility:
        "T2DM on basal insulin, HbA1c 8.0–12.0%, no history of severe hypoglycemia",
      contact: "UCSF Diabetes Center — diabetes-research@ucsf.edu | (415) 353-2350",
    },
    {
      id: "dt4",
      nctId: "NCT04836819",
      title: "Fecal Microbiota Transplantation for Glycemic Improvement in T2DM",
      status: "Completed",
      phase: "Phase 2",
      location: "Amsterdam University Medical Centers, Mayo Clinic Rochester",
      eligibility: "T2DM, HbA1c 7.5–10.0%, on metformin ± 1 oral agent, BMI 25–40",
      contact: "Dr. Max Nieuwdorp — m.nieuwdorp@amsterdamumc.nl",
    },
  ],
  summary: {
    conditionOverview:
      "Diabetes mellitus affects over 537 million adults globally (IDF 2021), projected to reach 783 million by 2045. Type 2 diabetes (T2DM) accounts for 90–95% of cases and is driven by insulin resistance and progressive beta-cell dysfunction. Type 1 diabetes (T1DM) is an autoimmune condition affecting ~8.4 million worldwide. Both forms carry substantial risks of microvascular (retinopathy, nephropathy, neuropathy) and macrovascular (CVD, stroke) complications.",
    keyInsights: [
      "Tirzepatide (GIP/GLP-1 dual agonist) demonstrates superior HbA1c reduction (−2.1%) and weight loss vs. semaglutide, with FDA approval for T2DM and obesity.",
      "Stem cell-derived islet transplantation (VX-880) achieved insulin independence in 50% of T1DM patients in Phase 1/2 trials, representing a potential functional cure.",
      "The FLOW trial established semaglutide as the first GLP-1 RA to show kidney protection in T2DM with CKD, reducing progression risk by 24%.",
      "Closed-loop insulin delivery (bionic pancreas) achieved 68% time-in-range vs. 48% with standard care in T1DM, with simplified user operation.",
      "Gut microbiome modulation through dietary fiber intervention improved HbA1c significantly more than standard dietary advice alone.",
    ],
    treatmentTrends: [
      "Triple agonists (GIP/GLP-1/glucagon) like retatrutide showing 24% body weight reduction in Phase 2 — entering Phase 3.",
      "Cardiorenal protection now driving treatment algorithm; SGLT2i + GLP-1 RA combination as preferred backbone for T2DM with high CV risk.",
      "Closed-loop automated insulin delivery expanding to toddlers/children; next-gen systems integrate multiple hormones (glucagon).",
      "Oral semaglutide gaining ground; oral insulin formulations in late-stage development.",
      "Immunotherapy (anti-CD3, anti-CD20) for T1DM showing early promise in preserving beta-cell function at diagnosis.",
    ],
    risksNotes: [
      "GLP-1 RAs associated with nausea/vomiting (20–40% incidence) and rare pancreatitis risk; contraindicated in personal/family history of MTC.",
      "SGLT2 inhibitors carry risks of DKA (rare), urinary tract infections, and Fournier's gangrene; require adequate hydration.",
      "Continuous glucose monitors require calibration and can overestimate/underestimate glucose in rapid-change scenarios.",
      "Stem cell therapy carries immunosuppression requirements, increasing infection risk; long-term safety data still needed.",
    ],
    personalizedInsight:
      "For patients with T2DM and established CVD or CKD, current evidence strongly supports GLP-1 RA or SGLT2i as second-line agents after metformin for cardiorenal protection. For T2DM with primary goal of weight loss, tirzepatide shows superior outcomes. T1DM patients should be considered for CGM and closed-loop insulin delivery systems, and may be candidates for stem cell therapy trials if recurrent severe hypoglycemia is present.",
    sources: [
      "PubMed (pubmed.ncbi.nlm.nih.gov)",
      "OpenAlex (openalex.org)",
      "ClinicalTrials.gov",
      "NEJM, Lancet, Cell Stem Cell, Science",
    ],
  },
};

const alzheimerData: ScenarioData = {
  initialResponse: `My analysis of **53 publications** and **9 active clinical trials** reveals a rapidly evolving landscape for **Alzheimer's disease** research. The approval of **lecanemab** and **donanemab** marks a paradigm shift — for the first time, disease-modifying therapies are available for early Alzheimer's.\n\nSee the full breakdown of research findings, ongoing trials, and structured AI analysis in the insights panel.`,
  papers: [
    {
      id: "az1",
      title: "Lecanemab in Early Alzheimer's Disease: 18-Month CLARITY AD Results",
      authors: ["van Dyck CH.", "Swanson CJ.", "Aisen P."],
      year: 2023,
      source: "PubMed",
      journal: "New England Journal of Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "Lecanemab reduced clinical decline by 27% vs. placebo (CDR-SB 1.21 vs 1.66) and reduced amyloid burden by −1.305 centiloids at 18 months in early AD, supporting disease-modification.",
    },
    {
      id: "az2",
      title: "Donanemab in Early Symptomatic Alzheimer's Disease: TRAILBLAZER-ALZ 2",
      authors: ["Sims JR.", "Zimmer JA.", "Evans CD."],
      year: 2023,
      source: "PubMed",
      journal: "JAMA",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "Donanemab slowed cognitive decline by 35% on iADRS vs. placebo in participants with low/medium tau pathology. Complete amyloid clearance achieved in 40% of participants by 12 months.",
    },
    {
      id: "az3",
      title: "Blood-Based Biomarkers for Alzheimer's Disease: Plasma p-tau217 Validation",
      authors: ["Hansson O.", "Edelmayer RM.", "Boxer AL."],
      year: 2024,
      source: "OpenAlex",
      journal: "Lancet Neurology",
      url: "https://openalex.org/",
      snippet:
        "Plasma p-tau217 demonstrated 96% accuracy in identifying amyloid pathology (vs. PET/CSF), with the potential to replace invasive/expensive diagnostics in primary care settings.",
    },
    {
      id: "az4",
      title: "GLP-1 Receptor Agonists and Alzheimer's Risk in Type 2 Diabetes Cohort",
      authors: ["Wang W.", "Zhao F.", "Zhang Z."],
      year: 2024,
      source: "PubMed",
      journal: "Alzheimer's & Dementia",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "GLP-1 RA use in T2DM was associated with 33% reduced risk of Alzheimer's diagnosis (HR 0.67, 95% CI 0.58–0.77), suggesting neuroprotective mechanisms beyond glucose control.",
    },
    {
      id: "az5",
      title: "APOE4 and Amyloid-Related Imaging Abnormalities: Risk Stratification",
      authors: ["Villain N.", "Planche V.", "Vallières E."],
      year: 2023,
      source: "OpenAlex",
      journal: "Nature Medicine",
      url: "https://openalex.org/",
      snippet:
        "APOE4 homozygotes have 3.5× higher ARIA-E risk with anti-amyloid therapies. New dosing protocols with MRI monitoring significantly reduce serious ARIA events in high-risk patients.",
    },
    {
      id: "az6",
      title: "Tau PET Staging and Disease Progression Prediction in Alzheimer's Continuum",
      authors: ["Ossenkoppele R.", "Binette AP.", "Groot C."],
      year: 2023,
      source: "PubMed",
      journal: "Nature Medicine",
      url: "https://pubmed.ncbi.nlm.nih.gov/",
      snippet:
        "A new tau PET staging system (1–4) precisely predicted conversion from MCI to dementia and rates of cognitive decline, enabling better patient selection for clinical trials.",
    },
  ],
  trials: [
    {
      id: "at1",
      nctId: "NCT05026866",
      title: "A45: Prevention Trial of Lecanemab in APOE4/4 Carriers Without Symptoms",
      status: "Recruiting",
      phase: "Phase 3",
      location: "95+ sites across USA, Europe, Australia, Japan",
      eligibility:
        "Cognitively unimpaired APOE4/4 homozygotes, ages 55–80, elevated amyloid on PET or CSF",
      contact: "Eisai US — clinicaltrials@eisai.com | 1-888-422-4743",
    },
    {
      id: "at2",
      nctId: "NCT04576091",
      title: "AHEAD 3-45: Combination Lecanemab in Amyloid-Positive Preclinical AD",
      status: "Active, not recruiting",
      phase: "Phase 3",
      location: "Brigham & Women's Hospital, Mayo Clinic, Washington University in St. Louis",
      eligibility:
        "Ages 55–80, cognitively unimpaired, intermediate-high amyloid by PET, no contraindications to MRI",
      contact: "Dr. Reisa Sperling — rsperling@bwh.harvard.edu",
    },
    {
      id: "at3",
      nctId: "NCT06068816",
      title: "LZHEIMER-1: Semaglutide for Mild-Moderate Alzheimer's Disease",
      status: "Recruiting",
      phase: "Phase 2/3",
      location: "UCL Dementia Research Centre, Johns Hopkins Memory Clinic, UCSF Memory & Aging",
      eligibility:
        "Mild-moderate AD (MMSE 14–26), no T2DM, age 50–85, stable medications for ≥3 months",
      contact: "Novo Nordisk Trials — NN-Alzheimer-trial@novonordisk.com",
    },
    {
      id: "at4",
      nctId: "NCT04767360",
      title: "Donanemab Sub-cutaneous Formulation vs. IV: Bioequivalence Study",
      status: "Completed",
      phase: "Phase 1",
      location: "Eli Lilly Phase 1 Units: Indianapolis, Berlin, Tokyo",
      eligibility: "Early symptomatic AD, amyloid+, MMSE 20–28, no prior anti-amyloid therapy",
      contact: "Eli Lilly — lillytrialguide.com | 1-800-545-6962",
    },
  ],
  summary: {
    conditionOverview:
      "Alzheimer's disease (AD) is the most common cause of dementia, affecting ~55 million people worldwide. It is characterized by the accumulation of amyloid-β plaques and tau neurofibrillary tangles, leading to progressive neurodegeneration and cognitive decline. The 2024 NIA-AA revised criteria now support a purely biological definition of AD based on biomarkers, enabling earlier and more precise diagnosis.",
    keyInsights: [
      "Lecanemab (Leqembi) became the first FDA-approved disease-modifying therapy for early AD in January 2023, slowing decline by 27% on CDR-SB at 18 months.",
      "Donanemab showed 35% slowing of decline in low/medium tau patients and achieved complete amyloid clearance in 40% by 12 months, supporting cessation of therapy upon plaque removal.",
      "Plasma p-tau217 now offers 96% accuracy for amyloid detection, potentially replacing costly PET scans and invasive CSF testing in diagnostic workup.",
      "GLP-1 receptor agonists (semaglutide, liraglutide) are associated with 33% reduced AD risk in T2DM cohorts, triggering multiple prevention trials.",
      "New tau PET staging system precisely predicts conversion from MCI to dementia, improving clinical trial design and patient stratification.",
    ],
    treatmentTrends: [
      "Prevention trials in pre-symptomatic amyloid-positive individuals now underway — shifting treatment paradigm toward primary prevention.",
      "Combination amyloid + tau targeting emerging as next frontier; several bispecific antibodies in Phase 1/2.",
      "GLP-1 RAs repurposed for AD neuroinflammation and synaptic protection trials across multiple Phase 2/3 studies.",
      "Blood-based biomarker diagnostics (p-tau217, GFAP) being validated for primary care screening worldwide.",
      "Gene therapy targeting APOE4 modification and tau propagation in early Phase 1 testing.",
    ],
    risksNotes: [
      "Amyloid-related imaging abnormalities (ARIA-E/H) occur in 21–36% of lecanemab-treated patients; serious in ~3%. APOE4 carriers at significantly higher risk.",
      "Anti-amyloid therapies require pre-treatment amyloid confirmation (PET or CSF) and regular MRI monitoring every 6 months.",
      "Benefit is established only for Early AD (MCI/mild dementia); no evidence of efficacy in moderate-to-severe disease.",
      "Long-term safety beyond 18 months and durability of effect after treatment discontinuation remain under investigation.",
    ],
    personalizedInsight:
      "Patients with early symptomatic AD (MCI or mild dementia) who are amyloid-positive on PET or CSF should be evaluated for lecanemab or donanemab eligibility. APOE4 genotyping is recommended before initiating anti-amyloid therapy given the increased ARIA risk in homozygotes. All eligible patients should be encouraged to enroll in prevention trials given the evolving landscape.",
    sources: [
      "PubMed (pubmed.ncbi.nlm.nih.gov)",
      "OpenAlex (openalex.org)",
      "ClinicalTrials.gov",
      "NEJM, JAMA, Lancet Neurology, Nature Medicine, Alzheimer's & Dementia",
    ],
  },
};

const defaultData: ScenarioData = {
  initialResponse: `I've analyzed the latest research on **{DISEASE}** from PubMed, OpenAlex, and ClinicalTrials.gov. Below is a structured overview of current evidence, ongoing trials, and key clinical insights.\n\nExplore the Research Papers, Clinical Trials, and AI Summary tabs in the insights panel.`,
  papers: lungCancerData.papers,
  trials: lungCancerData.trials,
  summary: lungCancerData.summary,
};

export function getScenarioData(disease: string, query: string): ScenarioData {
  const combined = `${disease} ${query}`.toLowerCase();

  if (
    combined.includes("lung") ||
    combined.includes("nsclc") ||
    combined.includes("sclc") ||
    combined.includes("mesothelioma")
  ) {
    return lungCancerData;
  }

  if (
    combined.includes("diabet") ||
    combined.includes("insulin") ||
    combined.includes("glucose") ||
    combined.includes("hba1c") ||
    combined.includes("glp") ||
    combined.includes("sglt")
  ) {
    return diabetesData;
  }

  if (
    combined.includes("alzheimer") ||
    combined.includes("dementia") ||
    combined.includes("amyloid") ||
    combined.includes("tau") ||
    combined.includes("cognitive")
  ) {
    return alzheimerData;
  }

  // For other queries, return a modified default
  const data = { ...lungCancerData };
  data.initialResponse = defaultData.initialResponse.replace("{DISEASE}", disease || "the condition");
  return data;
}

export type { ScenarioData };

export const followUpResponses: Record<string, string> = {
  default: `Based on our conversation context and the latest research on **{DISEASE}**, here's what the evidence suggests:\n\nThe query you've raised is an active area of investigation. Current publications indicate mixed evidence, but several high-quality RCTs provide useful guidance. I've updated the insights panel with relevant findings.\n\n> **Note:** This information is for research purposes only. Always consult a qualified healthcare professional for medical decisions.`,
  vitaminD: `Regarding **Vitamin D** and **{DISEASE}**:\n\n📊 A 2024 meta-analysis (NEJM) found that Vitamin D supplementation (2000 IU/day) showed modest benefits in reducing inflammatory markers but did not significantly alter primary disease outcomes.\n\n**Key Points:**\n- Vitamin D deficiency is common in patients with {DISEASE}\n- Supplementation to achieve serum levels >30 ng/mL is generally recommended\n- Evidence for disease modification remains insufficient (Grade B evidence)\n\n⚠️ Consult your oncologist/specialist before starting supplementation.`,
  treatment: `The current **treatment landscape for {DISEASE}** has evolved significantly:\n\n**First-line options** (2024 guidelines):\n1. Standard-of-care regimens per NCCN/ESMO guidelines\n2. Targeted therapy for eligible biomarker-positive patients\n3. Clinical trial enrollment when available\n\n**Emerging approaches:**\n- Combination immunotherapy strategies\n- ADC-based regimens showing promise\n- Precision medicine guided by ctDNA profiling\n\nReviewed from: PubMed, NCCN 2024 Guidelines, ESMO Congress 2024`,
  sideEffects: `**Managing side effects** in {DISEASE} treatment:\n\n| Side Effect | Frequency | Management |\n|---|---|---|\n| Fatigue | 60–80% | Graded exercise, sleep hygiene |\n| Nausea | 30–50% | Antiemetics, dietary modification |\n| Immunotoxicity | 15–25% | Corticosteroids, hold therapy |\n| Neuropathy | 20–35% | Dose reduction, duloxetine |\n\n> Always report new or worsening symptoms to your care team promptly.`,
};
