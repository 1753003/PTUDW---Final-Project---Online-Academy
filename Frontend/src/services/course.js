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