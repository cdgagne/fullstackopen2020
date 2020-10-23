import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const remove = person => {
    const deleteUrl = baseUrl + '/' + person.id
    const request = axios.delete(deleteUrl)
    return request.then(response => response.data)
}

const update = (person, newPerson) => {
    const putUrl = baseUrl + '/' + person.id
    const request = axios.put(putUrl, newPerson)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }