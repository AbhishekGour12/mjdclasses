
import api from './api';

export const authAPI = {
    // Register new user
    register: async (userData) => {
    try {
      const response = await api.post('/api/auth/register', userData);
      console.log(response)
      return response.data;
    } catch (error) {
      // Enhanced error handling for registration
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    }
  },
    // Get current user profile
    getProfile: async (token) => {
        try {
            console.log(token)
            const response = await api.get(`/api/auth/profile/
                ${token}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update user profile
    updateProfile: async (userData) => {
        try {
            const response = await api.put('/auth/profile', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
    
    // Change password
    changePassword: async (passwordData) => {
        try {
            const response = await api.put('/auth/change-password', passwordData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    contact: async(formData) =>{
         try {
            const response = await api.post('/api/auth/contact', formData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    
    },
    attendanceLogout: async(data) =>{
         try {
            const response = await api.post('/api/auth/attendance/logout', data);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }

    },
   

    

    // Logout user (client-side only)
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }
};