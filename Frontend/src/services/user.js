import request from '@/utils/request';
import axios from 'axios'

export async function query() {
  return request('/api/users');
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
        console.log(error);
    })
  })
}
export async function queryNotices() {
  return request('/api/notices');
}
