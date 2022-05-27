import {createSelector} from "reselect";

const selectDonationItem = (state) => state?.donationItem || {};

export const selectDonationItems = createSelector(
  [selectDonationItem],
  (data) => data.donationItems
);

export const selectSelectedDonationItem = createSelector(
  [selectDonationItem],
  (donationItem) => donationItem.selectedDonationItem
);

export const selectUsersDonationItems = createSelector(
  [selectDonationItem],
  (donationItem) => donationItem.currentUserDonationItems
);
