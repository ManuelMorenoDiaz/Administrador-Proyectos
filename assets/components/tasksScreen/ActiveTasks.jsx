import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/styleActiveInactive";
import Task from "./TaskAcordion";

const ActiveTasks = () => {
    
    return (
        <View style={styles.activos}>
        <Text style={styles.title}>Activos</Text>
        <View style={styles.acordeon}>
            <Task />
        </View>
        <View style={styles.acordeon}>
            <Task />
        </View>
        </View>
    );
};

export default ActiveTasks;
