import axios from 'axios'

// get axios base
export async function getData(link, bodyParameters, config) {
  try {
    const response = await axios.get(link, config, bodyParameters)
    return response
  } catch (error) {
    console.log(error)
  }
}
export async function postData(link, bodyParameters, config) {
  try {
    const response = await axios.post(link, config, bodyParameters)
    console.log(response)
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}
