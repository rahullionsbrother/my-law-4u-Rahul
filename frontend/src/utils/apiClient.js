/**
 * ==============================================================================
 * MYLAW.COM - SECURE API CLIENT (AXIOS WRAPPER)
 * ==============================================================================
 * PURPOSE: Centralized HTTP client for all backend communication.
 * FEATURES:
 * 1. Automatic JWT Bearer token injection.
 * 2. Global error handling (401, 403, 500).
 * 3. Standardized Response formatting.
 */

import axios from 'axios';

// ------------------------------------------------------------------------------
// 1. AXIOS INSTANCE CONFIGURATION
// ------------------------------------------------------------------------------
// In production, this URL will come from your environment variables (.env)
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10-second timeout to prevent infinite hanging
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// ------------------------------------------------------------------------------
// 2. REQUEST INTERCEPTOR
// ------------------------------------------------------------------------------
// This runs BEFORE every single API request leaves the browser.
apiClient.interceptors.request.use(
  (config) => {
    // 1. Retrieve the auth token from local storage (or your state manager)
    const token = localStorage.getItem('mylaw_auth_token');

    // 2. If token exists, inject it into the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. Log the request in development mode for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] -> ${config.method.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error) => {
    // Handle request setup errors (e.g., network disconnects before sending)
    return Promise.reject(error);
  }
);

// ------------------------------------------------------------------------------
// 3. RESPONSE INTERCEPTOR
// ------------------------------------------------------------------------------
// This runs exactly when the backend responds, BEFORE your component gets the data.
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // We unwrap the data so components don't have to do `res.data.data`
    return response.data;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    const { response } = error;

    if (response) {
      // The request was made and the server responded with a status code
      switch (response.status) {
        case 401:
          console.error('[API Error] 401 Unauthorized: Token expired or invalid.');
          // ACTION: Purge invalid token and force redirect to login
          localStorage.removeItem('mylaw_auth_token');
          localStorage.removeItem('mylaw_user_role');
          window.location.href = '/auth/login?session_expired=true';
          break;
          
        case 403:
          console.error('[API Error] 403 Forbidden: You lack permissions for this action.');
          // ACTION: Could trigger a global "Access Denied" toast notification here
          break;

        case 404:
          console.error(`[API Error] 404 Not Found: Endpoint ${error.config.url} does not exist.`);
          break;

        case 500:
          console.error('[API Error] 500 Internal Server Error: The backend crashed.');
          // ACTION: Redirect to a global 500 Maintenance page
          break;

        default:
          console.error(`[API Error] ${response.status}: An unexpected error occurred.`);
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g., Backend is down / CORS error)
      console.error('[API Error] Network Error: Could not connect to the server.', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('[API Error] Setup Error:', error.message);
    }

    // Reject the promise so the specific component can still handle localized errors
    return Promise.reject(error);
  }
);

/**
 * ==============================================================================
 * 4. EXPORT CONVENIENCE METHODS
 * ==============================================================================
 * This abstracts away the axios details from the UI components.
 */
export const ApiService = {
  get: (url, params = {}) => apiClient.get(url, { params }),
  post: (url, data) => apiClient.post(url, data),
  put: (url, data) => apiClient.put(url, data),
  delete: (url) => apiClient.delete(url),
  
  // Special method for our SecureUploader (handles multipart/form-data)
  upload: (url, formData, onUploadProgress) => {
    return apiClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onUploadProgress // Feeds data back to the progress bar
    });
  }
};

export default apiClient;