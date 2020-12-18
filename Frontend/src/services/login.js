import request from '@/utils/request';
import axios from 'axios';
export async function fakeqAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export function fakeAccountLogin(params){
  return new Promise( (resolve, reject) => {
    axios.post(`http://localhost:5000/api/auth`, params)
    .then((response) => {
        // handle success
        console.log("this");
        resolve(response.data)
    })
    .catch((error) => {
        // handle error
        reject(error);
        console.log(error);
    })
})
};
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
