import actionTypes from "./medical-service.actionTypes";

export function createMedicalAssistance(payload, callback) {
  return {type: actionTypes.CREATE_MEDICAL_SERIVCE, payload, callback};
}

export function getMedicalAssistances(
  callback,
  name = "",
  city = "",
  serviceType = ""
) {
  return {
    type: actionTypes.GET_MEDICAL_ASSISTANCES_REQUEST,
    name,
    city,
    serviceType,
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
