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