import axios from 'axios'
// import api from '../../proxies'

const API_URL = '/api/event/'

const getEvents = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

const createEvent = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, data, config)
    return response.data
}

const deleteEvent = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const authService = {getEvents, createEvent, deleteEvent}

export default authService