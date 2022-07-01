import actionTypes from "./ngo.actionTypes";

export const initState = {
  ngos: null,
  selectedNgo: {},
  currentUserNgos: null,
};

function NgoReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_NGOS_SUCCESS:
      return {
        ...state,
        ...{ngos: action.ngos},
      };
    case actionTypes.SUCCESS_GET_SELECTED_NGO:
      return {
        ...state,
        ...{selectedNgo: action.ngo},
      };
    case actionTypes.DELETE_SUCCESS_SELECTED_NGO:
      return {
        ...state,
        ...{selectedNgo: {}},
      };
    case actionTypes.GET_USERS_NGOS_SUCCESS:
      return {
        ...state,
        ...{currentUserNgos: action.ngo},
      };
    default:
      return state;
  }
}

export default NgoReducer;
