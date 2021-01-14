import {
  getListCourses,
  getListCoursesWithCategory,
  deleteCourse,
  getCourseById,
  getCourseRelateById,
  getCourseSylabusById,
  getCourseReviewById,
  getCoursesNew,
  getCoursesHot,
  searchCourses,
  addCourse,
  getLecturerById,
  updateCourse,
  getCoursesTrending,
  sendCommentToCourse,
  disabledRequest
} from '@/services/course';

const courseModel = {
  namespace: 'course',
  state: {
    list: [],
    sendCommentStatus: '',
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
        payload: true,
      });
      const respone = yield call(searchCourses, value);
      yield put({
        type: 'updateSearchList',
        payload: respone,
      });
      yield put({
        type: 'loadingStatus',
        payload: false,
      });
    },
    *getFull(_, { call, put }) {
      const response = yield call(getListCoursesWithCategory);
      yield put({
        type: 'getList',
        payload: response[0],
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
    *getTrending(_, { call, put }) {
      const response = yield call(getCoursesTrending);
      yield put({
        type: 'getListTrending',
        payload: response,
      });
    },
    *delete(payload, { call, put }) {
      yield call(deleteCourse, payload.payload);
      const response = yield call(getListCourses);
      yield put({
        type: 'getList',
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
        payload: true,
      });
      const { id } = payload;
      const courseInfo = yield call(getCourseById, id);
      const courseSylabus = yield call(getCourseSylabusById, id);
      const courseRelate = yield call(getCourseRelateById, id);
      const courseReview = yield call(getCourseReviewById, id);
      const courseDetail = {
        courseInfo: courseInfo[0][0],
        courseSylabus,
        courseRelate,
        courseReview,
      };
      console.log(courseDetail);
      yield put({
        type: 'updateCourseInfo',
        payload: courseDetail,
      });
      yield put({
        type: 'loadingStatus',
        payload: false,
      });
    },
    *getLecturerCourse(payload, { call, put }) {
      const response = yield call(getLecturerById, payload.payload);
      yield put({
        type: 'getList',
        payload: response,
      });
    },
    *update(payload, { call, put }) {
      try {
        yield call(updateCourse(payload.payload[0], payload.payload[1]));
      } catch (err) {
        const response = yield call(getLecturerById, payload.payload[2]);
        yield put({
          type: 'getList',
          payload: response,
        });
      }
    },
    *updateViews({payload}, { call }) {
      try {
        yield call(updateCourse(payload.id, payload.courseData));
      } catch (err) {
        console.log(err);
      }
    },
    *sendComment({ payload }, { call, put }) {
      try {
        yield put({
          type: 'sendCommentStatus',
          payload: 'LOADING',
        });
        const response = yield call(sendCommentToCourse, payload);
        let status = response.status
        console.log('status', response.status)
        yield put({
          type: 'sendCommentStatus',
          payload: status,
        });
      } catch (err) {
        console.log(err);
        yield put({
          type: 'sendCommentStatus',
          payload: 'FAIL',
        });
      }
    },
    *resetStatus(_, { put }) {
      yield put({
        type: 'resetStatusSendComent',
      });
    },
    *filter(payload, { put }) {
      console.log(payload.payload)
      yield put({
        type: 'getList',
        payload: payload.payload
      });
    },
    *disabledRequest(payload, { call, put }) {
      yield call(disabledRequest, payload.payload.id, payload.payload.data);
    },
  },
  reducers: {
    resetStatusSendComent(state) {
      return {
        ...state,
        sendCommentStatus: '',
      };
    },
    sendCommentStatus(state, { payload }) {
      return {
        ...state,
        sendCommentStatus: payload,
      };
    },
    getList(state, action) {
      console.log(action)
      return {
        ...state,
        list: action.payload,
      };
    },
    getListHot(state, action) {
      return {
        ...state,
        listHot: action.payload,
      };
    },
    getListNew(state, action) {
      return {
        ...state,
        listNew: action.payload,
      };
    },
    getListTrending(state, action) {
      return {
        ...state,
        listTrending: action.payload,
      };
    },
    deleteItem(state, action) {
      const temp = [action.payload, []];
      return {
        ...state,
        list: temp,
      };
    },
    add(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    updateCourseInfo(state, { payload }) {
      return {
        ...state,
        courseDetail: payload,
      };
    },
    loadingStatus(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    updateSearchList(state, { payload }) {
      return {
        ...state,
        searchList: payload,
      };
    },
  },
};
export default courseModel;
