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

export function getListCategory() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/category', {headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            getRFT()
            axios.get('/api/category', {headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        })
    })
}

export function removeCategory(id) {
    return new Promise( (resolve, reject) => {
        axios.delete(`/api/category/${id}`,{headers:{'x-access-token':Cookies.get('aToken')}},)
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            getRFT()
        })
    })
}

export function editCategory(id, newName) {
    return new Promise( (resolve, reject) => {
        axios.patch(`/api/category/${id}`, {name: newName},{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            getRFT()
        })
    })
}

export function addCategory(newName, topic) {
    return new Promise( (resolve, reject) => {
        axios.post('/api/category/', {name: newName, isNull: true, idTopic: topic},
        {headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            getRFT()
        })
    })
}

export function getListHotCategory() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/category/hot',
        {headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            getRFT();
        })
    })
}

export function getMenuCategory() {
    return new Promise( (resolve, reject) => {
        axios.get('/api/category/getMenu',
        {headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            getRFT();
        })
    })
}