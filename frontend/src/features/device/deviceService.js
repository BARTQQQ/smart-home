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

const setState = async (data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL + '/set', data, config)
    return response.data
}

const getTemp = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + '/temp', config)
    return response.data
}

const getHum = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + '/humidity', config)
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

const deviceService = {setState, getDevices, createDevice, deleteDevice, getTemp, getHum}

export default deviceService
