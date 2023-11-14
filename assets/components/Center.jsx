import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import stylesCenterPT from '../styles/stylesCenterPT'
import HeadTasks from './tasksScreen/HeadTasks'
import CreateProject from './homeScreen/CreateProject'

function create() {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <CreateProject nom='Crear Proyecto' radio={8} />
      <HeadTasks nom='Crear Tarea' radio={8} />
    </View>
  )
}

const Center = (props) => {
  return (
    <View>
      <View style={stylesCenterPT.centerProjects}>
        <View style={stylesCenterPT.textActivos}>
          <Text style={[stylesCenterPT.textActivos1, stylesCenterPT.textStyles, { backgroundColor: props.color1 }]}>{props.num1}</Text>
          <Text>{props.nam1}</Text>
        </View>
        <View style={stylesCenterPT.textActivos}>
          <Text style={[stylesCenterPT.textActivos2, stylesCenterPT.textStyles, { backgroundColor: props.color2 }]}>{props.num2}</Text>
          <Text>{props.nam2}</Text>
        </View>
      </View>
      {props.tp ? create() : null}
    </View>
  )
}

export default Center
