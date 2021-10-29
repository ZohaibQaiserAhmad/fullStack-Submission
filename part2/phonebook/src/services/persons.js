import axios from 'axios'
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(response => response.data);

}
const update = (id, existingPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, existingPerson);
    return request.then(response => response.data);
}

const deleteRoute = (id, existingPerson) => {
    //search for person
    const request = axios.delete(`${baseUrl}/${id}`, existingPerson);
    return request.then(response => response.data);
}


export default { getAll, create, deleteRoute, update }