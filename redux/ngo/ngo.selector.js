import {createSelector} from "reselect";

const selectNgo = (state) => state?.ngo || {};

export const selectNgos = createSelector([selectNgo], (data) => data.ngos);

export const selectSelectedNgo = createSelector(
  [selectNgo],
  (ngo) => ngo.selectedNgo
);

export const selectUsersNgos = createSelector(
  [selectNgo],
  (ngo) => ngo.currentUserNgos
);
