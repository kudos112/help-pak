import actionTypes from "./medical-service.actionTypes";

export const initState = {
  medicalAssistances: null,
  selectedMedicalAssistance: {},
};

function MedicalAssistanceReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_MEDICAL_ASSISTANCES_SUCCESS:
      return {
        ...state,
        ...{medicalAssistances: action.medicalAssistances},
      };
    case actionTypes.SUCCESS_GET_SELECTED_MEDICAL_ASSISTANCE:
      return {
        ...state,
        ...{selectedMedicalAssistance: action.medicalAssistance},
      };
    default:
      return state;
  }
}

export default MedicalAssistanceReducer;
