import axios from 'axios'
import { useUserStore } from '@/stores/user'
// get axios base
export async function getData(link, bodyParameters, config) {
  try {
    if (bodyParameters == {}) {
      console.log('body', null)
      return await axios.get(link, config)
    } else {
      return await axios.get(link, bodyParameters, config)
    }
  } catch (error) {
    return error
  }
}
//post axios
export async function postData(link, bodyParameters, config) {
  try {
    return await axios.post(link, bodyParameters, config)
  } catch (error) {
    return error
  }
}
//get token
export async function getCookieToken() {
  var token = window.localStorage.getItem('TokenUser')
  return token
}
//set token
export async function setCookieToken(str) {
  window.localStorage.setItem('TokenUser', str)
}
//clear toeken
export async function clearToken() {
  window.localStorage.removeItem('TokenUser')
}
//config users
export async function setUpToken() {
  const token = await getCookieToken()
  if (token == null) {
    return token
  }
  const headers = {
    // Các tùy chọn cấu hình khác
    headers: {
      'Content-Type': 'application/json'
      // Các tiêu đề khác nếu cần
    }
  }
  headers.headers.Authorization = `Bearer ${token}`
  const API_URL = 'http://localhost:9090/identity'
  const user = useUserStore()
  const response = await getData(API_URL + '/users/myinfo', headers)
  user.userName = response.data.result.userName
  user.userFirstName = response.data.result.firstName
  user.userLastName = response.data.result.lastName
  user.role = response.data.result.role
  user.auth = true
  user.token = token
  return token
}
