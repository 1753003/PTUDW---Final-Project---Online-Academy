import { getList, addSylabus, updateSylabus } from '@/services/sylabus';

const sylabusModel = {
  namespace: 'sylabus',
  state: {
    list: [],
  },
  effects: {
    *get(payload, { call, put }) {
      const response = yield call(getList, payload.payload);
      yield put({
          type: 'getList',
          payload: response,
      });
    },
    *add(payload, { call, put }) {
      yield call(addSylabus, payload.payload[0], payload.payload[1]);
      const response = yield call(getList, payload.payload[2]);
      yield put({
          type: 'getList',
          payload: response,
      });
    },
    *update(payload, { call }) {
      yield call(updateSylabus, payload.payload[0], payload.payload[1]);
      yield call(getList, payload.payload[2]);
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