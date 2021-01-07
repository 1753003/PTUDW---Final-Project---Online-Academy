import { getListCategory, removeCategory, editCategory, addCategory } from '@/services/category';

const categoryModel = {
  namespace: 'category',
  state: {
    list: [],
  },
  effects: {
    *remove(payload, { call, put }) {     
        const response = yield call(removeCategory, payload.payload);
        // console.log(response);
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
    *edit(payload, { call, put }) {     
      const response = yield call(editCategory, payload.payload[0], payload.payload[1]);
      yield put({
          type: 'editItem',
          payload: response
      });
    },
    *add(payload, { call, put }) {     
      // console.log("add ", payload.payload);
      const response = yield call(addCategory, payload.payload[0], payload.payload[1]);
      yield put({
          type: 'addItem',
          payload: response
      });
    },
  },
  reducers: {   
    getList(state, action) {
      // console.log(state.list);
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

export default categoryModel;