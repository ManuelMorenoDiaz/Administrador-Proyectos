import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import stylesHead from "../../styles/stylesHead";
import Modal from 'react-native-modal';
import CustomAlertModal from "../Alerts";
import { useModalFunctions } from "../Functions-Alerts"; 

const HeadTasks = () => {
  const {
    errorModalVisible, infoModalVisible, successModalVisible, questionModalVisible,
    showErrorAlert, showInfoAlert, showSuccessAlert, showQuestionAlert,
    closeErrorAlert, closeInfoAlert, closeSuccessAlert, closeQuestionAlert,
  } = useModalFunctions();

  const [Modal2Visible, setModal2Visible] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const toggleModal2 = () => {
    setModal2Visible(!Modal2Visible);
  };

  const guardarTarea = () => {
    console.log("Título: ", titulo);
    console.log("Fecha: ", fecha);
    console.log("Descripción: ", descripcion);
    toggleModal2(); // Cierra el modal después de guardar los datos
    showSuccessAlert(); // Muestra la alerta de éxito después de cerrar el modal
  };

  return (
    <View style={stylesHead.headProjects}>
      <View style={stylesHead.options}>
        <TouchableOpacity style={stylesHead.addButton} onPress={toggleModal2}>
          <Text style={stylesHead.addButtonText}>+</Text>
        </TouchableOpacity>
        <Modal
          isVisible={Modal2Visible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.5}
          onBackdropPress={toggleModal2}
          style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
        >
          <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 10 }}>
            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Crear Tarea</Text>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Titulo</Text>
              <TextInput
                placeholder="Ingrese el título"
                onChangeText={(text) => {
                  setTitulo(text); // Actualiza el estado 'titulo' con el texto ingresado
                }}
                style={styles.input}
              />
            </View>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Fecha</Text>
              <TextInput
                placeholder="Ingrese la fecha"
                onChangeText={(text) => {
                  setFecha(text); // Actualiza el estado 'fecha' con el texto ingresado
                }}
                style={styles.input}
              />
            </View>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Descripción</Text>
              <TextInput
                placeholder="Ingrese la descripción"
                onChangeText={(text) => {
                  setDescripcion(text); // Actualiza el estado 'descripcion' con el texto ingresado
                }}
                style={styles.input}
              />
              <Button title="Guardar" onPress={guardarTarea} />
            </View>
          </View>
        </Modal>
        <CustomAlertModal
          isVisible={successModalVisible}
          type="success"
          message="Operación exitosa."
          onClose={closeSuccessAlert}
        />
      </View>
    </View>
  );
}

export default HeadTasks;