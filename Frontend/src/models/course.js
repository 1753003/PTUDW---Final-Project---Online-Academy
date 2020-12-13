import { getListCourses } from '@/services/course';


const courseModel = {
  namespace: 'course',
  state: {
    list: [],
  },
  effects: {
    *get(_, { call, put }) {
        const response = yield call(getListCourses);
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
  },
};
export default courseModel;