import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function deliveryman(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@deliveryman/SIGN_UP_REQUEST': {
        draft.profile = action.payload.user;
        break;
      }
      case '@deliveryman/SIGN_UP_SUCCESS': {
        draft.profile = action.payload.user;
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@deliveryman/SIGN_FAILURE': {
        draft.profile = action.payload.user;
        draft.loading = false;
        break;
      }

      case '@deliveryman/UPDATE_PROFILE_REQUEST': {
        draft.profile = action.payload.profile;
        break;
      }

      case '@deliveryman/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      case '@deliveryman/UPDATE_PROFILE_FAILURE': {
        draft.profile = null;
        break;
      }
      default:
      // return state;
    }
  });
}
