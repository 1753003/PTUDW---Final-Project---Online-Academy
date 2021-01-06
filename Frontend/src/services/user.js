import request from '@/utils/request';
import axios from 'axios'
import Cookies from 'js-cookie';
function getRFT() {
  const body = {
      accessToken:Cookies.get('aToken'),
      refreshToken:Cookies.get('rfToken')
  }
  if(typeof(refreshToken) === 'undefined')
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
export async function query() {
  return request('/api/users');
}
export function resetRequest(params) {
  // console.log("add", params.payload)
  return new Promise((resolve, reject) => {
    axios.post(`/api/user/forgotPassword`,
      {
        email: params,
      })
      .then((response) => {
        // handle success
        resolve(response);
      })
      .catch((error) => {
        // handle error
        // console.log(error);
      })
  })
}
export function confirmCode(params) {
  return new Promise((resolve, reject) => {
    axios.post(`/api/user/confirmCode`,
      params)
      .then((response) => {
        // handle success
        resolve(response);
      })
      .catch((error) => {
        // handle error
        // console.log(error);
      })
  })
}
export function resetConfirm(params) {
  // console.log("add", params.payload)
  return new Promise((resolve, reject) => {
    axios.post(`/api/user/resetConfirm`,
      {
        email: params.email,
        password: params.password
      })
      .then((response) => {
        // handle success
        resolve(response)
      })
      .catch((error) => {
        // handle error
        // console.log(error);
      })
  })
}
export function add(params) {
  // console.log("add", params.payload)
  return new Promise((resolve, reject) => {
    axios.post(`/api/user`,
      {
        username: params.payload.username,
        email: params.payload.email,
        password: params.payload.password,
      })
      .then((response) => {
        // handle succes
        resolve(response)
      })
      .catch((error) => {
        // handle error
        getRFT();
        console.log(error);
      })
  })
}
export function queryCurrent(params) {
  // return request('/api/currentUser');
  // let id = params.id;
  return new Promise((resolve, reject) => {
    axios.get(`/api/user/${params}`, { headers: { 'x-access-token': Cookies.get('aToken') } })
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data)
      })
      .catch((error) => {
        // handle error
        // reject(error);
        getRFT();
      })
  })
}

export function queryCurrentFavoriteCourse(uid) {
  return new Promise((resolve) => {
    axios.get(`/api/user/${uid}/favorite`, { headers: { 'x-access-token': Cookies.get('aToken') } })
      .then((response) => {
        // console.log(`Hello ${response.data}`);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        // reject(error);
        getRFT();
      })
  })
}

export function queryCurrentRegistedCourse(uid) {
  return new Promise((resolve) => {
    axios.get(`/api/user/${uid}/courseRegister`, { headers: { 'x-access-token': Cookies.get('aToken') } })
      .then((response) => {
        // console.log(`Hello ${response.data}`);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        // reject(error);
        getRFT();
      })
  })
}

export function getRegistedCourseById(payload) {
  const { uid, cid } = payload;
  console.log('atoken',Cookies.get('aToken'))
  return new Promise((resolve) => {
    axios.get(`/api/user/${uid}/courseRegister/${cid}`, { headers: { 'x-access-token': Cookies.get('aToken') } })
      .then((response) => {
        // console.log(`Hello ${response.data}`);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        // reject(error);
        getRFT();
      })
  })
}

export function addCourseToRegister(payload) {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(payload.sylabus));
    console.log('atoken',Cookies.get('aToken'))
    axios.post(`api/user/${payload.uid}/courseRegister/${payload.cid}`, payload.sylabus,{ headers: { 'x-access-token': Cookies.get('aToken') }})
      .then((response) => {
        // handle success
        console.log(response)
        resolve(response)
      })
      .catch((error) => {
        // handle error
        getRFT();
        console.log(error);
      })
  })
}

export function addCourseToFavorite(payload) {
  return new Promise((resolve, reject) => {
    axios.post(`api/user/${payload.uid}/favorite/${payload.cid}`,{ headers: { 'x-access-token': Cookies.get('aToken') }})
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

export function delFavoriteCourse(payload) {
  return new Promise((resolve) => {
    axios.delete(`/api/user/${payload.uid}/favorite/${payload.cid}`, { headers: { 'x-access-token': Cookies.get('aToken') } })
      .then((response) => {
        // console.log(`Hello ${response.data}`);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        // reject(error);
        const body = {
          accessToken: Cookies.get('aToken'),
          refreshToken: Cookies.get('rfToken')
        }
        axios.post('/api/auth/refresh', body).then((responseRF) => {
          // handle success
          resolve(responseRF.data)
          console.log(responseRF)
        })
        console.log('axios error', error);
      })
  })
}

export function setDone(payload) {
  return new Promise((resolve, reject) => {
    axios.patch(`api/user/${payload.uid}/courseRegister/${payload.cid}`, {
      sylabus: payload.sylabus
    },{ headers: { 'x-access-token': Cookies.get('aToken') }})
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

export function setProgress(payload) {
  return new Promise((resolve, reject) => {
    console.log( Cookies.get('aToken'));
    axios.patch(`api/user/${payload.uid}/courseRegister/${payload.cid}`, {
      progress: payload.week
    },{ headers: { 'x-access-token': Cookies.get('aToken') }})
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

export async function queryNotices() {
  return request('/api/notices');
}
