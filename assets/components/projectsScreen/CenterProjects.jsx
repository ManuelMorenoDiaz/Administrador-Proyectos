import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import stylesCenterPT from '../../styles/stylesCenterPT'

const CenterProjects = () => {
    return (
      <View style={stylesCenterPT.centerProjects}>
      <View style={stylesCenterPT.textActivos}>
        <Text style={[stylesCenterPT.textActivos1, stylesCenterPT.textStyles, stylesCenterPT.colorP]}>2</Text>
        <Text>Activos</Text>
      </View>
      <View style={stylesCenterPT.textActivos}>
        <Text style={[stylesCenterPT.textActivos2, stylesCenterPT.textStyles]}>2</Text>
        <Text>Inactivos</Text>
      </View>
    </View>
        )
}

export default CenterProjects




