import * as AuthActions from './auth'
import * as LocationActions from './location'
import * as PlayerActions from './PlayerAction'

export const ActionCreators = Object.assign({},
  AuthActions,
  LocationActions,
  PlayerActions
);
