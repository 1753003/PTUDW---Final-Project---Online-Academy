import Cookies from 'js-cookie';
import { getListCourses, getListCoursesWithCategory, deleteCourse, getCourseById, 
  getCourseRelateById, getCourseSylabusById, getCourseReviewById, getCoursesNew, getCoursesHot, 
  searchCourses, addCourse,getLecturerById } from '@/services/course';


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
    *search({ payload }, { put, call }) {
      const { value } = payload;
      yield put({
        type: 'loadingStatus',
        payload: true
      })
      const respone = yield call(searchCourses, value);
      yield put({
        type: 'updateSearchList',
        payload: respone
      });
      yield put({
        type: 'loadingStatus',
        payload: false
      })
    },
    *getFull(_, { call, put }) {
      const response = yield call(getListCoursesWithCategory);
      yield put({
        type: 'getList',
        payload: response,
      });
    },
    *getHot(_, { call, put }) {
      const response = yield call(getCoursesHot);
      console.log(response);
      yield put({
        type: 'getListHot',
        payload: response,
      });
    },
    *getNew(_, { call, put }) {
      const response = yield call(getCoursesNew);
      yield put({
        type: 'getListNew',
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
    *getSingleCourse({ payload }, { call, put }) {
      yield put({
        type: 'loadingStatus',
        payload: true
      })
      const { id } = payload;
      const courseInfo = yield call(getCourseById, id);
      const courseSylabus = yield call(getCourseSylabusById, id);
      const courseRelate = yield call(getCourseRelateById, id);
      const courseReview = yield call(getCourseReviewById, id);
      const courseDetail = {
        courseInfo: courseInfo[0][0],
        courseSylabus,
        courseRelate,
        courseReview
      }
      console.log(courseDetail);
      yield put({
        type: 'updateCourseInfo',
        payload: courseDetail
      });
      yield put({
        type: 'loadingStatus',
        payload: false
      })

    },
    *getLecturerCourse(payload, { call, put }) {

      const response = yield call(getLecturerById, payload.payload);
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
    getListHot(state, action) {
      return {
        ...state,
        listHot: action.payload
      }
    },
    getListNew(state, action) {
      return {
        ...state,
        listNew: action.payload
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
    },
    updateCourseInfo(state, { payload }) {
      return {
        ...state,
        courseDetail: payload
      }
    },
    loadingStatus(state, { payload }) {
      return {
        ...state,
        loading: payload
      }
    },
    updateSearchList(state, { payload }) {
      return {
        ...state,
        searchList: payload
      }
    },
  },
};
export default courseModel;