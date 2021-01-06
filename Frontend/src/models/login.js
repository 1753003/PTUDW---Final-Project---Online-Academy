import { stringify } from 'querystring';
import { router } from 'umi';
import { realAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import Cookies from 'js-cookie';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(realAccountLogin, payload);
       // Login successfully
      // console.log(response)
      if (response.status === 'ok') {
        yield call(realAccountLogin, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        localStorage.setItem("isLogin", JSON.stringify("true"));
        localStorage.setItem("userData", JSON.stringify(response));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        console.log(response)
        if(response.type == "admin"){
          // window.location.href = "/admin"
          router.replace('/admin');
          return;

        }else if(response.type == "lecturer"){
          // window.location.href = "/admin"
          router.replace('/lecturer');
          return;
        }else if(redirect && redirect.includes("/admin")){
          redirect = null;
        }
        else if(redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            // window.location.href = '/';
            console.log('llllllll')
            router.replace('/');

            // return;
          }
        }
        console.log('aaaaaaa', redirect)
        router.replace(redirect || '/');
      } else
        {yield put({
          type: 'changeLoginStatus',
          payload: {status:"fail"},
        });}
      
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_,{put}) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      yield put({
        type:'user/delCurrentUser'
      })
      localStorage.setItem("isLogin",JSON.stringify('false'))
      localStorage.setItem("userData",JSON.stringify({}))
      Cookies.remove('aToken')
      Cookies.remove('rfToken')
      setAuthority('guest');
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *logoutHome(_,{put}) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      yield put({
        type:'user/delCurrentUser'
      })
      localStorage.setItem("isLogin",JSON.stringify('false'))
      localStorage.setItem("userData",JSON.stringify({}))
      Cookies.remove('aToken')
      Cookies.remove('rfToken')
      setAuthority('guest');
      if (window.location.pathname !== '/user/login' && !redirect) {
          window.location.pathname = window.location.pathname
        }
    },
  },
  reducers: {

    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
