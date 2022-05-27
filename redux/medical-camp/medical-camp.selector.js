import {createSelector} from "reselect";

const selectMedicalCamp = (state) => state?.medicalCamp || {};

export const selectMedicalCamps = createSelector(
  [selectMedicalCamp],
  (data) => data.medicalCamps
);

export const selectSelectedMedicalCamp = createSelector(
  [selectMedicalCamp],
  (medicalCamp) => medicalCamp.selectedMedicalCamp
);

export const selectUsersMedicalCamp = createSelector(
  [selectMedicalCamp],
  (medicalCamp) => medicalCamp.currentUserMedicalCamp
);
