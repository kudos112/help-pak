import {createSelector} from "reselect";

const selectMedicalAssistance = (state) => state?.medicalAssistance || {};

export const selectMedicalAssistances = createSelector(
  [selectMedicalAssistance],
  (data) => data.medicalAssistances
);

export const selectSelectedMedicalAssistance = createSelector(
  [selectMedicalAssistance],
  (medicalAssistance) => medicalAssistance.selectedMedicalAssistance
);

export const selectUsersMedicalAssistance = createSelector(
  [selectMedicalAssistance],
  (medicalAssistance) => medicalAssistance.currentUserMedicalAssistance
);
