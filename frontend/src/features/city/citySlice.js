import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cityService from './cityService';

const initialState = {
  city: null,
  loading: false,
  error: null,
};

export const getCity = createAsyncThunk('city/getCity', async (_, thunkAPI) => {
  try {
    const token = await thunkAPI.getState().auth.user.token
    const city = await cityService.getCity(token);
    return city;
} catch (error) {
    const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
});

export const updateCity = createAsyncThunk('city/updateCity',  async (cityData, thunkAPI) => {
  try {
      const token = await thunkAPI.getState().auth.user.token
      const updatedCity = await cityService.updateCity(cityData, token);
      return updatedCity;
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
});

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCity.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload;
      })
      .addCase(getCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default citySlice.reducer;