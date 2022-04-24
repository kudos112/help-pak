import {createSelector} from "reselect";

const selectMedicalAssistance = (state) => state?.medicalAssistance || {};

export const selectMedicalAssistances = createSelector(
  [selectMedicalAssistance],
  (data) => data.medicalAssistances
);

// export const selectIsLoggedIn = createSelector(
//   [selectAuth],
//   (auth) => auth.isLoggedIn
// );
