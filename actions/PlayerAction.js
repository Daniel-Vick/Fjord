export function setPlaying(input) {
  console.log("setPlaying");
  console.log(input);
  return {
    type: 'SET_PLAYING',
    playing: input,
  }
}
