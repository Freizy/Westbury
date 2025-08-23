const express = require('express');
const router = express.Router();
const { query, run } = require('../database/database');

// Get all properties
router.get('/', async (req, res) => {
  try {
    const { featured, location, minPrice, maxPrice, bedrooms } = req.query;
    
    let sql = 'SELECT * FROM properties WHERE available = 1';
    const params = [];
    
    if (featured === 'true') {
      sql += ' AND featured = 1';
    }
    
    if (location) {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(minPrice);
    }
    
    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(maxPrice);
    }
    
    if (bedrooms) {
      sql += ' AND bedrooms >= ?';
      params.push(bedrooms);
    }
    
    sql += ' ORDER BY featured DESC, created_at DESC';
    
    const properties = await query(sql, params);
    
    // Parse amenities JSON for each property
    properties.forEach(property => {
      if (property.amenities) {
        property.amenities = JSON.parse(property.amenities);
      }
      if (property.images) {
        property.images = JSON.parse(property.images);
      }
    });
    
    res.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties'
    });
  }
});

// Get single property by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const properties = await query(
      'SELECT * FROM properties WHERE id = ? AND available = 1',
      [id]
    );
    
    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Property not found'
      });
    }
    
    const property = properties[0];
    
    // Parse amenities and images JSON
    if (property.amenities) {
      property.amenities = JSON.parse(property.amenities);
    }
    if (property.images) {
      property.images = JSON.parse(property.images);
    }
    
    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch property'
    });
  }
});

// Get featured properties
router.get('/featured/list', async (req, res) => {
  try {
    const properties = await query(
      'SELECT * FROM properties WHERE featured = 1 AND available = 1 ORDER BY created_at DESC LIMIT 6'
    );
    
    // Parse amenities JSON for each property
    properties.forEach(property => {
      if (property.amenities) {
        property.amenities = JSON.parse(property.amenities);
      }
      if (property.images) {
        property.images = JSON.parse(property.images);
      }
    });
    
    res.json({
      success: true,
      data: properties
    });
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch featured properties'
    });
  }
});

// Get properties by location
router.get('/location/:location', async (req, res) => {
  try {
    const { location } = req.params;
    
    const properties = await query(
      'SELECT * FROM properties WHERE location LIKE ? AND available = 1 ORDER BY featured DESC, created_at DESC',
      [`%${location}%`]
    );
    
    // Parse amenities JSON for each property
    properties.forEach(property => {
      if (property.amenities) {
        property.amenities = JSON.parse(property.amenities);
      }
      if (property.images) {
        property.images = JSON.parse(property.images);
      }
    });
    
    res.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error) {
    console.error('Error fetching properties by location:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch properties by location'
    });
  }
});

// Search properties
router.get('/search/query', async (req, res) => {
  try {
    const { q, location, minPrice, maxPrice, bedrooms } = req.query;
    
    let sql = 'SELECT * FROM properties WHERE available = 1';
    const params = [];
    
    if (q) {
      sql += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
      const searchTerm = `%${q}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (location) {
      sql += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }
    
    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(minPrice);
    }
    
    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(maxPrice);
    }
    
    if (bedrooms) {
      sql += ' AND bedrooms >= ?';
      params.push(bedrooms);
    }
    
    sql += ' ORDER BY featured DESC, created_at DESC';
    
    const properties = await query(sql, params);
    
    // Parse amenities JSON for each property
    properties.forEach(property => {
      if (property.amenities) {
        property.amenities = JSON.parse(property.amenities);
      }
      if (property.images) {
        property.images = JSON.parse(property.images);
      }
    });
    
    res.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error) {
    console.error('Error searching properties:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search properties'
    });
  }
});

module.exports = router; 