import { queryCurrent, add, queryCurrentFavoriteCourse, queryCurrentRegistedCourse, addCourseToRegister, 
  addCourseToFavorite, delFavoriteCourse, resetPasswordRequest, resetConfirm, getRegistedCourseById, setDone, 
  setProgress, queryEditProfile, resetEmailRequest, confirmCode, changePassword, resetRequest,
  confirmCodeWithEmail, changePasswordWithEmail } from '@/services/user';
import { getCourseById } from '@/services/course';

import { router } from 'umi';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    status: '',
    confirmStatus : false,
  },
  effects: {
    *resetPasswordConfirm(payload, { call, put }) {
      // console.log('model')
      const response = yield call(resetConfirm, payload.payload)
      yield put({
        type: 'requestStatus',
        payload: response,
      });
      // router.replace('/');
    },
    *resetPasswordRequest(payload, { call, put }) {
      // console.log('model')
      const response = yield call(resetPasswordRequest, payload.payload)
      yield put({
        type: 'requestStatus',
        payload: response,
      });

      // router.replace('/');
    },
    *forgotPasswordRequest(payload, { call, put }) {
      // console.log('model')
      const response = yield call(resetRequest, payload.payload)
      yield put({
        type: 'requestStatus',
        payload: response,
      });

      // router.replace('/');
    },
    *resetEmailRequest(payload, { call, put }) {
      // console.log('model')
      const response = yield call(resetEmailRequest, payload.payload)
      yield put({
        type: 'requestStatus',
        payload: response,
      });

      // router.replace('/');
    },
    *register(payload, { call, put }) {
      // console.log('payload',payload)
      const response = yield call(add, payload);
      // console.log('asdhfgjhs',response.data.signup)
      yield put({
        type: 'requestStatus',
        payload: response,
      });
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      var redirectHome = response.data.signup?response.data.signup:"success"
      if(redirectHome == 'success')
        router.push('/user/login')
      return response;
    },
    *fetchCurrent( payload , { call, put }) {
      // console.log("fetchCurrent")
      console.log(payload);
      const response = yield call(queryCurrent, payload.payload.uid);
      console.log("aa",response);
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
      // console.log('register', payload)
      yield put({
        type: 'registCourseStatus',
        payload: { status: 'UPLOADING' },
      });
      try {
        const response = yield call(addCourseToRegister, payload);
        let status = response.data.available?'SUCCESS': 'EXISTED'
        // console.log('status', response.data)
        yield put({
          type: 'registCourseStatus',
          payload: { status: status },
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
        const response = yield call(addCourseToFavorite, payload);
        
        let status = response.data.available?'SUCCESS': 'EXISTED'
        console.log('res', status)
        yield put({
          type: 'addToFavoriteStatus',
          payload: { status: status},
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
        payload: response[0],
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
    *editProfile(payload, { call, put }) {
      // console.log('model')
      console.log(payload.payload)
      const response = yield call(queryEditProfile, payload.payload[0], payload.payload[1])
      yield put({
        type: 'requestEdit',
        payload: response,
      });
      // router.replace('/');
    },
    *confirmCode(payload, { call, put }) {
      // console.log('model')
      console.log(payload.payload)
      const response = yield call(confirmCode, payload.payload[0], payload.payload[1])
      yield put({
        type: 'confirmCodeRequest',
        payload: response,
      });
      // router.replace('/');
    },
    *confirmCodeWithEmail(payload, { call, put }) {
      // console.log('model')
      console.log(payload.payload)
      const response = yield call(confirmCodeWithEmail, payload.payload[0], payload.payload[1])
      console.log(response)
      yield put({
        type: 'confirmCodeRequest',
        payload: response,
      });
      // router.replace('/');
    },
    *confirmStatusFalse(_,{put}) {
      yield put({
        type: 'setConfirmStatusFalse'
      })
    },
    *changePassword(payload, { call, put }) {
      yield call(changePassword, payload.payload[0], payload.payload[1]);
    },
    *changePasswordWithEmail(payload, { call }) {
      yield call(changePasswordWithEmail, payload.payload[0], payload.payload[1]);
    },
  },
  reducers: {
    requestStatus(state, action) {
      console.log(action.payload.data);  
      return { ...state, status: action.payload.data }
    },
    saveCurrentUser(state, action) {
      console.log("bcd",action.payload);
      return { ...state, currentUser: action.payload };
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
    },
    requestEdit(state, action) {
      return { ...state, currentUser: action.payload }
    },
    confirmCodeRequest(state, action) {
      console.log(action.payload.data)
      return { ...state, confirmStatus: action.payload.data }
    },
    setConfirmStatusFalse(state) {
      return {
        ...state,
        confirmStatus: false
      }
    }
  },

};
export default UserModel;
