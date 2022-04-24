import actionTypes from "./medical-service.actionTypes";

export function createMedicalAssistance(payload, callback) {
  return {type: actionTypes.CREATE_MEDICAL_SERIVCE, payload, callback};
}

export function getMedicalAssistances(callback) {
  return {type: actionTypes.GET_MEDICAL_ASSISTANCES_REQUEST, callback};
}

export function getMedicalAssistancesSuccess(medicalAssistances) {
  return {
    type: actionTypes.GET_MEDICAL_ASSISTANCES_SUCCESS,
    medicalAssistances,
  };
}
