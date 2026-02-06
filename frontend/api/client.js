// API Configuration
// Use localhost for local development, deployed backend for production
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalhost 
  ? (import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
  : 'https://edustreammemo.onrender.com/api';

console.log('API Client initialized with base URL:', API_BASE_URL);

// Helper to handle API responses
const handleResponse = async (response) => {
  console.log('API Response:', {
    status: response.status,
    statusText: response.statusText,
    url: response.url
  });
  
  const data = await response.json();
  console.log('Response data:', data);
  
  if (!response.ok) {
    console.error('API Error:', data.message || `HTTP error! status: ${response.status}`);
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data.data;
};

export const apiClient = {
  get: async (endpoint) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('GET Request:', url);
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log('GET Response received from:', url);
      return handleResponse(response);
    } catch (error) {
      console.error('GET Request failed:', error.message);
      throw error;
    }
  },
  
  post: async (endpoint, payload) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('POST Request:', url, 'Payload:', payload);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      console.log('POST Response received from:', url);
      return handleResponse(response);
    } catch (error) {
      console.error('POST Request failed:', error.message);
      throw error;
    }
  },

  put: async (endpoint, payload) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('PUT Request:', url, 'Payload:', payload);
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      
      console.log('PUT Response received from:', url);
      return handleResponse(response);
    } catch (error) {
      console.error('PUT Request failed:', error.message);
      throw error;
    }
  },

  delete: async (endpoint) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('DELETE Request:', url);
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      console.log('DELETE Response received from:', url);
      return handleResponse(response);
    } catch (error) {
      console.error('DELETE Request failed:', error.message);
      throw error;
    }
  }
};
