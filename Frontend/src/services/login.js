import request from '@/utils/request';
import axios from 'axios';
import Cookies from 'js-cookie';

export async function fakeqAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export function realAccountLogin(params){
  return new Promise( (resolve, reject) => {

    axios.post(`/api/auth`, params,{withCredentials: true, credentials: 'include'})
    .then((response) => {
        // handle success
        // console.log("res",response);
        resolve(response.data)
    })
    .catch((error) => {
        // handle error
        reject(error);
        // console.log(error);
    })
})
};
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
