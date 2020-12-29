import axios from 'axios';
import Cookies from 'js-cookie';

export function getList(lecturerID) {
    return new Promise( (resolve, reject) => {
        axios.get(`/api/sylabus/lecturer/${lecturerID}`,{headers:{'x-access-token':Cookies.get('aToken')}})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
            reject(error);
        })
    })
}
