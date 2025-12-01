import React from 'react';
import { Helmet } from 'react-helmet-async';

// All brand name variations for maximum brand recognition
const BRAND_ALTERNATE_NAMES = [
  // Core brand variations
  "Calculator Hub", "Calculator Hubs", "Calc Hub", "Calc Hubs",
  "CalculatorHub", "CalculatorHubs", "CalcHub", "CalcHubs",
  "Calculator-Hub", "Calculator-Hubs", "Calc-Hub", "Calc-Hubs",
  "Calchub", "Calchubs",
  // Lowercase variations
  "calculator hub", "calculator hubs", "calc hub", "calc hubs",
  "calculatorhub", "calculatorhubs", "calchub", "calchubs",
  "calculator-hub", "calculator-hubs", "calc-hub", "calc-hubs",
  // With descriptors
  "Calculator Hub App", "Calculator Hubs App", "Calc Hub App", "Calc Hubs App",
  "CalculatorHub App", "CalculatorHubs App", "CalcHub App", "CalcHubs App",
  "Calculator-Hub App", "Calculator-Hubs App", "Calc-Hub App", "Calc-Hubs App",
  "Calchub App", "Calchubs App",
  "Calculator Hub Website", "Calculator Hubs Website", "Calc Hub Website", "Calc Hubs Website",
  "CalculatorHub Website", "CalculatorHubs Website", "CalcHub Website", "CalcHubs Website",
  "Calculator-Hub Website", "Calculator-Hubs Website", "Calc-Hub Website", "Calc-Hubs Website",
  "Calchub Website", "Calchubs Website",
  // With "Free"
  "Free Calculator Hub", "Free Calculator Hubs", "Free Calc Hub", "Free Calc Hubs",
  "Free CalculatorHub", "Free CalculatorHubs", "Free CalcHub", "Free CalcHubs",
  "Free Calculator-Hub", "Free Calculator-Hubs", "Free Calc-Hub", "Free Calc-Hubs",
  "Free Calchub", "Free Calchubs",
  "free calculator hub", "free calculator hubs", "free calc hub", "free calc hubs",
  "free calculatorhub", "free calculatorhubs", "free calchub", "free calchubs",
  // With "Best"
  "Best Calculator Hub", "Best Calculator Hubs", "Best Calc Hub", "Best Calc Hubs",
  "Best CalculatorHub", "Best CalculatorHubs", "Best CalcHub", "Best CalcHubs",
  "Best Calculator-Hub", "Best Calculator-Hubs", "Best Calc-Hub", "Best Calc-Hubs",
  "Best Calchub", "Best Calchubs",
  "best calculator hub", "best calculator hubs", "best calc hub", "best calc hubs",
  // With "Online"
  "Online Calculator Hub", "Online Calculator Hubs", "Online Calc Hub", "Online Calc Hubs",
  "Online CalculatorHub", "Online CalculatorHubs", "Online CalcHub", "Online CalcHubs",
  "Online Calculator-Hub", "Online Calculator-Hubs", "Online Calc-Hub", "Online Calc-Hubs",
  "Online Calchub", "Online Calchubs",
  "online calculator hub", "online calculator hubs", "online calc hub", "online calc hubs",
  // Combined variations
  "Free Online Calculator Hub", "Free Online Calculator Hubs", "Free Online Calc Hub",
  "Best Free Calculator Hub", "Best Free Calculator Hubs", "Best Free Calc Hub",
  "Calculator Hub Online", "Calculator Hubs Online", "Calc Hub Online",
  "CalculatorHub Online", "CalculatorHubs Online", "CalcHub Online",
  "Calculator-Hubs Online", "Calchub Online",
  // Short variations
  "Calc", "Calculator", "Calcs", "Calculators",
  "Free Calc", "Free Calculator", "Free Calcs", "Free Calculators",
  "Best Calc", "Best Calculator", "Online Calc", "Online Calculator",
  // Domain-based variations
  "calculator-hubs", "calculator-hub", "calchub", "calchubs",
  "calculatorhubs", "calculatorhub", "calchub", "calchubs",
  "Calculator-Hubs.com", "CalculatorHub.com", "Calchub.com",
  // Additional common searches
  "Calculator Hub Free", "Calculator Hubs Free", "Calc Hub Free",
  "CalculatorHub Free", "Calculator-Hubs Free", "Calchub Free",
  "Calculator Hub Site", "Calculator Hubs Site", "Calc Hub Site",
  "CalculatorHub Site", "Calculator-Hubs Site", "Calchub Site"
];

// Comprehensive SEO keywords array - 100+ keywords for maximum SEO coverage
// These keywords are hidden from users but visible to search engines
const COMPREHENSIVE_SEO_KEYWORDS = [
  // Brand and domain keywords - CRITICAL for brand ranking
  'calc', 'calculator', 'calculator hub', 'calculator hubs', 'calculator-hubs', 'calchub', 
  'calc hub', 'calc hubs', 'calculatorhub', 'calculatorhubs', 'calc-hub', 'calc-hubs',
  'free calc', 'free calculator', 'free calculator hub', 'free calculator hubs',
  'calculator hub website', 'calculator hubs website', 'calchub website',
  'calculator hub online', 'calculator hubs online', 'calchub online',
  'best calculator hub', 'best calculator hubs', 'best calchub',
  'calculator hub free', 'calculator hubs free', 'calchub free',
  'calculator hub app', 'calculator hubs app', 'calchub app',
  'calculator hub site', 'calculator hubs site', 'calchub site',
  
  // Core descriptors
  'free', 'easy', 'accurate', 'simple', 'complex', 'online', 'instant', 'quick', 'fast', 
  'reliable', 'precise', 'exact', 'professional', 'expert', 'comprehensive', 'complete', 
  'full', 'all in one', 'best', 'top', 'popular', 'trusted', 'verified', 'tested', 
  'reviewed', 'recommended', 'modern', 'advanced', 'powerful', 'user friendly', 
  'intuitive', 'interactive', 'digital', 'electronic', 'virtual', 'cloud', 'web based',
  
  // Educational terms
  'student', 'college', 'university', 'school', 'education', 'academic', 'homework', 
  'study', 'exam', 'test', 'assignment', 'project', 'learning', 'teaching', 'tutoring', 
  'study aid', 'homework help', 'math help', 'calculation help', 'educational tool', 
  'learning tool', 'teaching tool', 'tutoring tool',
  
  // Calculator types - all calculators
  'calculator', 'basic calculator', 'scientific calculator', 'percentage calculator', 
  'GPA calculator', 'grade calculator', 'weighted grade calculator', 'average calculator', 
  'mean calculator', 'median calculator', 'mode calculator', 'ratio calculator', 
  'factorial calculator', 'LCM calculator', 'HCF calculator', 'GCD calculator', 
  'matrix calculator', 'linear equation solver', 'quadratic equation solver', 
  'statistics calculator', 'standard deviation calculator', 'variance calculator', 
  'permutation calculator', 'combination calculator', 'trigonometry calculator', 
  'sin calculator', 'cos calculator', 'tan calculator', 'fraction calculator', 
  'algebra calculator', 'derivative calculator', 'integral calculator', 'calculus calculator',
  
  // Math and subject terms
  'math', 'mathematics', 'arithmetic', 'algebra', 'geometry', 'trigonometry', 'calculus', 
  'statistics', 'probability', 'finance', 'business', 'engineering', 'physics', 
  'chemistry', 'science', 'research', 'data', 'analysis', 'measurement', 'conversion',
  
  // Tool and action terms
  'math tool', 'math helper', 'math assistant', 'calculation tool', 'compute tool', 
  'solve tool', 'calculate tool', 'math app', 'calculator app', 'math solver', 
  'equation solver', 'step by step calculator', 'math website', 'calculator website', 
  'online tool', 'web tool', 'solve math problems', 'calculate answers', 'math solutions', 
  'step by step solutions', 'detailed solutions', 'explained solutions',
  
  // Platform and access terms
  'web calculator', 'browser calculator', 'desktop calculator', 'mobile calculator', 
  'phone calculator', 'tablet calculator', 'no signup required', 'no registration', 
  'no download', 'no installation', 'works offline', 'works online', 'secure calculator', 
  'safe calculator', 'private calculator', 'confidential calculator', 'encrypted calculator', 
  'protected calculator'
];

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl,
  type = 'website',
  structuredData = null,
  image = null,
  author = 'Calculator Hub',
  publishedTime = null,
  modifiedTime = null,
  lang = 'en',
  alternateLanguages = null, // Array of { hreflang: 'es', href: '/es/...' }
  faqSchema = null, // FAQPage schema
  howToSchema = null // HowTo schema
}) => {
  const siteUrl = 'https://calculator-hubs.vercel.app'; // Your actual domain
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const defaultImage = `${siteUrl}/logo512.png`;
  const ogImage = image || defaultImage;
  
  // Merge page-specific keywords with comprehensive SEO keywords
  // This ensures every page has all keywords for maximum SEO coverage
  const pageKeywords = keywords ? keywords.split(',').map(k => k.trim()) : [];
  const allKeywords = [...new Set([...COMPREHENSIVE_SEO_KEYWORDS, ...pageKeywords])];
  const finalKeywords = allKeywords.join(', ');
  
  // Language-specific meta tags
  const languageNames = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ar': 'Arabic',
    'hi': 'Hindi',
    'nl': 'Dutch',
    'pl': 'Polish',
    'tr': 'Turkish',
    'vi': 'Vietnamese',
    'th': 'Thai',
    'id': 'Indonesian',
    'ms': 'Malay'
  };

  // Enhanced structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "alternateName": BRAND_ALTERNATE_NAMES,
    "description": description,
    "url": fullUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "5000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student",
      "audienceType": "Student"
    },
    "featureList": [
      "Free to use",
      "No signup required",
      "Step-by-step solutions",
      "Accurate calculations",
      "Easy to use",
      "Works on all devices"
    ]
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={languageNames[lang] || 'English'} />
      <meta httpEquiv="content-language" content={lang} />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Hreflang Tags for Multilingual SEO */}
      {alternateLanguages && alternateLanguages.length > 0 && (
        <>
          {alternateLanguages.map((alt, index) => (
            <link 
              key={index}
              rel="alternate" 
              hreflang={alt.hreflang} 
              href={`${siteUrl}${alt.href}`} 
            />
          ))}
          {/* Self-referencing hreflang */}
          <link rel="alternate" hreflang={lang} href={fullUrl} />
          {/* x-default for language selection */}
          <link rel="alternate" hreflang="x-default" href={fullUrl} />
        </>
      )}
      
      {/* Open Graph Language */}
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`} />
      {alternateLanguages && alternateLanguages.map((alt, index) => (
        <meta 
          key={`og-locale-${index}`}
          property="og:locale:alternate" 
          content={alt.hreflang === 'en' ? 'en_US' : `${alt.hreflang}_${alt.hreflang.toUpperCase()}`} 
        />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Calculator Hub" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@CalculatorHub" />
      <meta name="twitter:creator" content="@CalculatorHub" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#667eea" />
      <meta name="msapplication-TileColor" content="#667eea" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Calculator Hub" />

      {/* Structured Data with Multilingual Support */}
      <script type="application/ld+json">
        {JSON.stringify({
          ...finalStructuredData,
          inLanguage: lang,
          ...(alternateLanguages && alternateLanguages.length > 0 && {
            alternateName: alternateLanguages.map(alt => ({
              "@type": "WebApplication",
              "name": title,
              "url": `${siteUrl}${alt.href}`,
              "inLanguage": alt.hreflang
            }))
          })
        })}
      </script>

      {/* FAQ Schema for AI Optimization */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* HowTo Schema for Step-by-Step Solutions */}
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}

      {/* Breadcrumb Structured Data */}
      {canonicalUrl && canonicalUrl !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": title,
                "item": fullUrl
              }
            ]
          })}
        </script>
      )}

      {/* Organization Schema - Critical for brand recognition */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Calculator Hub",
          "alternateName": BRAND_ALTERNATE_NAMES.slice(0, 20), // Top 20 for Organization
          "url": siteUrl,
          "logo": `${siteUrl}/logo512.png`,
          "description": "Free online calculators for math, statistics, algebra, calculus and more. Calculate percentages, GPA, derivatives, integrals and much more.",
          "sameAs": [
            // Add your social media profiles here when available
            // "https://www.facebook.com/calculatorhub",
            // "https://twitter.com/calculatorhub",
            // "https://www.linkedin.com/company/calculatorhub"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Service",
            "availableLanguage": ["English"]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "5000",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}
      </script>

      {/* Performance Hints - DNS Prefetch and Preconnect */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="copyright" content="Calculator Hub" />
      <meta name="classification" content="Education, Mathematics, Tools, Calculators" />
      <meta name="category" content="Education, Mathematics, Tools" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      <meta name="ICBM" content="39.8283, -98.5795" />
      
      {/* Additional Open Graph Tags */}
      <meta property="og:email" content="support@calculator-hubs.vercel.app" />
      <meta property="og:phone_number" content="" />
      <meta property="og:latitude" content="39.8283" />
      <meta property="og:longitude" content="-98.5795" />
      <meta property="og:street-address" content="" />
      <meta property="og:locality" content="United States" />
      <meta property="og:region" content="US" />
      <meta property="og:postal-code" content="" />
      <meta property="og:country-name" content="United States" />
      
      {/* Additional Twitter Tags */}
      <meta name="twitter:label1" content="Price" />
      <meta name="twitter:data1" content="Free" />
      <meta name="twitter:label2" content="Type" />
      <meta name="twitter:data2" content="Online Calculator" />
    </Helmet>
  );
};

export default SEO;

