import {createSelector} from "reselect";

const selectFundraising = (state) => state?.fundraising || {};

export const selectFundraisings = createSelector(
  [selectFundraising],
  (data) => data.fundraisings
);

export const selectSelectedFundraising = createSelector(
  [selectFundraising],
  (fundraising) => fundraising.selectedFundraising
);

export const selectUsersFundraisings = createSelector(
  [selectFundraising],
  (fundraising) => fundraising.currentUserFundraisings
);
