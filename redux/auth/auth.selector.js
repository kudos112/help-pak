import {createSelector} from "reselect";

const selectAuth = (state) => state?.auth || {};

export const selectUser = createSelector([selectAuth], (auth) => auth.user);

export const selectIsLoggedIn = createSelector(
  [selectAuth],
  (auth) => auth.isLoggedIn
);
