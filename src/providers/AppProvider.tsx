import type {User} from '../types';
import createCtx from '../utils/createCtx';
import {useReducer} from 'react';

interface Context {
  state: State;
  setUser: (user: User) => void;
  resetUser: () => void;
}

const [useCtx, Provider] = createCtx<Context>();

export enum ActionType {
  ResetUser = 'reset-user',
  SetUser = 'set-user',
}

export interface State {
  user: User;
}

const initialState: State = {
  user: {
    displayName: '',
    age: 0,
    job: '',
  },
};

interface SetUserAction {
  type: ActionType.SetUser;
  payload: User;
}

interface ResetUserAction {
  type: ActionType.ResetUser;
}

type Action = SetUserAction | ResetUserAction;

interface Props {
  children?: React.ReactElement;
}

type Reducer = (state: State, action: Action) => State;

const setUser =
  (dispatch: React.Dispatch<SetUserAction>) =>
  (user: User): void => {
    dispatch({
      type: ActionType.SetUser,
      payload: user,
    });
  };

const resetUser = (dispatch: React.Dispatch<ResetUserAction>) => (): void => {
  dispatch({
    type: ActionType.ResetUser,
  });
};

// prettier-ignore
// eslint-disable-next-line default-param-last
const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'reset-user':
      return initialState;
    case 'set-user':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

function AppProvider(props: Props): React.ReactElement {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const actions = {
    setUser: setUser(dispatch),
    resetUser: resetUser(dispatch),
  };

  return <Provider value={{state, ...actions}}>{props.children}</Provider>;
}

export {useCtx as useAppContext, AppProvider};
