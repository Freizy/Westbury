import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

// Properties API
export const getProperties = (params = {}) => api.get('/properties', { params });
export const getPropertyById = (id) => api.get(`/properties/${id}`);
export const getFeaturedProperties = () => api.get('/properties/featured/list');
export const searchProperties = (params) => api.get('/properties/search/query', { params });
export const getPropertiesByLocation = (location) => api.get(`/properties/location/${location}`);

// Contact API
export const submitContactForm = (data) => api.post('/contact', data);
export const getContactInquiries = () => api.get('/contact');
export const updateContactStatus = (id, status) => api.patch(`/contact/${id}`, { status });
export const getContactStats = () => api.get('/contact/stats/overview');

// Bookings API
export const createBooking = (data) => api.post('/bookings', data);
export const getBookings = (params = {}) => api.get('/bookings', { params });
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => api.patch(`/bookings/${id}/status`, { status });
export const getBookingStats = () => api.get('/bookings/stats/overview');
export const checkAvailability = (propertyId, checkIn, checkOut) => 
  api.get(`/bookings/availability/${propertyId}`, { 
    params: { check_in_date: checkIn, check_out_date: checkOut } 
  });

// Auth API
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getProfile = () => api.get('/auth/profile');
export const updateProfile = (data) => api.put('/auth/profile', data);
export const changePassword = (data) => api.put('/auth/change-password', data);
export const logout = () => api.post('/auth/logout');

// Health check
export const healthCheck = () => api.get('/health');

export default api; 