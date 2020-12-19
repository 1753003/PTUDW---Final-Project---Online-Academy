import { stringify } from 'querystring';
import { router } from 'umi';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      // console.log(response)
      console.log("login")
      // const response = yield call(dbLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        localStorage.setItem("userData", JSON.stringify(response));
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;
        if(response.type == "admin"){
          window.location.href = "/admin"
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
            window.location.href = '/';
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
      localStorage.setItem("userData",JSON.stringify({currentAuthority:'guest'}))
      setAuthority('guest');
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      yield put({
        type:'user/delCurrentUser'
      })

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
