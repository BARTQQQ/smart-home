import axios from "axios";

const API_URL = '/api/device/'

const getDevices = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const createDevice = async (deviceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL, deviceData, config)

    return response.data
}

const deleteDevice = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + id, config)

    return response.data
}

const deviceService = {getDevices, createDevice, deleteDevice}

export default deviceService
