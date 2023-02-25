import axios from 'axios'

const API_URL = '/api/city/'

const getCity = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

const updateCity = async (cityData, token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  }
  console.log(cityData)
  const response = await axios.put(API_URL, cityData, config)
  return response.data
}

const cityService = {getCity, updateCity}

export default cityService