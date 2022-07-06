import actionTypes from "./medical-service.actionTypes";

export function createMedicalAssistance(payload, callback) {
  return {type: actionTypes.CREATE_MEDICAL_SERIVCE, payload, callback};
}

export function getMedicalAssistances(
  callback,
  name = "",
  city = "",
  serviceType = "",
  page = 1
) {
  return {
    type: actionTypes.GET_MEDICAL_ASSISTANCES_REQUEST,
    name,
    city,
    serviceType,
    page,
    callback,
  };
}

export function getMedicalAssistancesSuccess(medicalAssistances) {
  return {
    type: actionTypes.GET_MEDICAL_ASSISTANCES_SUCCESS,
    medicalAssistances,
  };
}

export function getSelectedMedicalAssistance(id, callback) {
  return {type: actionTypes.GET_SELECTED_MEDICAL_ASSISTANCE, id, callback};
}

export function getSelectedMedicalAssistanceSuccess(medicalAssistance) {
  return {
    type: actionTypes.SUCCESS_GET_SELECTED_MEDICAL_ASSISTANCE,
    medicalAssistance,
  };
}

export function deleteSelectedMedicalAssistance(id, callback) {
  return {type: actionTypes.DELETE_SELECTED_MEDICAL_ASSISTANCE, id, callback};
}

export function deleteSelectedMedicalAssistanceSuccess() {
  return {
    type: actionTypes.DELETE_SUCCESS_SELECTED_MEDICAL_ASSISTANCE,
  };
}

export function getMedicalAssistanceByUserId(id, callback) {
  return {type: actionTypes.GET_USER_MEDICAL_ASSISTANCES_REQUEST, id, callback};
}

export function getMedicalAssistanceByUserIdSucess(medicalAssistance) {
  return {
    type: actionTypes.GET_USER_MEDICAL_ASSISTANCES_SUCCESS,
    medicalAssistance,
  };
}
