export function setLocation(loc) {
  /*console.log("TESTING: Location");
  console.log(loc);*/
  return {
    type: 'SET_LOCATION',
    location: loc,
  }
}

export function setLeaderboard(board) {
  console.log("Testing setLeaderboard");
  console.log(board);
  return {
    type: 'SET_LEADERBOARD',
    leaderboard: board,
  }
}
