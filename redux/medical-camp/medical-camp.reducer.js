import actionTypes from "./medical-camp.actionTypes";

export const initState = {
  medicalCamps: null,
  selectedMedicalCamp: {},
  currentUserMedicalCamp: null,
};

function MedicalCampReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_MEDICAL_CAMPS_SUCCESS:
      return {
        ...state,
        ...{medicalCamps: action.medicalCamps},
      };
    case actionTypes.SUCCESS_GET_SELECTED_MEDICAL_CAMP:
      return {
        ...state,
        ...{selectedMedicalCamp: action.medicalCamp},
      };
    case actionTypes.GET_USER_MEDICAL_CAMPS_SUCCESS:
      return {
        ...state,
        ...{currentUserMedicalCamp: action.medicalCamp},
      };
    default:
      return state;
  }
}

export default MedicalCampReducer;
