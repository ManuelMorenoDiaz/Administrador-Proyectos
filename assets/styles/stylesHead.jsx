import {
    StyleSheet
  } from 'react-native';
  
  const stylesHead = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headProjects: {
      borderBottomWidth: 2,
      borderBottomColor: '#A2A9B2',
      flexDirection: 'row',
      padding: 10,
      justifyContent:'flex-end',
      paddingHorizontal: 10,
      marginHorizontal: 20,
    },
    title: {
      fontSize: 50,
    },
    options: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginHorizontal: 10,
      backgroundColor: '#B781FB',
      borderRadius: 5,
      height: 30,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    buttonText: {
      color: 'white',
    },
    addButton: {
      marginHorizontal: 10,
      backgroundColor: 'rgb(4, 255, 0)',
      borderRadius: 100,
      height: 40,
      width: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtonText: {
      color: 'white',
      fontSize: 25,
    },
  
  });
  
  export default stylesHead;