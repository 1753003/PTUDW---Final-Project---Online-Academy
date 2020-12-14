import { getListCategory, removeCategory } from '@/services/category';

const categoryModel = {
  namespace: 'category',
  state: {
    list: [],
  },
  effects: {
    *remove(payload, { call, put }) {     
        const response = yield call(removeCategory, payload.payload);
        yield put({
            type: 'removeItem',
            payload: response,
        });
    },
    *get(_, { call, put }) {
      const response = yield call(getListCategory);
      yield put({
          type: 'getList',
          payload: response,
      });
  },
  },
  reducers: {
    getList(state, action) {
      console.log("get list running");
      return {
            ...state,
            list: action.payload
        }
    },
    removeItem(state, action) {
      console.log("remove running");
      return {
          ...state,
          //list: action.payload
      }
    }
  },
};

export default categoryModel;