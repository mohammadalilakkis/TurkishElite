import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // #region agent log
  fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:13',message:'API request interceptor',data:{url:config.url,hasToken:!!token,tokenLength:token?.length,tokenPreview:token?.substring(0,30)},timestamp:Date.now(),runId:'run2',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:18',message:'Token added to Authorization header',data:{headerPreview:config.headers.Authorization?.substring(0,40)},timestamp:Date.now(),runId:'run2',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  } else {
    // #region agent log
    fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:22',message:'No token found in localStorage',data:{url:config.url},timestamp:Date.now(),runId:'run2',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
      // #region agent log
      fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:24',message:'API error response',data:{status:error.response.status,url:error.config?.url,pathname:window.location.pathname},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
      // #endregion
      if (error.response.status === 401) {
        // Clear invalid/expired token and redirect so user can log in again
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.pathname === '/admin') {
          window.location.href = '/';
        }
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Tours API
export const toursAPI = {
  getAll: async (category?: string) => {
    const params = category ? { category } : {};
    const response = await api.get('/tours', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/tours/${id}`);
    return response.data;
  },
  create: async (tourData: any) => {
    const response = await api.post('/tours', tourData);
    return response.data;
  },
  update: async (id: string, tourData: any) => {
    const response = await api.put(`/tours/${id}`, tourData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/tours/${id}`);
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  create: async (bookingData: {
    tourId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    numberOfGuests: number;
    startDate: string;
    endDate: string;
    specialRequests?: string;
  }) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

// Contacts API
export const contactsAPI = {
  create: async (contactData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interest: 'tourist' | 'medical' | 'both';
    message: string;
  }) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },
  getAll: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get('/contacts', { params });
    return response.data;
  },
};

// Auth API
export const authAPI = {
  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:103',message:'Storing token in localStorage',data:{tokenLength:response.data.token.length,tokenPreview:response.data.token.substring(0,30)},timestamp:Date.now(),runId:'run2',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // #region agent log
        fetch('http://127.0.0.1:7247/ingest/c98bc6f1-adbd-4a48-a39e-d406a746af6a',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'api.ts:107',message:'Token stored, verifying retrieval',data:{retrievedToken:localStorage.getItem('token')?.substring(0,30)},timestamp:Date.now(),runId:'run2',hypothesisId:'B'})}).catch(()=>{});
        // #endregion
      }
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', error);
      if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
        throw new Error('Cannot connect to server. Please make sure the backend is running on port 5000.');
      }
      throw error;
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  isAdmin: () => {
    const user = authAPI.getCurrentUser();
    return user?.role === 'admin';
  },
};

// Cities API
export const citiesAPI = {
  getAll: async (isActive?: boolean) => {
    const params = isActive !== undefined ? { isActive: String(isActive) } : {};
    const response = await api.get('/cities', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/cities/${id}`);
    return response.data;
  },
  create: async (cityData: {
    name: string;
    description: string;
    image: string;
    highlights?: string[];
  }) => {
    const response = await api.post('/cities', cityData);
    return response.data;
  },
  update: async (id: string, cityData: any) => {
    const response = await api.put(`/cities/${id}`, cityData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/cities/${id}`);
    return response.data;
  },
};

// Medical Options API
export const medicalOptionsAPI = {
  getAll: async (isActive?: boolean) => {
    const params = isActive !== undefined ? { isActive: String(isActive) } : {};
    const response = await api.get('/medical-options', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/medical-options/${id}`);
    return response.data;
  },
  create: async (optionData: {
    title: string;
    description: string;
    icon?: string;
    features?: string[];
  }) => {
    const response = await api.post('/medical-options', optionData);
    return response.data;
  },
  update: async (id: string, optionData: any) => {
    const response = await api.put(`/medical-options/${id}`, optionData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/medical-options/${id}`);
    return response.data;
  },
};

// Analytics API
export const analyticsAPI = {
  getDashboard: async () => {
    const response = await api.get('/analytics');
    return response.data;
  },
};

export default api;
