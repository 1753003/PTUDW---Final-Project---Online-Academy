import axios from 'axios';

export function getListStudent() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/user/student')
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
        })
    })
}

export function getListLecturer() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/user/lecturer')
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
        })
    })
}

export function deleteUser(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`/api/user/${id}`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
        })
    })
}

