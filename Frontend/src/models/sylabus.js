import { getList } from '@/services/sylabus';

const sylabusModel = {
  namespace: 'sylabus',
  state: {
    list: [],
  },
  effects: {
    *get(payload, { call, put }) {
      console.log("getModel",payload);
      const response = yield call(getList, payload.payload);
      yield put({
          type: 'getList',
          payload: response,
      });
    },
  },
  reducers: {   
   
    getList(state, action) {
      return {
            ...state,
            list: action.payload
        }
    },
    removeItem(state, action) {
      return {
          ...state,
          list: action.payload
      }
    },
    editItem(state, action) {
      return {
        ...state,
        list: action.payload
      }    
    },
    addItem(state, action) {
      return {
        ...state,
        list: action.payload
      }
    }
  },
};

export default sylabusModel;