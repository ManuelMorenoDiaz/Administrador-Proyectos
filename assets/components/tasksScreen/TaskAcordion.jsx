import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button, TextInput } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Modal from "react-native-modal";
import { Icon } from "react-native-elements";
import EditarProyecto from "./modals/EditTask";
import Compartir from "./modals/Share";

const Task = () => {
    const [activeState, setActiveState] = useState({
        activo1: false,
        activo2: false,
        inactivos: false,
    });

    const toggleAccordion = (projectName) => {
        setActiveState({
            ...activeState,
            [projectName]: !activeState[projectName],
        });
    };
    const [modalOpciones, setModalOpciones] = useState(false);
    const mostrarMOpciones = () => {
        setModalOpciones(!modalOpciones);
    };
    return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => toggleAccordion("activo1")}>
                    <View style={styles.flexRow}>
                        <View style={[styles.activosTareas, , styles.colorAT]}>
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    padding: 10,
                                    fontSize: 17,
                                }}
                            >
                                Creación de una app similar a Notion 1
                            </Text>
                            <View style={styles.optionesTareasAct}>
                                <Icon
                                    name={activeState.activo1 ? "chevron-up" : "chevron-down"}
                                    type="font-awesome"
                                    color={"white"}
                                    style={{ marginRight: 10 }}
                                />
                                <Button title="=" onPress={mostrarMOpciones} />
                            </View>
                        </View>
                    </View>
                    <Modal
                        isVisible={modalOpciones}
                        animationIn="slideInUp"
                        animationOut="slideOutDown"
                        backdropOpacity={0.5}
                        onBackdropPress={mostrarMOpciones}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 0,
                        }}
                    >
                        <View style={styles.modalOpciones}>
                            <EditarProyecto />
                            <Compartir />
                            <TouchableOpacity
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    border: "2px solid red",
                                }}
                            >
                                <Icon
                                    name="delete"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                    color="black"
                                />
                                <Text>Eliminar Tarea</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    border: "2px solid red",
                                }}
                            >
                                <Icon
                                    name="check"
                                    size={20}
                                    style={{ marginRight: 10 }}
                                    color="black"
                                />
                                <Text>Terminar Tarea</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </TouchableOpacity>

                {activeState.activo1 && (
                    <View style={styles.contenido}>
                        <View style={styles.contDescripcion}>
                            <Text style={styles.h3}>Descripción</Text>
                            <Text style={styles.p}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ducimus quos commodi neque quod dicta mollitia facere ipsa
                                fuga natus perferendis corporis doloremque veritatis, iure
                                reiciendis eius eveniet doloribus, beatae soluta!
                            </Text>
                        </View>
                    </View>
                )}
            </View>
    );
}

export default Task;