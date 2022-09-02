import { RootState, store } from 'store';

const selectGlassColor = (store: RootState) => store.glassSettings.color;
