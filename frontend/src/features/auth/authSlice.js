import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    users: [],
    // 'idle' | 'loading' | 'succeeded' | 'failed'
    state: 'idle',
    // string | null
    error: null,
    success: null
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token

        return await authService.register(user, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const verify = createAsyncThunk('auth/verify', async (verifyData, thunkAPI) => {
    try {
        const {nickname, token} = verifyData 

        return await authService.verify(nickname, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk('auth/updateUser', async (userData, thunkAPI) => {
    try {
        const {id} = userData 
        const token = await thunkAPI.getState().auth.user.token
        return await authService.updateUser(id, userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.errors) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const getUsers = createAsyncThunk('auth/users', async (_, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await authService.getUsers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
        console.log(error.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('auth/user/delete', async (id, thunkAPI) => {
    try {
        const token = await thunkAPI.getState().auth.user.token
        return await authService.deleteUser(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.error = null
            state.success = null
            state.state = 'idle'
        }
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
            .addCase(getUsers.pending, (state) => {
                state.state = 'loading'
              })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
            })
            .addCase(register.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.success = action.payload
                state.error = null
            })
            .addCase(register.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
                state.success = null
            })
            .addCase(verify.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(verify.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.success = action.payload
                state.error = null
                state.user = null
            })
            .addCase(verify.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
                state.success = null
                state.user = null
            })
            .addCase(updateUser.pending, (state) => {
                state.state = 'loading'
              })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.users = state.users.map(user => {
                    if (user._id === action.payload._id) {
                    return action.payload;
                    }
                    return user;
                });
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
                state.success = null
            })
            .addCase(deleteUser.pending, (state) => {
                state.state = 'loading'
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.state = 'succeeded'
                state.users = state.users.filter(
                    (user) => user._id !== action.payload.id
                )
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.state = 'error'
                state.error = action.payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer