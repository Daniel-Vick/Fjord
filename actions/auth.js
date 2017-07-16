export function setAuth(key, expiration) {
  /*console.log("TESTING");
  console.log(text);*/
  return {
    type: 'SET_AUTH',
    auth_key: key,
    logged_in: true,
    expiration_date: expiration,
  }
}
