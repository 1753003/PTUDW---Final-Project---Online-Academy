import axios from 'axios';

export function getListCourses() {
    return new Promise( (resolve, reject) => {
        axios.get('http://localhost:5000/api/course/')
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

export function getHot() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/hot`)
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

export function getTrending() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/trending`)
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

export function getNew() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/new`)
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

export function searchByKey(value) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/search?q=${value}`)
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