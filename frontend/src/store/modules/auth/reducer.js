import produce from 'immer';

const INITIAL_STATE = {
  // token: '123',
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        // return produce(state, draft => {
        draft.loading = true;
        // });
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        // return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        // });
        break;
      }
      case '@auth/SIGN_FAILURE': {
        // return produce(state, draft => {
        draft.loading = false;
        // });
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
      // return state;
    }
  });
}
