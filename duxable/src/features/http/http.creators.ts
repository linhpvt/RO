import { HttpEnum } from './http.reducer';
import store from '../../store';

export const setHttpReady = () => {
  store.dispatch({ type: HttpEnum.READY });
};
export const setHttpInProgress = () => {
  store.dispatch({ type: HttpEnum.IN_PROCESS });
};
export const setHttpSuccess = () => {
  store.dispatch({ type: HttpEnum.SUCCESS });
};
export const setHttpFailed = () => {
  store.dispatch({ type: HttpEnum.FAILED });
};
