const initialState = {
  location: {name: "Current Location", position: {lat: 0, lng: 0}},
  leaderboard: "Top",
}

export default function authFlow(state = initialState, action) {
  /*console.log(state);
  console.log("######");
  console.log(action);
  console.log(action.location);
  console.log("######");*/
  switch (action.type) {
    case 'SET_LOCATION':
      console.log("SET_LOCATION");
      return {
          ...state,
          location: action.location,
          update: true,
      }
    case 'SET_LEADERBOARD':
      console.log("SET_LEADERBOARD");
      return {
          ...state,
          leaderboard: action.leaderboard,
      }
    default:
      console.log("DEFAULT");
      return {
          ...state
      }
  }
}


