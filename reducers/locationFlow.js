const initialState = {
  location: "currentLocation"
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
    default:
      console.log("DEFAULT");
      return {
          ...state
      }
  }
}


