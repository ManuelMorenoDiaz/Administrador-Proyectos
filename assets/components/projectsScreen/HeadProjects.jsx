import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native'
import styles from '../../styles/stylesScreenProjects'
import Modal from 'react-native-modal';

const HeadProjects = () => {
  const [Modal2Visible, setModal2Visible] = useState(false);

  const toggleModal2 = () => {
    setModal2Visible(!Modal2Visible);
  };
  return (
    <View style={styles.headProjects}>
      <Text style={styles.title}>Proyectos</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tareas Individuales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal2}>
          <Text style={styles.addButtonText}>+</Text>
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

            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Crear Proyecto</Text>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Titulo</Text>
              <TextInput
                placeholder="Ingrese el título"
                onChangeText={(text) => {
                  // Manejar el texto ingresado en el campo de título
                }}
                style={styles.input}
              />
            </View>

            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Fecha Inicio</Text>
              <TextInput
                placeholder="Ingrese el título"
                onChangeText={(text) => {
                  // Manejar el texto ingresado en el campo de título
                }}
                style={styles.input}
              />
            </View>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Fecha Finalización</Text>
              <TextInput
                placeholder="Ingrese el título"
                onChangeText={(text) => {
                  // Manejar el texto ingresado en el campo de título
                }}
                style={styles.input}
              />
            </View>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Descripción</Text>
              <TextInput
                placeholder="Ingrese la descripción"
                onChangeText={(text) => {
                  // Manejar el texto ingresado en el campo de descripción
                }}
                style={styles.input}
              />
              <Button title="Guardar" />

            </View>
          </View>
        </Modal>
      </View>
    </View>
  )

}

export default HeadProjects