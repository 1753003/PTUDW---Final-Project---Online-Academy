import axios from 'axios';
import Cookies from 'js-cookie';

export function getListCourses() {
    return new Promise( (resolve, reject) => {
        console.log('cookies',Cookies.get('aToken'))
        axios.get('/api/course',{headers:{'x-access-token':Cookies.get('aToken')}})
        
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            const body = {
                accessToken:Cookies.get('aToken'),
                refreshToken:Cookies.get('rfToken')
            }
            axios.post('/api/auth/refresh',body).then((responseRF) => {
                // handle success
                resolve(responseRF.data)
                console.log(responseRF)
            })
            console.log('axios error',error);
        })
    })
}

export function getListCoursesWithCategory() {
    return new Promise( (resolve, reject) => {
        console.log('cookies',Cookies.get('aToken'))
        axios.get('/api/course/getAll',{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            const body = {
                accessToken:Cookies.get('aToken'),
                refreshToken:Cookies.get('rfToken')
            }
            axios.post('/api/auth/refresh',body).then((responseRF) => {
                // handle success
                resolve(responseRF.data)
                console.log(responseRF)
            })
            console.log('axios error',error);
        })
    })
}

export function deleteCourse(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`/api/course/${id}`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function addCourse(course) {
    console.log(course);
    return new Promise( (resolve, reject) => {
        axios.post(`http://localhost:5000/api/course`,course)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function searchCourses(value) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/search?q=${value}`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function getCourseById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function getCourseRelateById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}/relate`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function getCourseSylabusById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}/sylabus`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function getCourseReviewById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}/review`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function getCoursesHot() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/hot`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}

export function getCoursesNew() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/new`)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
        })
    })
}
