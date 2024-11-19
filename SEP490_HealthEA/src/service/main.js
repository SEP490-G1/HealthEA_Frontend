import axios from 'axios'
// get axios base
export async function getData(link, bodyParameters, config) {
  try {
    var result
    if (bodyParameters == {}) {
      result = await axios.get(link, config)
    } else {
      result = await axios.get(link, bodyParameters, config)
    }
    return result
  } catch (error) {
    return error
  }
}
//delete axios
export async function deleteData(link, config) {
  try {
    return await axios.delete(link, config)
  } catch (error) {
    console.log(error)
    return error
  }
}
//post axios
export async function postData(link, bodyParameters, config) {
  try {
    var response = await axios.post(link, bodyParameters, config)
    return response
  } catch (err) {
    return err
  }
}
export async function patchData(link, bodyParameters, config) {
  try {
    var response = await axios.patch(link, bodyParameters, config)
    return response
  } catch (err) {
    return err
  }
}
export async function putData(link, bodyParameters, config) {
  try {
    var response = await axios.put(link, bodyParameters, config)
    return response
  } catch (err) {
    return err
  }
}
///////////////////////////
///Session stogare
////////////////

//get
export function getSessionStogare(role) {
  var token
  switch (role) {
    case 'USERTOKEN':
      token = sessionStorage.getItem(STORE_TOKEN_USER)
      break
    case 'USEROBJECT':
      token = sessionStorage.getItem(STORE_TOKEN_USER_OBJ)
      break
  }
  return token
}

//set
export async function setSessionStogare(role, obj) {
  switch (role) {
    case 'USERTOKEN':
      await sessionStorage.setItem(STORE_TOKEN_USER, obj)
      break
    case 'USEROBJECT':
      await sessionStorage.setItem(STORE_TOKEN_USER_OBJ, obj)
      break
  }
}

///////////////
///end token phase///////////////
//////////////////////////
const STORE_TOKEN_USER = 'user_token'
const STORE_TOKEN_USER_OBJ = 'user_token_obj'
///////////////////////////
///local stogare
////////////////

//get
export function getLocalStogare(role) {
  var token
  switch (role) {
    case 'USERTOKEN':
      token = localStorage.getItem(STORE_TOKEN_USER)
      break
    case 'USEROBJECT':
      token = localStorage.getItem(STORE_TOKEN_USER_OBJ)
      break
  }

  return token
}

//set token
export async function setLocalStoregare(role, str) {
  switch (role) {
    case 'USERTOKEN':
      await localStorage.setItem(STORE_TOKEN_USER, str)
      break
    case 'USEROBJECT':
      await localStorage.setItem(STORE_TOKEN_USER_OBJ, str)
      break
  }
}

//clear toeken
export async function clearLocalStogare(role) {
  switch (role) {
    case 'USERTOKEN':
      await localStorage.removeItem(STORE_TOKEN_USER)
      break
    case 'USEROBJECT':
      await localStorage.removeItem(STORE_TOKEN_USER_OBJ)
      break
  }
}
export function clearUser() {
  localStorage.clear()
  sessionStorage.clear()
}
///////////////
///end token phase///////////////
//////////////////////////
