import actionTypes from "./fundraising.actionTypes";

export function createFundraising(payload, callback) {
  return {type: actionTypes.CREATE_FUNDRAISING, payload, callback};
}

export function getFundraisings(
  callback,
  name = "",
  city = "",
  reason = "",
  bankName = "",
  page = 1
) {
  return {
    type: actionTypes.GET_FUNDRAISINGS_REQUEST,
    name,
    city,
    reason,
    bankName,
    page,
    callback,
  };
}

export function getFundraisingsSuccess(fundraisings) {
  return {
    type: actionTypes.GET_FUNDRAISINGS_SUCCESS,
    fundraisings,
  };
}

export function getSelectedFundraising(id, callback) {
  return {type: actionTypes.GET_SELECTED_FUNDRAISING, id, callback};
}

export function getSelectedFundraisingSuccess(fundraising) {
  return {
    type: actionTypes.SUCCESS_GET_SELECTED_FUNDRAISING,
    fundraising,
  };
}

export function deleteSelectedFundraising(id, callback) {
  return {type: actionTypes.DELETE_SELECTED_FUNDRAISING, id, callback};
}

export function deleteSelectedFundraisingSuccess() {
  return {
    type: actionTypes.DELETE_SUCCESS_SELECTED_FUNDRAISING,
  };
}

export function getUsersFundraising(id, callback) {
  return {type: actionTypes.GET_USERS_FUNDRAISINGS_REQUEST, id, callback};
}

export function getUsersFundraisingSuccess(fundraising) {
  return {
    type: actionTypes.GET_USERS_FUNDRAISINGS_SUCCESS,
    fundraising,
  };
}
