export interface HttpAction {
  type: string;
  payload?: any;
}

export const HttpEnum = {
  READY: 'READY',
  IN_PROCESS: 'IN_PROCESS',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

const initState = {
  status: HttpEnum.READY,
};

export default function httpStatusReducer(
  state: any = initState,
  action: HttpAction,
) {
  switch (action.type) {
    case HttpEnum.READY:
      return { ...state, status: action.type };
    case HttpEnum.IN_PROCESS:
      return { ...state, status: action.type };
    case HttpEnum.SUCCESS:
      return { ...state, status: action.type };
    case HttpEnum.FAILED:
      return { ...state, status: action.type };
    default:
      return state;
  }
}
