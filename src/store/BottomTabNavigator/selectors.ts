import { RootState } from 'store';

export const selectCurrentTabIndex = (store: RootState) =>
    store.bottomTabNavigator.index;
