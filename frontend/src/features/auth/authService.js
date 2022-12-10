import axios from 'axios'
import api from '../../proxies'

const API_URL = api.PROXY_1 + '/user/'

const login = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {logout, login}

export default authService