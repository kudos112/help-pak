import actionTypes from "./fundraising.actionTypes";

export const initState = {
  fundraisings: null,
  selectedFundraising: {},
  currentUserFundraisings: null,
};

function FundraisingReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_FUNDRAISINGS_SUCCESS:
      return {
        ...state,
        ...{fundraisings: action.fundraisings},
      };
    case actionTypes.SUCCESS_GET_SELECTED_FUNDRAISING:
      return {
        ...state,
        ...{selectedFundraising: action.fundraising},
      };
    case actionTypes.DELETE_SUCCESS_SELECTED_FUNDRAISING:
      return {
        ...state,
        ...{selectedFundraising: {}},
      };
    case actionTypes.GET_USERS_FUNDRAISINGS_SUCCESS:
      return {
        ...state,
        ...{currentUserFundraisings: action.fundraising},
      };
    default:
      return state;
  }
}

export default FundraisingReducer;
