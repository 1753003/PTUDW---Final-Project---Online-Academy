import axios from 'axios';

export function getListStudent() {
    return new Promise( (resolve, reject) => {
        axios.get('http://localhost:5000/api/user/student')
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
        axios.get('http://localhost:5000/api/user/lecturer')
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
        axios.delete(`http://localhost:5000/api/user/${id}`)
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

