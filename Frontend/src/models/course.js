import { getListCourses, searchByKey } from '@/services/course';


const courseModel = {
  namespace: 'course',
  state: {
    list: [],
  },
  effects: {
    *get(_, { call, put }) {
      yield put({
        type: 'setLoading',
        payload: true
      })
      const response = yield call(getListCourses);
      yield put({
        type: 'getList',
        payload: response,
      });
      yield put({
        type: 'setLoading',
        payload: false
      })
    },
    *search({ payload }, { call, put }) {
      yield put({
        type: 'setLoading',
        payload: true
      })
      const { value } = payload;
      const response = yield call(searchByKey, value);
      yield put({
        type: 'getList',
        payload: response,
      });
      yield put({
        type: 'setLoading',
        payload: false
      })
    },
  },
  reducers: {
    getList(state, { payload }) {
      return {
        ...state,
        list: payload
      }
    },
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload
      }
    }
  },
};
export default courseModel;