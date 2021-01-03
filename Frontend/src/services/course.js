/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import Cookies from 'js-cookie';

function getRFT() {
    const body = {
        accessToken:Cookies.get('aToken'),
        refreshToken:Cookies.get('rfToken')
    }
    if(typeof(refreshToken)=='undefined')
    {
        
        let isLogin = localStorage.getItem("isLogin")
        console.log(isLogin)
        // if(isLogin.includes('true'))
        //     {
        
        //         console.log("sdsgfd")
        //         router.replace('user/login')
        // }
    }
    return new Promise( (resolve, reject) => {
        axios.post('/api/auth/refresh',body)
        .then((responseRF) => {
            // handle success
            resolve(responseRF.status)
            console.log('RFT',responseRF)

        }).catch((e)=>{
            console.log('getRFT E',e)
            
        })
    })
    // console.log('getRFT',res)
    // console.log('axios error',error);
}
export function getListCourses() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/course',{headers:{'x-access-token':Cookies.get('aToken')}})
        
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            
            getRFT();
        })
    })
}

export function getListCoursesWithCategory() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/course/getAll',{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function deleteCourse(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`/api/course/${id}`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
            // console.log(error);
        })
    })
}

export function addCourse(course) {
    console.log("Add course api");
    return new Promise( (resolve, reject) => {
        axios.post(`http://localhost:5000/api/course`,course,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function searchCourses(value) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/search?q=${value}`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            // console.log('axios error',error);
            // if error return status then log out
            getRFT();
        })
    })
}

export function getCourseById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function getCourseRelateById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}/relate`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function getCourseSylabusById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}/sylabus`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function getCourseReviewById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/${id}/review`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function getCoursesHot() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/hot`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function getCoursesNew() {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/new`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
            // console.log(error);
            // reject(error);
            getRFT();

        })
    })
}

export function getLecturerById(id) {
    return new Promise( (resolve, reject) => {
        axios.get(`http://localhost:5000/api/course/getLecturerCourse/${id}`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            getRFT();
        })
    })
}

export function updateCourse(id, newCourse) {
    return new Promise( (resolve, reject) => {
        axios.patch(`http://localhost:5000/api/course/${id}`,
        newCourse,
        {headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            // reject(error);
            console.log("bcd");
            getRFT();
        })
    })
}