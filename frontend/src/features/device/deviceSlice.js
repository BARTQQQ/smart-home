import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import deviceService from './deviceService';

const initialState = {
    devices: [],
    temp: [],
    humidity: [],
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    state: 'idle',
    // string | null
    error: null,
    success: null
};

export const getDevices = createAsyncThunk('device/getDevice', async (_, thunkAPI) => {
  try {
    const token = await thunkAPI.getState().auth.user.token
    return await deviceService.getDevices(token);;
} catch (error) {
    const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
}
});

export const setState = createAsyncThunk('device/setState', async (data, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token
      return await deviceService.setState(data, token);;
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
});

export const getTemp = createAsyncThunk('device/getTemp', async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token
      return await deviceService.getTemp(token);;
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
});

export const getHum = createAsyncThunk('device/getHum', async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token
      return await deviceService.getHum(token);;
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
});

export const createDevice = createAsyncThunk('device/createDevice',  async (deviceData, thunkAPI) => {
  try {
      const token = await thunkAPI.getState().auth.user.token
      return await deviceService.createDevice(deviceData, token);
  } catch (error) {
      const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
});

export const deleteDevice = createAsyncThunk('device/deleteDevice',  async (id, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await deviceService.deleteDevice(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        reset: (state) => {
            state.error = null
            state.success = null
            state.state = 'idle'
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDevices.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(getDevices.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.devices = action.payload
            })
            .addCase(getDevices.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
            })
            .addCase(createDevice.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(createDevice.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.success = action.payload
            })
            .addCase(createDevice.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
            })
            .addCase(deleteDevice.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(deleteDevice.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.devices = state.devices.filter(
                    (device) => device._id !== action.payload.id
                )
            })
            .addCase(deleteDevice.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
            })
            .addCase(setState.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(setState.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.devices = state.devices.map((device) => {
                                if (device._id === action.payload.id) {
                                    device.state = action.payload.state
                                }
                                return device
                            })
            })
            .addCase(setState.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
            })
            .addCase(getTemp.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(getTemp.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.temp = action.payload
            })
            .addCase(getTemp.rejected, (state, action) => {
                state.state = 'error'
            })
            .addCase(getHum.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(getHum.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.humidity = action.payload
            })
            .addCase(getHum.rejected, (state, action) => {
                state.state = 'error'
            })
    }
})

export const {reset} = deviceSlice.actions
export default deviceSlice.reducer