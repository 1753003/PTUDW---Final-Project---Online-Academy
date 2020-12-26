import { queryCurrent, add} from '@/services/user';
import { router } from 'umi';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  }, 
  effects: {
    *resetPassword(payload, {call, put}){
      console.log("resetRequest", payload);
      const response = true;
      yield put({
        type: 'requestStatus',
        payload: response,
      });
    },
    *register(payload, { call, put }) {
      // console.log('payload',payload)
      const response = yield call(add, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      router.replace('/');
      return response;
    },
    *fetchCurrent({payload}, { call, put }) {
      // console.log("fetchCurrent")
      const response = yield call(queryCurrent, payload.uid);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    requestStatus(state, action){
      return { ...state, status: action.paload || false}
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    delCurrentUser(state) {
      // console.log(state)
      return { ...state, currentUser: {} || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
