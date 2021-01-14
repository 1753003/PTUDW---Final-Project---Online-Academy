import axios from 'axios';
import Cookies from 'js-cookie';

export function getListStudent() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/user/student',
        {headers:{'x-access-token':Cookies.get('aToken')}})
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
        axios.get('/api/user/lecturer',
        {headers:{'x-access-token':Cookies.get('aToken')}})
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
    console.log(id);
    return new Promise( (resolve, reject) => {
        axios.delete(`/api/user/${id}`,
        {headers:{'x-access-token':Cookies.get('aToken')}})
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

