import actionTypes from "./ngo.actionTypes";

export function createNgo(payload, callback) {
  return {type: actionTypes.CREATE_NGO, payload, callback};
}

export function getNgos(
  callback,
  name = "",
  city = "",
  reason = "",
  page = 1,
  bankName = ""
) {
  return {
    type: actionTypes.GET_NGOS_REQUEST,
    name,
    city,
    reason,
    bankName,
    page,
    callback,
  };
}

export function getNgosSuccess(ngos) {
  return {
    type: actionTypes.GET_NGOS_SUCCESS,
    ngos,
  };
}

export function getSelectedNgo(id, callback) {
  return {type: actionTypes.GET_SELECTED_NGO, id, callback};
}

export function getSelectedNgoSuccess(ngo) {
  return {
    type: actionTypes.SUCCESS_GET_SELECTED_NGO,
    ngo,
  };
}

export function deleteSelectedNgo(id, callback) {
  return {type: actionTypes.DELETE_SELECTED_NGO, id, callback};
}

export function deleteSelectedNgoSuccess() {
  return {
    type: actionTypes.DELETE_SUCCESS_SELECTED_NGO,
  };
}

export function getUsersNgo(id, callback) {
  return {type: actionTypes.GET_USERS_NGOS_REQUEST, id, callback};
}

export function getUsersNgoSuccess(ngo) {
  return {
    type: actionTypes.GET_USERS_NGOS_SUCCESS,
    ngo,
  };
}
