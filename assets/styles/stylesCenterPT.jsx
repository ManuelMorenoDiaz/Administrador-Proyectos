import {
    StyleSheet
  } from 'react-native';
  
  const stylesCenterPT = StyleSheet.create({
    centerProjects: {
      margin: 20,
      padding:20,
      borderBottomWidth: 2,
      borderBottomColor: '#A2A9B2',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    textActivos: {
      marginHorizontal: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyles: {
      fontSize: 60,
      width: 100,
      height: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      
    },
    textActivos1: {
      padding: 10,
      color: 'white',
      textAlign: 'center',
    },
    colorP:{backgroundColor: '#1ABCFE'},
    colorT:{backgroundColor: '#B781FB'},
    textActivos2: {
      backgroundColor: '#F2841E',
      padding: 10,
      color: 'white',
      textAlign: 'center',
    },

  });
  
  export default stylesCenterPT;