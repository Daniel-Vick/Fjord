import { combineReducers } from 'redux'
import authFlow from './authFlow'
import locationFlow from './locationFlow.js'

const leaderboardApp = combineReducers({
  authFlow,
  locationFlow
})

export default leaderboardApp
