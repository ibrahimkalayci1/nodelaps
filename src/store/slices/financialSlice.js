import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { financialAPI } from '../../services/api';

// Async thunks
export const fetchFinancialSummary = createAsyncThunk(
  'financial/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financialAPI.getSummary();
      if (import.meta.env.DEV) {
        console.log('Financial Summary Response:', response.data);
      }
      return response.data.data || response.data;
    } catch (error) {
      if (import.meta.env.DEV && error.response?.status !== 404 && error.response?.status !== 401) {
        console.warn('Financial Summary API Error:', error.response?.data?.message || error.message);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch financial summary');
    }
  }
);

export const fetchWorkingCapital = createAsyncThunk(
  'financial/fetchWorkingCapital',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financialAPI.getWorkingCapital();
      if (import.meta.env.DEV) {
        console.log('Working Capital Response:', response.data);
      }
      return response.data.data || response.data;
    } catch (error) {
      if (import.meta.env.DEV && error.response?.status !== 404 && error.response?.status !== 401) {
        console.warn('Working Capital API Error:', error.response?.data?.message || error.message);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch working capital');
    }
  }
);

export const fetchWallet = createAsyncThunk(
  'financial/fetchWallet',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financialAPI.getWallet();
      if (import.meta.env.DEV) {
        console.log('Wallet Response:', response.data);
      }
      return response.data.data || response.data;
    } catch (error) {
      if (import.meta.env.DEV && error.response?.status !== 404 && error.response?.status !== 401) {
        console.warn('Wallet API Error:', error.response?.data?.message || error.message);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wallet');
    }
  }
);

export const fetchRecentTransactions = createAsyncThunk(
  'financial/fetchRecentTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financialAPI.getRecentTransactions();
      if (import.meta.env.DEV) {
        console.log('Recent Transactions Response:', response.data);
      }
      return response.data.data || response.data;
    } catch (error) {
      if (import.meta.env.DEV && error.response?.status !== 404 && error.response?.status !== 401) {
        console.warn('Recent Transactions API Error:', error.response?.data?.message || error.message);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recent transactions');
    }
  }
);

export const fetchScheduledTransfers = createAsyncThunk(
  'financial/fetchScheduledTransfers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financialAPI.getScheduledTransfers();
      if (import.meta.env.DEV) {
        console.log('Scheduled Transfers Response:', response.data);
      }
      return response.data.data || response.data;
    } catch (error) {
      // Don't log 401 errors - they're handled by the API interceptor
      // Don't log 404 errors either - they're expected when data doesn't exist
      if (import.meta.env.DEV && error.response?.status !== 404 && error.response?.status !== 401) {
        console.warn('Scheduled Transfers API Error:', error.response?.data?.message || error.message);
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch scheduled transfers');
    }
  }
);

const initialState = {
  summary: null,
  workingCapital: null,
  wallet: null,
  recentTransactions: null,
  scheduledTransfers: null,
  loading: {
    summary: false,
    workingCapital: false,
    wallet: false,
    recentTransactions: false,
    scheduledTransfers: false,
  },
  errors: {
    summary: null,
    workingCapital: null,
    wallet: null,
    recentTransactions: null,
    scheduledTransfers: null,
  },
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    clearFinancialErrors: (state) => {
      state.errors = {
        summary: null,
        workingCapital: null,
        wallet: null,
        recentTransactions: null,
        scheduledTransfers: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Financial Summary
    builder
      .addCase(fetchFinancialSummary.pending, (state) => {
        state.loading.summary = true;
        state.errors.summary = null;
      })
      .addCase(fetchFinancialSummary.fulfilled, (state, action) => {
        state.loading.summary = false;
        state.summary = action.payload;
        state.errors.summary = null;
      })
      .addCase(fetchFinancialSummary.rejected, (state, action) => {
        state.loading.summary = false;
        state.errors.summary = action.payload;
        // Set summary to null to allow UI to show default state
        if (!state.summary) {
          state.summary = null;
        }
      });

    // Working Capital
    builder
      .addCase(fetchWorkingCapital.pending, (state) => {
        state.loading.workingCapital = true;
        state.errors.workingCapital = null;
      })
      .addCase(fetchWorkingCapital.fulfilled, (state, action) => {
        state.loading.workingCapital = false;
        state.workingCapital = action.payload;
        state.errors.workingCapital = null;
      })
      .addCase(fetchWorkingCapital.rejected, (state, action) => {
        state.loading.workingCapital = false;
        state.errors.workingCapital = action.payload;
        // Set workingCapital to null to allow UI to show default state
        if (!state.workingCapital) {
          state.workingCapital = null;
        }
      });

    // Wallet
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading.wallet = true;
        state.errors.wallet = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action) => {
        state.loading.wallet = false;
        state.wallet = action.payload;
        state.errors.wallet = null;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading.wallet = false;
        state.errors.wallet = action.payload;
        // Set wallet to null to allow UI to show default state
        if (!state.wallet) {
          state.wallet = null;
        }
      });

    // Recent Transactions
    builder
      .addCase(fetchRecentTransactions.pending, (state) => {
        state.loading.recentTransactions = true;
        state.errors.recentTransactions = null;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.loading.recentTransactions = false;
        state.recentTransactions = action.payload;
        state.errors.recentTransactions = null;
      })
      .addCase(fetchRecentTransactions.rejected, (state, action) => {
        state.loading.recentTransactions = false;
        state.errors.recentTransactions = action.payload;
        // Set recentTransactions to null to allow UI to show default state
        if (!state.recentTransactions) {
          state.recentTransactions = null;
        }
      });

    // Scheduled Transfers
    builder
      .addCase(fetchScheduledTransfers.pending, (state) => {
        state.loading.scheduledTransfers = true;
        state.errors.scheduledTransfers = null;
      })
      .addCase(fetchScheduledTransfers.fulfilled, (state, action) => {
        state.loading.scheduledTransfers = false;
        state.scheduledTransfers = action.payload;
        state.errors.scheduledTransfers = null;
      })
      .addCase(fetchScheduledTransfers.rejected, (state, action) => {
        state.loading.scheduledTransfers = false;
        state.errors.scheduledTransfers = action.payload;
        // Set scheduledTransfers to null to allow UI to show default state
        if (!state.scheduledTransfers) {
          state.scheduledTransfers = null;
        }
      });
  },
});

export const { clearFinancialErrors } = financialSlice.actions;
export default financialSlice.reducer;
