import { getListCourses, getListCoursesWithCategory, deleteCourse, addCourse } from '@/services/course';


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
    *getFull(_, { call, put }) {
      const response = yield call(getListCoursesWithCategory);
      yield put({
          type: 'getList',
          payload: response,
      });
    },
    *delete(payload, { call, put }) {
      const response = yield call(deleteCourse, payload.payload);
      yield put({
          type: 'delete',
          payload: response,
      });
    },
    *add(payload, { call, put }) {
      const response = yield call(addCourse, payload.payload);
      yield put({
          type: 'add',
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
    delete(state, action) {
      return {
        ...state,
        list: action.payload
      }
    },
    add(state, action) {
      return {
        ...state,
        list: action.payload
      }
    }
  },
};
export default courseModel;