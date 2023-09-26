
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';
import styles from '../styles/styleActiveInactive';
import stylesHead from '../styles/stylesHead';
import CenterProjects from '../components/projectsScreen/CenterProjects';
import ActivosProjects from '../components/projectsScreen/ActiveProjects';
import InactivosProjects from '../components/projectsScreen/InactiveProjects';
import { createStackNavigator } from '@react-navigation/stack';
import Modal from 'react-native-modal';


const ProjectsScreen = ({ navigation }) => {
const Stack = createStackNavigator();

const [Modal2Visible, setModal2Visible] = useState(false);

  const toggleModal2 = () => {
    setModal2Visible(!Modal2Visible);
  };


  return (
    <ScrollView>
      <View style={stylesHead.container}>
      <View style={stylesHead.headProjects}>
      <View style={stylesHead.options}>
        <TouchableOpacity style={stylesHead.button} onPress={() => navigation.navigate('Tasks')}>
          <Text style={stylesHead.buttonText}>Tareas Individuales</Text>
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
        <CenterProjects />
        <ActivosProjects />
        <InactivosProjects />
      </View>

    </ScrollView>
  );
};

export default ProjectsScreen;