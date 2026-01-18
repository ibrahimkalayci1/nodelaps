import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../../services/api';

// Async thunks
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }

      // Backend expects fullName field
      const payload = userData;

      // Log payload in development for debugging
      if (import.meta.env.DEV) {
        console.log('Registration Payload:', payload);
      }
      
      const response = await userAPI.register(payload);

      // Log full response to debug token extraction
      if (import.meta.env.DEV) {
        console.log('Registration Response:', response);
        console.log('Response Data:', response.data);
      }

      // Registration successful - return user data
      const data = response.data.data || response.data;
      return { 
        user: data,
        message: response.data.message || 'Registration successful'
      };
    } catch (error) {
      // Log detailed error for debugging
      if (import.meta.env.DEV) {
        console.error('Registration Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.response?.data?.message || error.message,
          requestUrl: error.config?.url,
          requestData: error.config?.data,
        });
      }
      
      // Extract error message from various possible locations
      let errorMessage = 'Registration failed';
      
      if (error.response) {
        const status = error.response.status;
        const responseData = error.response.data;
        
        // Handle different response data types
        if (typeof responseData === 'string' && responseData.trim()) {
          errorMessage = responseData;
        } else if (typeof responseData === 'object' && responseData !== null) {
          errorMessage = responseData.message || responseData.error || responseData.details || errorMessage;
        }
        
        // Add status-specific messages
        if (status === 500) {
          // Check if backend is reachable
          if (!responseData || (typeof responseData === 'string' && !responseData.trim())) {
            errorMessage = 'Backend server error. Please ensure the backend server is running on port 5737.';
          } else {
            errorMessage = errorMessage || 'Server error occurred. Please try again later or contact support.';
          }
        } else if (status === 400) {
          errorMessage = errorMessage || 'Invalid registration data. Please check your information.';
        } else if (status === 409) {
          errorMessage = errorMessage || 'An account with this email already exists.';
        } else if (status) {
          errorMessage = errorMessage || `Registration failed (${status})`;
        }
      } else if (error.isNetworkError) {
        errorMessage = 'Unable to connect to backend server. Please ensure the server is running on port 5737.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Validate required fields
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Log payload in development for debugging
      if (import.meta.env.DEV) {
        console.log('Login Payload:', { email: credentials.email });
      }

      const response = await userAPI.login(credentials);

      if (import.meta.env.DEV) {
        console.log("LOGIN RESPONSE 👉", response.data);
      }

      const data = response.data.data || response.data;
      const { accessToken, refreshToken, user } = data;

      if (!accessToken) {
        throw new Error("Access token not received");
      }

      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      return { user, accessToken, refreshToken };
    } catch (error) {
      // Log detailed error for debugging
      if (import.meta.env.DEV) {
        console.error('Login Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.response?.data?.message || error.message,
          requestUrl: error.config?.url,
          requestData: error.config?.data,
        });
      }
      
      // Extract error message from various possible locations
      let errorMessage = 'Login failed';
      
      if (error.response) {
        const status = error.response.status;
        const responseData = error.response.data;
        
        // Handle different response data types
        if (typeof responseData === 'string' && responseData.trim()) {
          errorMessage = responseData;
        } else if (typeof responseData === 'object' && responseData !== null) {
          errorMessage = responseData.message || responseData.error || responseData.details || errorMessage;
        }
        
        // Add status-specific messages
        if (status === 401) {
          errorMessage = errorMessage || 'Invalid email or password. Please check your credentials.';
        } else if (status === 500) {
          // Check if backend is reachable
          if (!responseData || (typeof responseData === 'string' && !responseData.trim())) {
            errorMessage = 'Backend server error. Please ensure the backend server is running on port 5737.';
          } else {
            errorMessage = errorMessage || 'Server error occurred. Please try again later or contact support.';
          }
        } else if (status === 400) {
          errorMessage = errorMessage || 'Invalid login data. Please check your information.';
        } else if (status) {
          errorMessage = errorMessage || `Login failed (${status})`;
        }
      } else if (error.isNetworkError) {
        errorMessage = 'Unable to connect to backend server. Please ensure the server is running on port 5737.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);


export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await userAPI.logout();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return null;
    } catch (error) {
      // Even if logout fails on server, clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }
      
      const response = await userAPI.refreshToken(refreshTokenValue);
      const data = response.data.data || response.data;
      const { accessToken } = data;
      
      if (!accessToken) {
        throw new Error('Access token not received');
      }
      
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      let errorMessage = 'Token refresh failed';
      if (error.response) {
        const responseData = error.response.data;
        if (typeof responseData === 'string' && responseData.trim()) {
          errorMessage = responseData;
        } else if (typeof responseData === 'object' && responseData !== null) {
          errorMessage = responseData.message || responseData.error || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      return rejectWithValue(errorMessage);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.profile();
      const data = response.data.data || response.data;
      return data;
    } catch (error) {
      let errorMessage = 'Failed to fetch profile';
      if (error.response) {
        const responseData = error.response.data;
        if (typeof responseData === 'string' && responseData.trim()) {
          errorMessage = responseData;
        } else if (typeof responseData === 'object' && responseData !== null) {
          errorMessage = responseData.message || responseData.error || errorMessage;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

const storedAccessToken = localStorage.getItem('accessToken');

const initialState = {
  user: null,
  accessToken: storedAccessToken && storedAccessToken !== "undefined" ? storedAccessToken : null,
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!storedAccessToken && storedAccessToken !== "undefined",
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Don't set authentication state - user needs to login manually
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // Still clear user data even if logout fails
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });

    // Get Profile
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
