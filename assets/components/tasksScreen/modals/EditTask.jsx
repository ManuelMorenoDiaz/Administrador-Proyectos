import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import styles from "../../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";

const EditarProyecto = () => {

    const [modalEditarProyecto, setModalEditarProyecto] = useState(false);
    const mostrarMEditarProyecto = () => {
        setModalEditarProyecto(!modalEditarProyecto);
    };
    return (
        <TouchableOpacity
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                border: "2px solid red",
            }}
            onPress={mostrarMEditarProyecto}
        >
            <Icon
                name="edit"
                size={20}
                style={{ marginRight: 10 }}
                color="black"
            />
            <Text>Modificar Tarea</Text>
            <Modal
                isVisible={modalEditarProyecto}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={mostrarMEditarProyecto}
                style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
            >
                <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding:10 }}>
                    <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Editar Proyecto</Text>
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
        </TouchableOpacity>
    );
}

export default EditarProyecto;