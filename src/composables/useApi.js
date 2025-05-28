import { ref } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_USER = import.meta.env.VITE_API_USER
const API_PASS = import.meta.env.VITE_API_PASS

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  auth: API_USER && API_PASS ? { username: API_USER, password: API_PASS } : undefined
})

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url) => {
    loading.value = true
    try {
      const response = await axiosInstance.get(url) // Usar axiosInstance para evitar concatenación incorrecta
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const postData = async (url, payload) => {
    loading.value = true
    try {
      const response = await axios.post(API_BASE_URL + url, payload)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const putData = async (url, payload) => {
    loading.value = true
    try {
      const response = await axios.put(API_BASE_URL + url, payload)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteData = async (url) => {
    loading.value = true
    try {
      const response = await axios.delete(API_BASE_URL + url)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData, postData, putData, deleteData }
}
