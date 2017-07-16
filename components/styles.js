import { StyleSheet } from 'react-native'

const background = "#313C4F";
const highlight = "#7DC1B6";
const fontColor = 'white';
const borderColor = 'white';


export const LeaderboardStyle = StyleSheet.create({
  topView: {
      flex: 10, backgroundColor: background
  },
  navView: {
      flex:1, backgroundColor: highlight, flexDirection: 'row', alignItems:'flex-end', justifyContent:'flex-end'
  },
  locView: {
      flex: 1, backgroundColor: background
  },
  listView: {
      flex: 8, backgroundColor: background
  },
  tabInactive: {
      flex:1, flexDirection: 'row', backgroundColor: highlight, alignItems:'center', justifyContent:'center', marginBottom: 10
  },
  tabActive: {
      flex:1, flexDirection: 'row', backgroundColor:highlight, alignItems:'center', justifyContent:'center', borderBottomWidth: 2, borderColor: borderColor, paddingBottom:7
  },
  tabFontActive: {
      color: fontColor, fontSize: 23
  },
  tabFontInactive: {
      color: fontColor, fontSize: 20
  }
});

export const PlaylistViewStyle =  StyleSheet.create({
  touch1: {
    borderColor: borderColor
  },
  
  
});
