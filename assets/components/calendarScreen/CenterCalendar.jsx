import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import stylesCenterPT from '../../styles/stylesCenterPT'

const CenterCalendar = () => {
    return (
      <View style={stylesCenterPT.centerProjects}>
      <View style={stylesCenterPT.textActivos}>
        <Text style={[stylesCenterPT.textActivos1, stylesCenterPT.textStyles, stylesCenterPT.colorT]}>1</Text>
        <Text>Tareas Individuales</Text>
      </View>
      <View style={stylesCenterPT.textActivos}>
        <Text style={[stylesCenterPT.textActivos2, stylesCenterPT.textStyles, stylesCenterPT.colorP]}>2</Text>
        <Text>Proyectos</Text>
      </View>
    </View>
        )
}

export default CenterCalendar




