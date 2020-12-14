import axios from 'axios';

export function getListCategory() {
    return new Promise( (resolve, reject) => {
        axios.get('http://localhost:5000/api/category')
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
};

export function removeCategory(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`http://localhost:5000/api/category/${id}`)
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
};