export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "name": "Volley Club Trieste",
    "alternateName": "VCT",
    "url": "https://www.volleyclub.it",
    "logo": "https://www.volleyclub.it/images/vc-logo.png",
    "description": "Associazione Sportiva Dilettantistica di pallavolo a Trieste dal 1976. Serie D maschile e femminile, Prima Divisione e settore giovanile.",
    "foundingDate": "1976",
    "sport": "Volleyball",
    "memberOf": {
      "@type": "SportsOrganization",
      "name": "FIPAV - Federazione Italiana Pallavolo",
      "identifier": "70310028"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via della Valle, 3",
      "addressLocality": "Trieste",
      "postalCode": "34124",
      "addressRegion": "Friuli Venezia Giulia",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.661695",
      "longitude": "13.769878"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+39-380-5245982",
      "contactType": "Customer Service",
      "email": "Marcorigutti@gmail.com",
      "availableLanguage": ["Italian"]
    },
    "sameAs": [
      // Aggiungi qui i link ai social media quando disponibili
      // "https://www.facebook.com/volleyclubtrieste",
      // "https://www.instagram.com/volleyclubtrieste",
    ],
    "areaServed": {
      "@type": "City",
      "name": "Trieste"
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Volley Club Trieste",
    "image": "https://www.volleyclub.it/images/vc-logo.png",
    "url": "https://www.volleyclub.it",
    "telephone": "+39-380-5245982",
    "email": "Marcorigutti@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Via della Valle, 3",
      "addressLocality": "Trieste",
      "postalCode": "34124",
      "addressRegion": "Friuli Venezia Giulia",
      "addressCountry": "IT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.661695",
      "longitude": "13.769878"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "17:00",
        "closes": "22:00"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  )
}
