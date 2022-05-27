import actionTypes from "./medical-camp.actionTypes";

export function createMedicalCamp(payload, callback) {
  return {type: actionTypes.CREATE_MEDICAL_CAMP, payload, callback};
}

export function getMedicalCamps(callback, name = "", city = "", campType = "") {
  return {
    type: actionTypes.GET_MEDICAL_CAMPS_REQUEST,
    name,
    city,
    campType,
    callback,
  };
}

export function getMedicalCampsSuccess(medicalCamps) {
  return {
    type: actionTypes.GET_MEDICAL_CAMPS_SUCCESS,
    medicalCamps,
  };
}

export function getSelectedMedicalCamp(id, callback) {
  return {type: actionTypes.GET_SELECTED_MEDICAL_CAMP, id, callback};
}

export function getSelectedMedicalCampSuccess(medicalCamp) {
  return {
    type: actionTypes.SUCCESS_GET_SELECTED_MEDICAL_CAMP,
    medicalCamp,
  };
}

export function getUsersMedicalCamp(id, callback) {
  return {type: actionTypes.GET_USER_MEDICAL_CAMPS_REQUEST, id, callback};
}

export function getUsersMedicalCampSuccess(medicalCamp) {
  return {
    type: actionTypes.GET_USER_MEDICAL_CAMPS_SUCCESS,
    medicalCamp,
  };
}
