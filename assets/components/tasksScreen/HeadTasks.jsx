
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import stylesHead from "../../styles/stylesHead";
import Modal from 'react-native-modal';
import { Icon } from 'react-native-elements';

const HeadTasks = () => {


  const [Modal2Visible, setModal2Visible] = useState(false);

  const toggleModal2 = () => {
    setModal2Visible(!Modal2Visible);
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
                  // Manejar el texto ingresado en el campo de título
                }}
                style={styles.input}
              />
            </View>

            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Fecha</Text>
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
  );
}

export default HeadTasks;




