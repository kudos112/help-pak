import actionTypes from "./medical-service.actionTypes";

export const initState = {
  medicalAssistances: {},
};

function MedicalAssistanceReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_MEDICAL_ASSISTANCES_SUCCESS:
      return {
        ...state,
        ...{medicalAssistances: action.medicalAssistances},
      };
    default:
      return state;
  }
}

export default MedicalAssistanceReducer;
