import { combineReducers } from 'redux'
import authFlow from './authFlow'
import locationFlow from './locationFlow.js'
import PlayerReducer from './PlayerReducer'

const leaderboardApp = combineReducers({
  authFlow,
  locationFlow,
  PlayerReducer
})

export default leaderboardApp
