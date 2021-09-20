import { StateObservable } from 'redux-observable';
import { catchError, map, of } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { ajax } from 'rxjs/ajax';
import {
  setHttpFailed,
  setHttpInProgress,
  setHttpSuccess,
} from '../features/http/http.creators';
import { StateType } from '../store';

const BASE_ENPOINT = 'http://localhost:8081';

export interface MessageError {
  code?: number;
  message?: string;
}

export interface ApiResp<T> {
  code: number;
  data?: T;
  errors?: MessageError[];
}
export interface HttpOptions {
  showSpinner: boolean;
}
/**
 * Build data object from http response
 * @param result Http object contains all response information
 * @returns Json object responded from server
 */
function buildHttpResp<T>(result: AjaxResponse<ApiResp<T>>): ApiResp<T> {
  const res = result.response;
  return res;
}

/**
 * Build error object from a http error
 * @param error contain error for a API request
 * @returns A json object that holds the request error such as network error.
 */
function buildHttpError<T>(error: any): ApiResp<T> {
  const errors: MessageError[] = [
    { code: 1000, message: error.message || 'Network error' },
  ];
  return { code: 1000, errors };
}

function startInprogress(options: HttpOptions) {
  if (options.showSpinner) {
    setHttpInProgress();
  }
}
function endSuccess(options: HttpOptions) {
  if (options.showSpinner) {
    setHttpSuccess();
  }
}
function endFailed(options: HttpOptions) {
  if (options.showSpinner) {
    setHttpFailed();
  }
}
function buildHeaders(state: StateObservable<StateType>): any {
  return {};
}
export function post<T>(
  url: string,
  state: StateObservable<StateType>,
  options: HttpOptions = { showSpinner: true },
) {
  return (action: any) => {
    // set status to in-progress
    startInprogress(options);
    return ajax<ApiResp<T>>({
      url: `${BASE_ENPOINT}${url}`,
      method: 'POST',
      body: { ...action.payload, id: action.payload.id || Date.now() },
      headers: buildHeaders(state),
    }).pipe(
      map((result) => {
        // set status to success
        endSuccess(options);
        return buildHttpResp<T>(result);
      }),
      // @ts-ignore
      catchError((err: any) => {
        // set status to failed
        endFailed(options);
        return of(buildHttpError(err));
      }),
    );
  };
}

export function getById<R>(
  url: string,
  state: StateObservable<StateType>,
  options: HttpOptions,
): any {
  return (action: any) => {
    startInprogress(options);
    return ajax<ApiResp<R>>({
      url: `${BASE_ENPOINT}${url}/${action.payload}`,
      method: 'GET',
      headers: buildHeaders(state),
    }).pipe(
      map((result) => {
        endSuccess(options);
        return buildHttpResp<R>(result);
      }),
      // @ts-ignore
      catchError((err: any) => {
        endFailed(options);
        return of(buildHttpError(err));
      }),
    );
  };
}

export function getByOne<R>(
  url: string,
  state: StateObservable<StateType>,
  options: HttpOptions,
): any {
  return (action: any) => {
    startInprogress(options);
    return ajax<ApiResp<R>>({
      url: `${BASE_ENPOINT}${url}`,
      method: 'GET',
      headers: buildHeaders(state),
    }).pipe(
      map((result) => {
        endSuccess(options);
        return buildHttpResp<R>(result);
      }),
      // @ts-ignore
      catchError((err: any) => {
        endFailed(options);
        return of(buildHttpError(err));
      }),
    );
  };
}

export function getAll<R>(
  url: string,
  state: StateObservable<StateType>,
  options: HttpOptions = { showSpinner: true },
): any {
  return (action: any) => {
    startInprogress(options);
    return ajax<ApiResp<R>>({
      url: `${BASE_ENPOINT}${url}`,
      method: 'GET',
      headers: buildHeaders(state),
    }).pipe(
      map((result) => {
        endSuccess(options);
        return buildHttpResp<R>(result);
      }),
      // @ts-ignore
      catchError((err: any) => {
        endFailed(options);
        return of(buildHttpError(err));
      }),
    );
  };
}
