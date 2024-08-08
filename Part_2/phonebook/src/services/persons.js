import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const request =  axios.get(baseUrl)
    return request.then(response=>{
        return response.data
    })
}
const getByID = (id) =>{
    const request =  axios.get(`${baseUrl}/${id}`)
    return request.then(response=>{
        return response.data
    })
}
const create = (person) =>{
    const request =  axios.post(baseUrl, person)
    return request.then(response=>{
        return response.data
    })
}

const deleteByID = (id) => {

    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) =>{
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {
    getAll:  getAll, 
    create: create, 
    deleteByID: deleteByID,
    update: update
}