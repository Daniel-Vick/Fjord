const initialState = {
  playing: false
}

export default function authFlow(state = initialState, action) {
  switch (action.type) {
    case 'SET_PLAYING':
      console.log("SET_PLAYING");
      return {
          ...state,
          playing: action.playing,
      }
      
    default:
      console.log("Default");
      return {
          ...state
      }
  }
}


