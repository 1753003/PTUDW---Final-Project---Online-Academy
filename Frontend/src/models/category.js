import { getListCategory, removeCategory, editCategory, addCategory, getListHotCategory, getMenuCategory } from '@/services/category';

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
    *getHot(_, { call, put }) {     
      // console.log("add ", payload.payload);
      const response = yield call(getListHotCategory);
      yield put({
          type: 'getListHot',
          payload: response
      });
    },
    *getMenu(_, { call, put }) {     
      // console.log("add ", payload.payload);
      const response = yield call(getMenuCategory);
      yield put({
          type: 'getListMenu',
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
    getListMenu(state, action) {
      return {
            ...state,
            listMenu: action.payload
        }
    },
    getListHot(state, action) {
      return {
            ...state,
            listHotCategory: action.payload
        }
    },
    getMenu(state, action) {
      return {
            ...state,
            listHotCategory: action.payload
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