import React from 'react';
import { Helmet } from 'react-helmet-async';

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
  const siteUrl = 'https://yourdomain.com'; // Replace with your actual domain
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const defaultImage = `${siteUrl}/logo512.png`;
  const ogImage = image || defaultImage;
  
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
      <meta name="keywords" content={keywords} />
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
    </Helmet>
  );
};

export default SEO;

