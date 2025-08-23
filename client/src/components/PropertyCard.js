import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star, 
  Heart,
  Users,
  Wifi,
  Car,
  Coffee
} from 'lucide-react';

const SuiteCard = ({ suite }) => {
  // Early return if suite is null or undefined
  if (!suite) {
    console.warn('SuiteCard received null/undefined suite');
    return null;
  }

  // Validate required fields
  if (!suite.id) {
    console.warn('SuiteCard received suite without id:', suite);
    return null;
  }

  try {
    const {
      id,
      title = 'Luxury Suite',
      description = 'Experience luxury living at its finest with this exceptional suite.',
      price = 0,
      bedrooms = 0,
      bathrooms = 0,
      area_sqm,
      size,
      location = 'WESTBURY HOMES, Accra',
      amenities = [],
      featured = false,
      images = []
    } = suite;

    const formatPrice = (price) => {
      if (!price || price === 0) return '$0';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    };

    const getAmenityIcon = (amenity) => {
      if (!amenity) return <Users size={16} />;
      
      const iconMap = {
        'WiFi': <Wifi size={16} />,
        'Parking': <Car size={16} />,
        'Kitchen': <Coffee size={16} />,
        'Pool': <Users size={16} />,
        'Gym': <Users size={16} />,
        'Spa': <Users size={16} />,
        'Concierge': <Users size={16} />,
        'Security': <Users size={16} />,
        'Balcony': <Users size={16} />,
        'Ocean View': <Users size={16} />,
        'Private Beach Access': <Users size={16} />,
        'Garden': <Users size={16} />,
        'Chef\'s Kitchen': <Coffee size={16} />,
        'Terraces': <Users size={16} />,
        'Business Center': <Users size={16} />,
        'Restaurant': <Coffee size={16} />
      };
      return iconMap[amenity] || <Users size={16} />;
    };

    // Apartment/room image mapping with labeled images
    const suiteImageMap = {
      'KARR - 1 Bedroom Penthouse': require('../Images/IMAGES/KARR.JPG'),
      'RONY - 1 Bedroom Penthouse': require('../Images/IMAGES/RONY.JPG'),
      'ALLY - 2 Bedroom Plus Ensuite': require('../Images/IMAGES/ALLY.JPG'),
      'EBB - 2 Bedroom Standard Ensuite': require('../Images/IMAGES/EBB.JPG'),
      'KIKI - 2 Bedroom Penthouse': require('../Images/IMAGES/KIKI.JPG'),
      'LIZ - 2 Bedroom Standard Ensuite': require('../Images/IMAGES/LIZ.JPG'),
      'MIMI - 2 Bedroom Plus Ensuite': require('../Images/IMAGES/MIMI.JPG'),
      'Studio Suite': require('../Images/IMAGES/KARR.JPG'),
      'One Bedroom Suite': require('../Images/IMAGES/RONY.JPG'),
      'Two Bedroom Suite': require('../Images/IMAGES/ALLY.JPG'),
      'Penthouse Suite': require('../Images/IMAGES/KIKI.JPG'),
    };

    // Ensure images is an array and get the first image
    let imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : null;
    
    // Handle image URL logic
    if (imageUrl && imageUrl.startsWith('client/src/Images/IMAGES/')) {
      // Convert the path to use require() for proper bundling
      const imageName = imageUrl.split('/').pop();
      imageUrl = require(`../Images/IMAGES/${imageName}`);
    } else if (!imageUrl || imageUrl.startsWith('client/src/Images') || imageUrl.startsWith('./') || imageUrl.startsWith('../')) {
      // Use the labeled images from the mapping
      imageUrl = suiteImageMap[title] || require('../Images/IMAGES/KARR.JPG');
    }

    // Ensure amenities is an array and slice it
    const displayAmenities = Array.isArray(amenities) ? amenities.slice(0, 4) : [];

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="card overflow-hidden group hover-lift"
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={title || 'Luxury Suite'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = require('../Images/IMAGES/KARR.JPG');
            }}
          />
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4 bg-[#710014] text-white px-3 py-1 rounded-full text-sm font-sans font-semibold">
              Featured
            </div>
          )}
          
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#161616] px-3 py-2 rounded-lg font-sans font-bold">
            {formatPrice(price)}/night
          </div>
          
          {/* Favorite Button */}
          <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300">
            <Heart size={18} className="text-[#838FBF] hover:text-[#710014] transition-colors" />
          </button>
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          {/* Title and Location */}
          <div className="mb-4">
                      <h3 className="text-xl font-garamond font-semibold text-[#161616] mb-2 group-hover:text-[#710014] transition-colors">
            {title}
          </h3>
            <div className="flex items-center text-body font-sans">
              <MapPin size={16} className="mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          {/* Description */}
          {/* <p className="text-body font-sans text-sm mb-4">{suite.description}</p> */}
          
          {/* Suite Details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-body font-sans text-sm">
              <div className="flex items-center">
                <Bed size={16} className="mr-1" />
                <span>{bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath size={16} className="mr-1" />
                <span>{bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Square size={16} className="mr-1" />
                <span>{area_sqm || size || 0} sqm</span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center">
              <Star size={16} className="text-[#710014] fill-current" />
              <span className="text-[#161616] font-sans font-semibold ml-1">4.9</span>
            </div>
          </div>
          
          {/* Amenities */}
          {displayAmenities.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                {displayAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center text-[#838FBF] font-sans text-xs"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Link
              to={`/suites/${id}`}
              className="bg-[#710014] hover:bg-[#161616] text-white px-4 py-2 rounded-lg font-sans font-semibold transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Details</span>
            </Link>
            
            <Link
              to="/booking"
              className="border-2 border-[#710014] text-[#710014] hover:bg-[#710014] hover:text-white px-4 py-2 rounded-lg font-sans font-semibold transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </motion.div>
    );
  } catch (error) {
    console.error('Error rendering SuiteCard:', error, suite);
    return (
      <div className="card p-6 text-center">
        <p className="text-[#838FBF] font-sans">Error loading suite</p>
      </div>
    );
  }
};

export default SuiteCard; 