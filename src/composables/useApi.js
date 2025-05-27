import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/* const API_USER = import.meta.env.VITE_API_USER
const API_PASS = import.meta.env.VITE_API_PASS */

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
 })

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.user?.access_token; // Obtener el token desde Pinia
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url) => {
    loading.value = true
    try {
      const response = await axiosInstance.get(url)
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
      const fullUrl = url.startsWith('http') ? url : url;
      const response = await axiosInstance.post(fullUrl, payload)
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
      const response = await axiosInstance.put(url, payload)
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
      const response = await axiosInstance.delete(url)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/users')
    return data
  }

  const patchUser = async (userId, payload) => {
    try {
      const response = await axiosInstance.patch(`/api/users/${userId}`, payload)
      return response.data
    } catch (err) {
      console.error('Error patching user:', err)
      throw err
    }
  }

  return { data, loading, error, fetchData, postData, putData, deleteData, fetchUsers, patchUser }
}
