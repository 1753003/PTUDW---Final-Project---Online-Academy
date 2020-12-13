import axios from 'axios';

export function getListCourses() {
    return new Promise( (resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/todos/1')
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
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}