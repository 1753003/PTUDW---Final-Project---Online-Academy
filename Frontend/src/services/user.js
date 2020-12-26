import request from '@/utils/request';
import axios from 'axios'
import Cookies from 'js-cookie';

export async function query() {
  return request('/api/users');
}
export function add(params) {
  // console.log("add", params.payload)
  return new Promise( (resolve, reject) => {
    axios.post(`/api/user`,
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
    axios.get(`/api/user/${params}`, {headers:{'x-access-token':Cookies.get('aToken')}})
    .then((response) => {
        // handle success
        // console.log(response.data)
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
export async function queryNotices() {
  return request('/api/notices');
}
