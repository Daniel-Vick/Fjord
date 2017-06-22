export function setLocation(loc) {
  /*console.log("TESTING: Location");
  console.log(loc);*/
  return {
    type: 'SET_LOCATION',
    location: loc,
  }
}
