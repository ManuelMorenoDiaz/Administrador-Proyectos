import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import stylesCenterPT from '../../styles/stylesCenterPT'

const CenterTasks = () => {
    return (
      <View style={stylesCenterPT.centerProjects}>
      <View style={stylesCenterPT.textActivos}>
        <Text style={[stylesCenterPT.textActivos1, stylesCenterPT.textStyles, stylesCenterPT.colorT]}>1</Text>
        <Text>Activos</Text>
      </View>
      <View style={stylesCenterPT.textActivos}>
        <Text style={[stylesCenterPT.textActivos2, stylesCenterPT.textStyles]}>1</Text>
        <Text>Inactivos</Text>
      </View>
    </View>
        )
}

export default CenterTasks




