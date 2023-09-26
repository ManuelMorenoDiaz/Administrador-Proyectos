import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import styles from "../../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";

const Compartir = () => {
    const [modalCompartir, setModalCompartir] = useState(false);
    const mostrarMCompartir = () => {
        setModalCompartir(!modalCompartir);
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
            onPress={mostrarMCompartir}
        >
            <Icon
                name="people"
                size={20}
                style={{ marginRight: 10 }}
                color="black"
            />
            <Text>Invitar Personas</Text>
            <Modal
                isVisible={modalCompartir}
                animationIn="slideInUp"
                animationOut="slideOutDown"
                backdropOpacity={0.5}
                onBackdropPress={mostrarMCompartir}
                style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
            >
                <View style={{ width: '80%', backgroundColor: 'white', borderRadius: 10, padding:10 }}>
                    <Text style={{ color: 'blue', fontWeight: 'bold', fontSize: 20, margin: 10 }}>Compartir</Text>
                    
                    <View style={styles.opcionesInput}>
                        <Text style={styles.textInput}>Añadir Personas</Text>
                        <TextInput
                            placeholder="Buscar"
                            onChangeText={(text) => {
                                // Manejar el texto ingresado en el campo de descripción
                            }}
                            style={styles.input}
                        />
                        <Text style={styles.textInput}>Personas con Acceso</Text>
                        <View style={{width:'100%'}}>
                            <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', alignContent:'flex-start'}}>
                                <Icon name='person' size={36} color='black' />
                                <View style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                                    <Text>Nombre Usuario</Text>
                                    <Text>Corre electronico</Text>
                                </View>
                            </View>
                        </View>
                        <Button title="Guardar" />
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
}

export default Compartir;