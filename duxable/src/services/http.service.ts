import { catchError, map, of } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { ajax } from 'rxjs/ajax';
import {
  setHttpFailed,
  setHttpInProgress,
  setHttpSuccess,
} from '../features/http/http.creators';

const BASE_ENPOINT = 'https://random-data-api.com';

//https://random-data-api.com/api/food/random_food

export interface MessageError {
  code?: number;
  message?: string;
}

export interface ApiResp<T> {
  code: number;
  data?: T;
  errors?: MessageError[];
}

function buildHttpResp<T>(result: AjaxResponse<ApiResp<T>>): ApiResp<T> {
  const res = result.response;
  return res;
}

function buildHttpError<T>(error: any): ApiResp<T> {
  const errors: MessageError[] = [
    { code: 1000, message: error.message || 'Network error' },
  ];
  return { code: 1000, errors };
}
export function post<T>(url: string) {
  return (action: any) =>
    ajax<ApiResp<T>>({
      url: `${BASE_ENPOINT}${url}`,
      method: 'POST',
      body: action.payload,
      headers: {},
    }).pipe(
      map((result) => buildHttpResp<T>(result)),
      // @ts-ignore
      catchError((err: any) => of(buildHttpError(err))),
    );
}

export function getById<R>(url: string): any {
  return (action: any) =>
    ajax<ApiResp<R>>({
      url: `${BASE_ENPOINT}${url}/${action.payload}`,
      method: 'GET',
      headers: {},
    }).pipe(
      map((result) => buildHttpResp<R>(result)),
      // @ts-ignore
      catchError((err: any) => of(buildHttpError(err))),
    );
}

export function getByOne<R>(url: string): any {
  return (action: any) => {
    setHttpInProgress();
    return ajax<ApiResp<R>>({
      url: `${BASE_ENPOINT}${url}`,
      method: 'GET',
      headers: {},
    }).pipe(
      map((result) => {
        setHttpSuccess();
        return buildHttpResp<R>(result);
      }),
      // @ts-ignore
      catchError((err: any) => {
        setHttpFailed();
        return of(buildHttpError(err));
      }),
    );
  };
}
