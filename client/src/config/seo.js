// SEO Configuration for Luxury Apartments Accra

export const siteConfig = {
  name: 'Luxury Apartments Accra',
  url: 'https://luxuryapartmentsaccra.com',
  description: 'Experience luxury living in Accra, Ghana. Premium apartments with world-class amenities, 24/7 service, and stunning city views.',
  keywords: 'luxury apartments accra, premium accommodation ghana, luxury rental accra, high-end apartments ghana, luxury living accra, premium hospitality ghana',
  image: '/og-image.jpg',
  logo: '/logo.png',
  phone: '+233-20-123-4567',
  email: 'info@luxuryapartmentsaccra.com',
  address: {
    street: '123 Luxury Avenue',
    city: 'Accra',
    region: 'Greater Accra',
    country: 'Ghana',
    postalCode: '00233'
  },
  coordinates: {
    latitude: 5.5600,
    longitude: -0.2057
  },
  social: {
    facebook: 'https://www.facebook.com/luxuryapartmentsaccra',
    instagram: 'https://www.instagram.com/luxuryapartmentsaccra',
    linkedin: 'https://www.linkedin.com/company/luxuryapartmentsaccra',
    twitter: 'https://twitter.com/luxuryapartmentsaccra'
  }
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Premium Accommodation in Ghana',
    description: 'Experience luxury living in Accra, Ghana. Premium apartments with world-class amenities, 24/7 service, and stunning city views. Book your luxury stay today.',
    keywords: 'luxury apartments accra, premium accommodation ghana, luxury rental accra, high-end apartments ghana, luxury living accra',
    url: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteConfig.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  },

  properties: {
    title: 'Luxury Properties in Accra',
    description: 'Browse our collection of premium luxury apartments in Accra, Ghana. From 1-bedroom studios to 4-bedroom villas, find your perfect luxury accommodation.',
    keywords: 'luxury properties accra, premium apartments ghana, luxury accommodation accra, high-end properties ghana',
    url: '/properties',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Luxury Properties in Accra',
      description: 'Collection of premium luxury apartments in Accra, Ghana'
    }
  },

  about: {
    title: 'About Luxury Apartments Accra',
    description: 'Learn about Luxury Apartments Accra - Ghana\'s premier luxury accommodation provider. Discover our commitment to excellence and exceptional service.',
    keywords: 'about luxury apartments accra, luxury accommodation provider ghana, premium hospitality accra',
    url: '/about',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}${siteConfig.logo}`,
      description: 'Ghana\'s premier luxury accommodation provider',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'customer service',
        availableLanguage: 'English'
      }
    }
  },

  contact: {
    title: 'Contact Luxury Apartments Accra',
    description: 'Get in touch with Luxury Apartments Accra. Contact us for bookings, inquiries, or to learn more about our premium accommodation services.',
    keywords: 'contact luxury apartments accra, luxury accommodation booking ghana, premium hospitality contact',
    url: '/contact',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Luxury Apartments Accra',
      url: `${siteConfig.url}/contact`,
      mainEntity: {
        '@type': 'Organization',
        name: siteConfig.name,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: siteConfig.phone,
          email: siteConfig.email,
          contactType: 'customer service'
        }
      }
    }
  },

  booking: {
    title: 'Book Luxury Accommodation',
    description: 'Book your luxury apartment in Accra, Ghana. Easy online booking with secure payment options and instant confirmation.',
    keywords: 'book luxury apartment accra, luxury accommodation booking ghana, premium rental booking',
    url: '/booking',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ReservationPage',
      name: 'Book Luxury Accommodation',
      url: `${siteConfig.url}/booking`,
      mainEntity: {
        '@type': 'Hotel',
        name: siteConfig.name,
        url: siteConfig.url
      }
    }
  }
};

// Property-specific SEO generator
export const generatePropertySEO = (property) => {
  const propertyUrl = `/properties/${property.id}`;
  
  return {
    title: property.title,
    description: property.description,
    keywords: `${property.title.toLowerCase()}, luxury apartment accra, premium accommodation ghana, ${property.bedrooms} bedroom apartment accra`,
    url: propertyUrl,
    image: property.images ? property.images[0] : siteConfig.image,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Apartment',
      name: property.title,
      description: property.description,
      image: property.images ? property.images[0] : `${siteConfig.url}${siteConfig.image}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.address,
        addressLocality: 'Accra',
        addressRegion: 'Greater Accra',
        addressCountry: 'GH'
      },
      numberOfRooms: property.bedrooms,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: property.size_sqft,
        unitCode: 'SQF'
      },
      priceRange: '$$$',
      amenityFeature: property.amenities ? property.amenities.map(amenity => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity,
        value: true
      })) : []
    }
  };
};

// Breadcrumb generator
export const generateBreadcrumbs = (path) => {
  const breadcrumbs = [
    { name: 'Home', url: '/' }
  ];

  const pathParts = path.split('/').filter(part => part);
  
  pathParts.forEach((part, index) => {
    const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    const url = '/' + pathParts.slice(0, index + 1).join('/');
    breadcrumbs.push({ name, url });
  });

  return breadcrumbs;
};

// Structured data for breadcrumbs
export const generateBreadcrumbStructuredData = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteConfig.url}${crumb.url}`
    }))
  };
};

// FAQ structured data
export const generateFAQStructuredData = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// Local business structured data
export const generateLocalBusinessStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.image}`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
      postalCode: siteConfig.address.postalCode
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude
    },
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$$',
    sameAs: Object.values(siteConfig.social)
  };
};

