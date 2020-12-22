import request from '@/utils/request';
import axios from 'axios'

export async function query() {
  return request('/api/users');
}
export function add(params) {
  // console.log("add", params.payload)
  return new Promise( (resolve, reject) => {
    axios.post(`http://localhost:5000/api/user`,
      {
        username:params.payload.username,
        email:params.payload.email,
        password:params.payload.password,
      })
    .then((response) => {
        // handle success
        console.log(response)
        resolve(response)
    })
    .catch((error) => {
        // handle error
        reject(error);
        console.log(error);
    })
  })
}
export function queryCurrent(params) {
  // return request('/api/currentUser');
  // let id = params.id;
  return new Promise( (resolve, reject) => {
    axios.get(`http://localhost:5000/api/user/${params}`)
    .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data)
    })
    .catch((error) => {
        // handle error
        reject(error);
        // console.log(error);
    })
  })
}
export async function queryNotices() {
  return request('/api/notices');
}
