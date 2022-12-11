import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import eventService from './eventService'

const initialState = {
    events: [],
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    state: 'idle',
    // string | null
    error: null
}

export const getEvents = createAsyncThunk('event/get', async (_, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await eventService.getEvents(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const createEvent = createAsyncThunk('event/create', async (data, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await eventService.createEvent(data, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteEvent = createAsyncThunk('event/delete', async (id, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await eventService.deleteEvent(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  })

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        resetEvent: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getEvents.pending, (state) => {
            state.state = 'loading'
          })
          .addCase(getEvents.fulfilled, (state, action) => {
            state.state = 'succeeded'
            state.events = action.payload
          })
          .addCase(getEvents.rejected, (state, action) => {
            state.state = 'failed'
            state.error = action.payload
          })
          .addCase(createEvent.pending, (state) => {
            state.state = 'loading'
          })
          .addCase(createEvent.fulfilled, (state, action) => {
            state.state = 'succeeded'
            state.events.push(action.payload)
          })
          .addCase(createEvent.rejected, (state, action) => {
            state.state = 'failed'
            state.error = action.payload
          })
          .addCase(deleteEvent.pending, (state) => {
            state.state = 'loading'
          })
          .addCase(deleteEvent.fulfilled, (state, action) => {
            state.state = 'succeeded'
            state.events = state.events.filter(
              (event) => event._id !== action.payload.id
            )
          })
          .addCase(deleteEvent.rejected, (state, action) => {
            state.state = 'failed'
            state.error = action.payload
          })
    }
})

export const {resetEvent} = eventSlice.actions
export default eventSlice.reducer