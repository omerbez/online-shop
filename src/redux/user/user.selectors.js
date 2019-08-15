import { createSelector } from 'reselect';


const selectUser = (rootReducer) => rootReducer.user;

export const selectCurrentUser = createSelector([selectUser], (user) => user.currentUser);