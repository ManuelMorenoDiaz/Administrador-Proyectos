import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import styles from "../../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";

const CrearTarea = () => {
    const [modalCrearTarea, setModalCrearTarea] = useState(false);
    const mostrarMCrearTarea = () => {
        setModalCrearTarea(!modalCrearTarea);
    };
    return (
        <TouchableOpacity
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
            }}
            onPress={mostrarMCrearTarea}
        >
            <Icon
                name="book"
                size={20}
                style={{ marginRight: 10 }}
                color="black"
            />
            <Text>Crear Tarea</Text>
            <Modal
                isVisible={modalCrearTarea}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={mostrarMCrearTarea}
                style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
            >
                <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding:10 }}>
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
                        <Text style={styles.textInput}>Responsable</Text>
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

export default CrearTarea;