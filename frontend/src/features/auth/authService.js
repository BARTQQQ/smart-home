import axios from 'axios'
// import api from '../../proxies'
// import io from 'socket.io-client';
// import { io } from "socket.io-client";

const API_URL = '/api/user/'


// const socket = new WebSocket('ws://192.168.0.115:4000');
// socket.addEventListener('open', () => {
//     console.log('WebSocket connected');
//   });
  
//   socket.addEventListener('message', (event) => {
//     const message = JSON.parse(event.data);
//     if (message.type === 'connect') {
//       console.log(`WebSocket connection ID: ${message.uuid}`);
//     }
//   });
// socket.on('temperature', (temperature) => {
//   console.log(`New temperature data: ${temperature.celsius} C / ${temperature.fahrenheit} F`);
//   // do something with the temperature data
// });
// const socket = io("ws://192.168.0.110:4001");


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

    const response = await axios.put(API_URL + id, userData, config)

    if(response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }

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

const authService = { logout, login, register, verify, getUsers, deleteUser, updateUser}

export default authService