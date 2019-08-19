import { createSelector } from 'reselect';


const selectDirectory = (rootReducer) => rootReducer.directory;

export const selectDirectorySections = createSelector([selectDirectory], 
    (directory) => directory.sections);