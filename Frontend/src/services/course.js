import axios from 'axios';

export function getListCourses() {
    return new Promise( (resolve, reject) => {
        axios.get('http://localhost:5000/api/course')
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

export function getListCoursesWithCategory() {
    return new Promise( (resolve, reject) => {
        axios.get('http://localhost:5000/api/course/getAll')
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

export function deleteCourse(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`http://localhost:5000/api/course/${id}`)
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
