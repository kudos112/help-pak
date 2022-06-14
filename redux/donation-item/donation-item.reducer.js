import actionTypes from "./donation-item.actionTypes";

export const initState = {
  donationItems: null,
  selectedDonationItem: {},
  currentUserDonationItems: null,
};

function DonationItemReducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_DONATION_ITEMS_SUCCESS:
      return {
        ...state,
        ...{donationItems: action.donationItems},
      };
    case actionTypes.SUCCESS_GET_SELECTED_DONATION_ITEM:
      return {
        ...state,
        ...{selectedDonationItem: action.donationItem},
      };
    case actionTypes.DELETE_SUCCESS_SELECTED_DONATION_ITEM:
      return {
        ...state,
        ...{selectedDonationItem: {}},
      };
    case actionTypes.GET_USERS_DONATION_ITEMS_SUCCESS:
      return {
        ...state,
        ...{currentUserDonationItems: action.donationItem},
      };
    default:
      return state;
  }
}

export default DonationItemReducer;
