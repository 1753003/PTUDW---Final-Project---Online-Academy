import { stringify } from 'querystring';
import { router } from 'umi';
import { realAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      if(payload.autoLogin)
      {
        console.log('auto')

      }
      const response = yield call(realAccountLogin, payload);
      // console.log(response)
      // console.log("login")
      // const response = yield call(dbLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        localStorage.setItem("isLogin", JSON.stringify("true"));
        localStorage.setItem("userData", JSON.stringify(response));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if(response.type == "admin"){
          // window.location.href = "/admin"
          router.replace('/admin');
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
            router.replace('/');
            return;
          }
        }

        router.replace(redirect || '/');
      }
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
  },
  reducers: {

    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
