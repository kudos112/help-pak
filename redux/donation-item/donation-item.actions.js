import actionTypes from "./donation-item.actionTypes";

export function createDonationItem(payload, callback) {
  return {type: actionTypes.CREATE_DONATION_ITEM, payload, callback};
}

export function getDonationItems(
  callback,
  name = "",
  city = "",
  category = "",
  condition = ""
) {
  return {
    type: actionTypes.GET_DONATION_ITEMS_REQUEST,
    name,
    city,
    category,
    condition,
    callback,
  };
}

export function getDonationItemsSuccess(donationItems) {
  return {
    type: actionTypes.GET_DONATION_ITEMS_SUCCESS,
    donationItems,
  };
}

export function getSelectedDonationItem(id, callback) {
  return {type: actionTypes.GET_SELECTED_DONATION_ITEM, id, callback};
}

export function getSelectedDonationItemSuccess(donationItem) {
  return {
    type: actionTypes.SUCCESS_GET_SELECTED_DONATION_ITEM,
    donationItem,
  };
}

export function deleteSelectedDonationItem(id, callback) {
  return {type: actionTypes.DELETE_SELECTED_DONATION_ITEM, id, callback};
}

export function deleteSelectedDonationItemSuccess() {
  return {
    type: actionTypes.DELETE_SUCCESS_SELECTED_DONATION_ITEM,
  };
}

export function getUsersDonationItem(id, callback) {
  return {type: actionTypes.GET_USERS_DONATION_ITEMS_REQUEST, id, callback};
}

export function getUsersDonationItemSuccess(donationItem) {
  return {
    type: actionTypes.GET_USERS_DONATION_ITEMS_SUCCESS,
    donationItem,
  };
}
