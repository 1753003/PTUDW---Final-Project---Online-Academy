import { queryCurrent, add} from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  }, 
  effects: {
    *register(payload, { call, put }) {
      console.log('payload',payload)
      const response = yield call(add, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
    },
    *fetchCurrent({payload}, { call, put }) {
      console.log("fetchCurrent")
      const response = yield call(queryCurrent, payload.uid);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    delCurrentUser(state) {
      console.log(state)
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
