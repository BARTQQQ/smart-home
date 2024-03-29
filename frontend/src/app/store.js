import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/event/eventSlice'
import weatherReducer from '../features/weather/weatherSlice'
import cityReducer from '../features/city/citySlice';
import deviceReducer from '../features/device/deviceSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    weather: weatherReducer,
    city: cityReducer,
    device: deviceReducer
  },
})