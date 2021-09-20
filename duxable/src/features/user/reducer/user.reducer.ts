const NAMESPACE = 'USER';
export interface UserAction {
  type: string;
  payload?: any;
}
export const UserEnum = {
  ADD: `${NAMESPACE}/ADD`,
  ADD_SUCCESS: `${NAMESPACE}/ADD_SUCCESS`,
  GET: `${NAMESPACE}/GET`,
  GET_SUCCESS: `${NAMESPACE}/GET_SUCCESS`,
};

export interface UserModel {
  id?: number;
  uid?: string;
  name?: string;
  two_word_name?: string;
  four_word_name?: string;
  name_with_initials?: string;
  name_with_middle?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  male_first_name?: string;
  female_first_name?: string;
  prefix?: string;
  initials?: string;
}
interface UserState {
  list: UserModel[];
  item: UserModel;
}
const initState = {
  list: [],
  item: {},
} as UserState;

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: UserState = initState, action: UserAction) => {
  switch (action.type) {
    case UserEnum.ADD_SUCCESS:
      return { ...state, todo: action.payload };
    case UserEnum.GET_SUCCESS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
