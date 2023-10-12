import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '50%',
    },
    modalBackdrop: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width:'100%'
    },
    iconContainer: {
      alignSelf: 'center',
      marginBottom: 20,
    },
    icon: {
      fontSize: 50,
      color: 'white',
    },
    errorModal: {
      backgroundColor: '#B11830',
    },
    questionModal: {
      backgroundColor: '#D0BD0C',
    },
    infoModal: {
      backgroundColor: '#1ABCFE',
    },
    successModal: {
      backgroundColor: '#0ACF83',
    },
    messageText: {
      fontSize: 23,
      color: 'white',
      marginBottom: 20,
      textAlign: 'center',
    },
    errorText: {
      color: 'white',
    },
    questionText: {
      color: 'white',
    },
    infoText: {
      color: 'white',
    },
    successText: {
      color: 'white',
    },
    okButton: {
      backgroundColor: 'white',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    okButtonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles;