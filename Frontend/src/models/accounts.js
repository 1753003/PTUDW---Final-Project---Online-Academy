import { getListStudent, getListLecturer, deleteUser } from '@/services/account';

const accountModel = {
  namespace: 'account',
  state: {
    studentList: [],
    lecturerList: []
  },
  effects: {
    *getStudent(_, { call, put }) {
      const response = yield call(getListStudent);
      yield put({
          type: 'getListStudent',
          payload: response,
      });
    },
    *getLecturer(_, { call, put }) {
        const response = yield call(getListLecturer);
        yield put({
            type: 'getListLecturer',
            payload: response,
        });
    },
    *deleteUser(payload, { call, put }) {
        const response = yield call(deleteUser, payload.payload);
        yield put({
            type: 'deleteUser',
            payload: response,
        });
    },
  },
  reducers: {
    getListStudent(state, action) {
      return {
            ...state,
            studentList: action.payload
        }
    },
    getListLecturer(state, action) {
        return {
            ...state,
            lecturerList: action.payload
        }
    },
    deleteUser(state, action) {
        return {
            ...state,
            studentList: action.payload[0],
            lectureList: action.payload[1]
        }
    },
  },
};

export default accountModel;