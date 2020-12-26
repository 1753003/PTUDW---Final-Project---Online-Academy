import axios from 'axios';

export function getListCategory() {
    console.log("call api");
    return new Promise( (resolve, reject) => {
        axios.get('/api/category',
        {headers:{'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYwODEwMzQwNCwiZXhwIjoxNjA4MTA5NDA0fQ.SrfkU7AWEew5J-OqTT4sYNEz8vrWNUDbEP5U44dvmDY'}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            console.log(error);
        })
    })
}

export function removeCategory(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`/api/category/${id}`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            console.log(error);
        })
    })
}

export function editCategory(id, newName) {
    return new Promise( (resolve, reject) => {
        axios.patch(`/api/category/${id}`, {name: newName},{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            console.log(error);
        })
    })
}

export function addCategory(newName, topic) {
    return new Promise( (resolve, reject) => {
        axios.post('/api/category/', {name: newName, isNull: true, idTopic: topic})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            console.log(error);
        })
    })
}