import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const Delete = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log("Delete success:", response.status)
      return id
  })
  .catch(error => {
    console.error("Axios delete error:", error.response?.status, error.message)
    throw error
  })
}

export default { getAll, create, update, Delete }