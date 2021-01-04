import { queryCurrent, add, queryCurrentFavoriteCourse, queryCurrentRegistedCourse, addCourseToRegister, addCourseToFavorite, delFavoriteCourse, resetRequest, resetConfirm, getRegistedCourseById, setDone, setProgress } from '@/services/user';
import { getCourseById } from '@/services/course';

import { router } from 'umi';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    status: ''
  },
  effects: {
    *resetPasswordConfirm(payload, { call, put }) {
      console.log('model')
      const response = yield call(resetConfirm, payload.payload)
      yield put({
        type: 'requestStatus',
        payload: response,
      });
      // router.replace('/');
    },
    *resetPasswordRequest(payload, { call, put }) {
      console.log('model')
      const response = yield call(resetRequest, payload.payload)
      yield put({
        type: 'requestStatus',
        payload: response,
      });

      // router.replace('/');
    },
    *register(payload, { call, put }) {
      // console.log('payload',payload)
      const response = yield call(add, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      router.replace('/');
      return response;
    },
    *fetchCurrent({ payload }, { call, put }) {
      // console.log("fetchCurrent")
      const response = yield call(queryCurrent, payload.uid);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchCurrentFavorite({ payload }, { call, put }) {
      // console.log("fetchCurrent")
      const response = yield call(queryCurrentFavoriteCourse, payload.uid);
      const favoriteCourses = [];
      for (let i = 0; i < response.length; i++) {
        const course = yield call(getCourseById, response[i].courseId);
        favoriteCourses.push(course[0][0]);
      }
      yield put({
        type: 'updateFavorite',
        payload: favoriteCourses,
      });
    },
    *fetchCurrentRegister({ payload }, { call, put }) {
      // console.log("fetchCurrent")
      const registedCourses = [];
      const response = yield call(queryCurrentRegistedCourse, payload.uid);
      console.log(response);
      for (let i = 0; i < response.length; i++) {
        const course = yield call(getCourseById, response[i].courseID);
        const finalCourse = {
          ...response[i],
          ...course[0][0]
        }
        registedCourses.push(finalCourse);
      }
      yield put({
        type: 'updateRegister',
        payload: registedCourses,
      });
    },
    *registCourse({ payload }, { call, put }) {
      yield put({
        type: 'registCourseStatus',
        payload: { status: 'UPLOADING' },
      });
      try {
        yield call(addCourseToRegister, payload);
        yield put({
          type: 'registCourseStatus',
          payload: { status: 'SUCCESS' },
        });
      } catch (e) {
        yield put({
          type: 'registCourseStatus',
          payload: { status: 'FAIL' },
        });
      }
    },
    *addToFavorite({ payload }, { call, put }) {
      yield put({
        type: 'addToFavoriteStatus',
        payload: { status: 'UPLOADING' },
      });
      try {
        yield call(addCourseToFavorite, payload);
        yield put({
          type: 'addToFavoriteStatus',
          payload: { status: 'SUCCESS' },
        });
      } catch (e) {
        yield put({
          type: 'addToFavoriteStatus',
          payload: { status: 'FAIL' },
        });
      }
    },
    *delFavorite({ payload }, { call, put }) {
      yield put({
        type: 'deleteFavoriteStatus',
        payload: { status: 'UPLOADING' },
      });
      try {
        yield call(delFavoriteCourse, payload);
        yield put({
          type: 'deleteFavoriteStatus',
          payload: { status: 'SUCCESS' },
        });
      } catch (e) {
        yield put({
          type: 'deleteFavoriteStatus',
          payload: { status: 'FAIL' },
        });
      }
    },
    *setDoneSession({ payload }, { call }) {
      yield call(setDone, payload);
    },
    *getRegisterById({ payload }, { call, put }) {
      const response = yield call(getRegistedCourseById, payload);
      yield put({
        type: 'setSingleRegistedCourse',
        payload: response,
      });
    },
    *setCourseProgress({ payload }, { call, put }) {
      yield call(setProgress, payload)
    },
    *resetStatus(_, { put }) {
      yield put({
        type: 'deleteFavoriteStatus',
        payload: { status: 'UPLOADING' },
      });
    },
  },
  reducers: {
    requestStatus(state, action) {
      return { ...state, status: action.payload }
    },
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    delCurrentUser(state) {
      // console.log(state)
      return { ...state, currentUser: {} || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    updateFavorite(state, { payload }) {
      return { ...state, favoriteCourses: payload }
    },
    updateRegister(state, { payload }) {
      return { ...state, registedCourses: payload }
    },
    registCourseStatus(state, { payload }) {
      return { ...state, registCourseStatus: payload.status }
    },
    addToFavoriteStatus(state, { payload }) {
      return { ...state, addToFavoriteStatus: payload.status }
    },
    deleteFavoriteStatus(state, { payload }) {
      return { ...state, deleteFavoriteStatus: payload.status }
    },
    resetStatus(state) {
      return { ...state, registCourseStatus: '', addToFavoriteStatus: '', deleteFavoriteStatus: '' }
    },
    setSingleRegistedCourse(state, { payload }) {
      return { ...state, singleRegistedCourse: payload[0] }
    }
  },

};
export default UserModel;
