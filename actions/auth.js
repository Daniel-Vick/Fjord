export function setAuth(text) {
  /*console.log("TESTING");
  console.log(text);*/
  return {
    type: 'SET_AUTH',
    auth_key: text,
    logged_in: true,
  }
}
