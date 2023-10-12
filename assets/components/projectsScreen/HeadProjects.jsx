import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, TextInput } from 'react-native';
import styles from '../../styles/styleActiveInactive';
import stylesHead from "../../styles/stylesHead";
import Modal from 'react-native-modal';

const HeadProjects = ({ navigation }) => {
  const [Modal2Visible, setModal2Visible] = useState(false);


  const toggleModal2 = () => {
    setModal2Visible(!Modal2Visible);
  };


 

  return (
    <View style={stylesHead.headProjects}>
      <Text style={stylesHead.title}>Proyectos</Text>
      <View style={stylesHead.options}>
        <TouchableOpacity style={stylesHead.button} onPress={() => navigation.navigate('Detalles')}>
          <Text style={stylesHead.buttonText}>Tareas</Text>
        </TouchableOpacity>
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
            <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Crear Proyecto</Text>
            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Titulo</Text>
              <TextInput
                placeholder="Ingrese el título"
                onChangeText={(text) => {
                  // Handle the text entered in the title field
                }}
                style={styles.input}
              />
            </View>

            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Fecha Inicio</Text>
              <TextInput
                placeholder="Seleccione la Fecha Inicio"
                value={startDate}
                style={styles.input}
                editable={false} // Make it not editable manually
              />
            </View>

            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Fecha Finalización</Text>
              <TextInput
                placeholder="Seleccione la Fecha Finalización"
                style={styles.input}
                editable={false} // Make it not editable manually
              />

            </View>

            <View style={styles.opcionesInput}>
              <Text style={styles.textInput}>Descripción</Text>
              <TextInput
                placeholder="Ingrese la descripción"
                onChangeText={(text) => {
                  // Handle the text entered in the description field
                }}
                style={styles.input}
              />
              <Button title="Guardar" onPress={toggleModal2} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

export default HeadProjects;
