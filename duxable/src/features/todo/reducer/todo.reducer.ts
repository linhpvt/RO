export interface TodoAction {
  type: string;
  payload?: any;
}

export const TodoEnum = {
  TODO_ADD: 'TODO_ADD',
  TODO_ADD_SUCCESS: 'TODO_ADD_SUCCESS',
  TODO_COMPLETE: 'TODO_COMPLETE',
  TODO_COMPLETE_SUCCESS: 'TODO_COMPLETE_SUCCESS',
};

const todoInitialState = {
  list: {},
  status: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any = todoInitialState, action: TodoAction) => {
  switch (action.type) {
    case TodoEnum.TODO_ADD_SUCCESS:
      return { ...state, todo: action.payload };
    case TodoEnum.TODO_COMPLETE_SUCCESS:
      return { ...state, status: action.payload };
    default:
      return state;
  }
};
