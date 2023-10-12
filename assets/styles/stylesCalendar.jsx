
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    dayContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayText: {
      fontSize: 18,
    },
    calendar:{
        borderRadius:10,
        marginLeft:30,
        marginRight:30
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color:'#5969FF'
    },
    modalDescription: {
      fontSize: 16,
      marginTop:10,
      borderWidth:0.5,
      borderRadius:2,
      padding:5,
      shadowColor: '#000',
      shadowOpacity:10

    },
    closeButton: {
      backgroundColor: '#B781FB',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    closeButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    h3:{
      textAlign: 'center',
      fontSize:20,
      marginTop:10,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderTopColor: '#A2A9B2',
      borderBottomColor: '#A2A9B2',

    },
    targTask:{
      borderColor:'gray',
      borderWidth:0.5,
      padding:5,
      marginBottom:5
    }
  });

  export default styles;