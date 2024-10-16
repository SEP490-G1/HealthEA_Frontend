import axios from 'axios'
import { useUserStore } from '@/stores/user'

export const HTTP = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  headers: {
    Authorization: 'Bearer {token}'
  }
})

// HTTP.interceptors.request.use(
//   (config) => {
//     const userStore = useUserStore()
//     const token = userStore.token

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }

//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
export async function signup(link, bodyParameters) {
  try {
    const response = await axios.post(link, bodyParameters)
    return response
  } catch (error) {
    console.log('Error login: ', error)
    return error
  }
}

export async function verifyEmail(link) {
  try {
    const response = await axios.post(link)
    return response
  } catch (error) {
    console.log('Error send email: ', error)
    return error
  }
}

export async function verifyToken(link) {
  try {
    const response = await axios.post(link)
    return response
  } catch (error) {
    console.log('Error verify token: ', error)
    return error
  }
}

export async function login(link, bodyParameters) {
  try {
    const response = await axios.post(link, bodyParameters)
    return response
  } catch (error) {
    console.log('Error login: ', error)
    return error
  }
}

export async function getMyInfo(link) {
  try {
    const userStore = useUserStore()
    const token = userStore.token

    const response = await axios.get(link, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    console.log('Error get user info: ', error)
    return error
  }
}

export async function logout(link) {
  try {
    const userStore = useUserStore()
    const token = userStore.token

    const response = await axios.post(link, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      token: token
    })
    return response
  } catch (error) {
    console.log('Error logout: ', error)
    return error
  }
}

export async function updateUserProfile(link, bodyParameters) {
  try {
    const userStore = useUserStore()
    const token = userStore.token

    const response = await axios.put(link,
      bodyParameters,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return response
  } catch (error) {
    console.log('Error logout: ', error)
    return error
  }
}

export async function updatePassword(link, bodyParameters) {
  try {
    const userStore = useUserStore()
    const token = userStore.token

    const response = await axios.put(link,
      bodyParameters,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    return response
  } catch (error) {
    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("Internal server error");
    }
    return error
  }
}

