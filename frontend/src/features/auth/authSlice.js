import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    state: 'idle',
    // string | null
    error: null
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reset: (state) => {
        //     state.state = 'idle'
        //     state.error = null
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer