import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import styles from '../styles/stylesAlerts'



const CustomAlertModal = ({ isVisible, type, message, onClose, isLoading }) => {
  const modalStyles = {
    error: styles.errorModal,
    question: styles.questionModal,
    info: styles.infoModal,
    success: styles.successModal,
  };

  const textStyles = {
    error: styles.errorText,
    question: styles.questionText,
    info: styles.infoText,
    success: styles.successText,
  };

  const iconStyles = {
    error: styles.errorIcon,
    question: styles.questionIcon,
    info: styles.infoIcon,
    success: styles.successIcon,
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <Modal isVisible={isVisible} style={[styles.modal, { height: screenHeight * 0.4 }]} backdropOpacity={0.0}>
      <TouchableOpacity activeOpacity={1} style={styles.modalBackdrop} onPress={onClose}>
        <View style={[styles.modalContent, modalStyles[type]]}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <React.Fragment>
              <View style={styles.iconContainer}>
                <Icon name={getIconName(type)} style={[styles.icon, iconStyles[type]]} />
              </View>
              <Text style={[styles.messageText, textStyles[type]]}>{message}</Text>
              <Animatable.View animation="bounceIn">
                <TouchableOpacity onPress={onClose} style={styles.okButton}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </Animatable.View>
            </React.Fragment>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const getIconName = (type) => {
  switch (type) {
    case 'error':
      return 'exclamation-circle';
    case 'question':
      return 'question-circle';
    case 'info':
      return 'info-circle';
    case 'success':
      return 'check-circle';
    default:
      return 'exclamation-circle';
  }
};

export default CustomAlertModal;

// const Pepe = () => {
//   const [errorModalVisible, setErrorModalVisible] = useState(false);
//   const [infoModalVisible, setInfoModalVisible] = useState(false);
//   const [successModalVisible, setSuccessModalVisible] = useState(false);
//   const [questionModalVisible, setQuestionModalVisible] = useState(false);

//   const showErrorAlert = () => {
//     setErrorModalVisible(true);
//   };

//   const showInfoAlert = () => {
//     setInfoModalVisible(true);
//   };

//   const showSuccessAlert = () => {
//     setSuccessModalVisible(true);
//   };

//   const showQuestionAlert = () => {
//     setQuestionModalVisible(true);
//   };

//   const closeErrorAlert = () => {
//     setErrorModalVisible(false);
//   };

//   const closeInfoAlert = () => {
//     setInfoModalVisible(false);
//   };

//   const closeSuccessAlert = () => {
//     setSuccessModalVisible(false);
//   };

//   const closeQuestionAlert = () => {
//     setQuestionModalVisible(false);
//   };

//   return (
//     <View>
//       <Button title="Mostrar Error" onPress={showErrorAlert} />
//       <Button title="Mostrar Información" onPress={showInfoAlert} />
//       <Button title="Mostrar Satisfactorio" onPress={showSuccessAlert} />
//       <Button title="Mostrar Pregunta" onPress={showQuestionAlert} />

//       <CustomAlertModal
//         isVisible={errorModalVisible}
//         type="error"
//         message="Ocurrió un error."
//         onClose={closeErrorAlert}
//       />

//       <CustomAlertModal
//         isVisible={infoModalVisible}
//         type="info"
//         message="Esta es una información."
//         onClose={closeInfoAlert}
//       />

//       <CustomAlertModal
//         isVisible={successModalVisible}
//         type="success"
//         message="Operación exitosa."
//         onClose={closeSuccessAlert}
//       />

//       <CustomAlertModal
//         isVisible={questionModalVisible}
//         type="question"
//         message="¿Estás seguro?"
//         onClose={closeQuestionAlert}
//       />
//     </View>
//   );
// };

// export default Pepe;
