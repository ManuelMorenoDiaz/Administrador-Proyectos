import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from '../../styles/stylesScreenProjects'

const CenterProjects = () => {
    return (
      <View style={styles.centerProjects}>
      <View style={styles.textActivos}>
        <Text style={[styles.textActivos1, styles.textStyles]}>2</Text>
        <Text>Activos</Text>
      </View>
      <View style={styles.textActivos}>
        <Text style={[styles.textActivos2, styles.textStyles]}>2</Text>
        <Text>Inactivos</Text>
      </View>
    </View>
        )
}

export default CenterProjects




