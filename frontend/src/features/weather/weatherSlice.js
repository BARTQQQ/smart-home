import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import weatherService from './weatherService';

const initialState = {
    data: '',
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    status: 'idle',
    error: null,
};


export const getWeather = createAsyncThunk('weather/gethWeather', async (city, thunkAPI) => {
    try {
        const response = await weatherService.getWeather(city);
        return response;
    } catch (error) {
        const message = error.response.statusText || (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});


const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getWeather.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getWeather.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(getWeather.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
  });

export default weatherSlice.reducer;