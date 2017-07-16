const initialState = {
  auth_key: "Fuck",
  logged_in: "SHit",
  expiration_date: "Now"
}

export default function authFlow(state = initialState, action) {
  /*console.log(state);
  console.log("######");
  console.log(action);
  console.log(action.auth_key);
  console.log(action.logged_in);
  console.log("######");*/
  switch (action.type) {
    case 'SET_AUTH':
      console.log("SET_AUTH");
      return {
          ...state,
          auth_key: action.auth_key,
          logged_in: true,
          expiration_date: action.expiration_date,
      }
      
    default:
      console.log("Default");
      return {
          ...state
      }
  }
}


