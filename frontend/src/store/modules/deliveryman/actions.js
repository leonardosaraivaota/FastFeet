export function signUpRequest(data) {
  return {
    type: '@deliveryman/SIGN_UP_REQUEST',
    payload: { data },
  };
}

export function signUpSuccess(token, user) {
  return {
    type: '@deliverman/SIGN_UP_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@deliveryman/SIGN_FAILURE',
  };
}

export function updateProfileRequest(data) {
  return {
    type: '@deliveryman/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@deliveryman/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@deliveryman/UPDATE_PROFILE_FAILURE',
  };
}
