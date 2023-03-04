import axios from 'axios'
// import api from '../../proxies'

const API_URL = '/api/user/'

const login = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const register = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.post(API_URL + 'register', userData, config)

    return response.data
}

const verify = async (nickname, token) => {
    localStorage.removeItem('user')
    const response = await axios.post(API_URL + 'emailVerify/' + nickname + '/' + token)

    return response.data
}

const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + 'accounts', config)

    return response.data
}

const updateUser = async (id, userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL + id, userData, config)

    return response.data
}

const deleteUser = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {logout, login, register, verify, getUsers, deleteUser, updateUser}

export default authService