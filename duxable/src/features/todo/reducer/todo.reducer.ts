import { AppAction } from '../../../store';
const NAMESPACE = 'TODO';
export const TodoEnum = {
  ADD: `${NAMESPACE}/ADD`,
  ADD_SUCCESS: `${NAMESPACE}/ADD_SUCCESS`,
  COMPLETE: `${NAMESPACE}/COMPLETE`,
  COMPLETE_SUCCESS: `${NAMESPACE}/COMPLETE_SUCCESS`,
  LIST: `${NAMESPACE}/LIST`,
  LIST_SUCCESS: `${NAMESPACE}/LIST_SUCCESS`,
};

const todoInitialState = {
  list: [],
  item: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any = todoInitialState, action: AppAction<any>) => {
  switch (action.type) {
    case TodoEnum.ADD_SUCCESS:
      return { ...state, item: action.payload };
    case TodoEnum.COMPLETE_SUCCESS:
      return { ...state, status: action.payload };
    case TodoEnum.LIST_SUCCESS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
