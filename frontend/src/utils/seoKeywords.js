/**
 * SEO Keywords Utility
 * Centralized keyword management for all calculators
 */

// Modifier keywords (CRITICAL - use in all titles/descriptions)
export const MODIFIER_KEYWORDS = {
  primary: ['free', 'online', 'easy', 'best', 'accurate', 'fast'],
  secondary: ['simple', 'quick', 'instant', 'reliable', 'professional', 'advanced'],
  quality: ['precise', 'powerful', 'comprehensive', 'user-friendly', 'trusted']
};

// Audience keywords (CRITICAL - target specific users)
export const AUDIENCE_KEYWORDS = {
  students: ['for students', 'for college', 'for school', 'for university', 'for homework'],
  teachers: ['for teachers', 'for educators', 'for professors'],
  professionals: ['for professionals', 'for engineers', 'for accountants', 'for analysts'],
  academics: ['for academics', 'for researchers', 'for scientists']
};

// Action keywords
export const ACTION_KEYWORDS = [
  'calculate', 'compute', 'solve', 'find', 'determine', 
  'convert', 'evaluate', 'analyze', 'measure'
];

// Generate optimized title
export const generateSEOTitle = (calculatorName, type = 'calculator', audience = 'students') => {
  const audienceKeyword = AUDIENCE_KEYWORDS[audience]?.[0] || 'for everyone';
  
  return `FREE ${calculatorName} - Best, Easy & Accurate ${type} ${audienceKeyword} | Calculator Hub`;
};

// Generate optimized meta description
export const generateSEODescription = (calculatorName, functionDescription, audience = 'students') => {
  const audienceKeyword = AUDIENCE_KEYWORDS[audience]?.[0] || 'for everyone';
  
  return `FREE ${calculatorName.toLowerCase()} - Best, easy, and accurate online ${calculatorName.toLowerCase()} ${audienceKeyword}. ${functionDescription} instantly with step-by-step solutions. No signup required!`;
};

// Generate keywords string
export const generateKeywords = (calculatorName, type, audience = 'students') => {
  const baseKeywords = [
    `${calculatorName.toLowerCase()} calculator`,
    `free ${calculatorName.toLowerCase()} calculator`,
    `online ${calculatorName.toLowerCase()} calculator`,
    `easy ${calculatorName.toLowerCase()} calculator`,
    `best ${calculatorName.toLowerCase()} calculator`,
    `accurate ${calculatorName.toLowerCase()} calculator`,
    `${calculatorName.toLowerCase()} calculator ${audience}`,
    `free online ${type} calculator`,
    `calculate ${calculatorName.toLowerCase()}`,
    `${calculatorName.toLowerCase()} tool`
  ];
  
  // Add audience-specific keywords
  if (audience === 'students') {
    baseKeywords.push(
      `${calculatorName.toLowerCase()} calculator for students`,
      `${calculatorName.toLowerCase()} calculator for college`,
      `free ${calculatorName.toLowerCase()} calculator for homework`
    );
  }
  
  return baseKeywords.join(', ');
};

// Calculator-specific keyword sets
export const CALCULATOR_KEYWORDS = {
  percentage: {
    primary: ['percentage calculator', 'percent calculator', 'percentage finder'],
    modifiers: ['free percentage calculator', 'easy percentage calculator', 'best percentage calculator'],
    audience: ['percentage calculator for students', 'percentage calculator for college'],
    longTail: [
      'free online percentage calculator for students',
      'how to calculate percentage',
      'percentage increase calculator',
      'percentage decrease calculator',
      'what is percentage calculator'
    ]
  },
  gpa: {
    primary: ['GPA calculator', 'grade point average calculator', 'GPA finder'],
    modifiers: ['free GPA calculator', 'easy GPA calculator', 'best GPA calculator'],
    audience: ['GPA calculator for students', 'GPA calculator for college', 'college GPA calculator'],
    longTail: [
      'free GPA calculator for college students',
      'how to calculate GPA',
      'cumulative GPA calculator',
      'semester GPA calculator',
      'weighted GPA calculator'
    ]
  },
  basic: {
    primary: ['scientific calculator', 'math calculator', 'calculator online'],
    modifiers: ['free calculator', 'easy calculator', 'best calculator'],
    audience: ['calculator for students', 'calculator for school', 'calculator for homework'],
    longTail: [
      'free online scientific calculator',
      'best calculator for students',
      'easy calculator for beginners',
      'math calculator online free'
    ]
  }
};

// FAQ questions for AI optimization
export const FAQ_TEMPLATES = {
  what: (calculatorName) => `What is a ${calculatorName.toLowerCase()}?`,
  how: (calculatorName) => `How to use ${calculatorName.toLowerCase()}?`,
  why: (calculatorName) => `Why use our ${calculatorName.toLowerCase()}?`,
  free: () => `Is this calculator free to use?`,
  accurate: () => `Is this calculator accurate?`,
  signup: () => `Do I need to sign up to use this calculator?`
};

// Generate FAQ schema
export const generateFAQSchema = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

// Generate HowTo schema for step-by-step solutions
export const generateHowToSchema = (calculatorName, steps) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to Use ${calculatorName}`,
    "description": `Step-by-step guide to using ${calculatorName}`,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.description,
      "url": step.url || ""
    }))
  };
};

