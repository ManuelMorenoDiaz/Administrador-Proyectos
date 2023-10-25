import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import styles from '../../styles/styleActiveInactive'
import { Icon } from 'react-native-elements';

const InactiveTasks = () => {
    const [activeState, setActiveState] = useState({
        activo1: false,
        activo2: false,
        inactivos1: false,
        inactivos2: false,

    });

    const toggleAccordion = (projectName) => {
        setActiveState({
            ...activeState,
            [projectName]: !activeState[projectName],
        });
    };

    return (
        <View style={styles.inactivos}>
          <Text style={styles.title}>Inactivos</Text>
          <View style={styles.acordeon}>
            <View style={styles.item}>
              <TouchableOpacity onPress={() => toggleAccordion('inactivos1')}>
                <View style={styles.flexRow}>
                  <View style={[styles.inactivosTareas]}>
                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 10, fontSize:17 }}>Creación de una app similar a Notion 1</Text>
                    <Icon
                      name={activeState.activo1 ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome" color={'white'} style={{ marginRight: 10 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {activeState.inactivos1 && (
                <View style={styles.contenido}>
                  <View style={styles.contDescripcion}>
                    <Text style={styles.h3}>Descripción</Text>
                    <Text style={styles.p}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus quos commodi neque quod dicta
                      mollitia facere ipsa fuga natus perferendis corporis doloremque veritatis, iure reiciendis eius
                      eveniet doloribus, beatae soluta!
                    </Text>
                  </View>
                </View>
              )}
            </View>
            
          </View>
          <View style={styles.acordeon}>
          <View style={styles.item}>
              <TouchableOpacity onPress={() => toggleAccordion('inactivos2')}>
                <View style={styles.flexRow}>
                  <View style={[styles.inactivosTareas]}>
                    <Text style={{ color: 'white', fontWeight: 'bold', padding: 10, fontSize:17 }}>Creación de una app similar a Notion 1</Text>
                    <Icon
                      name={activeState.activo1 ? 'chevron-up' : 'chevron-down'}
                      type="font-awesome" color={'white'} style={{ marginRight: 10 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              {activeState.inactivos2 && (
                <View style={styles.contenido}>
                  <View style={styles.contDescripcion}>
                    <Text style={styles.h3}>Descripción</Text>
                    <Text style={styles.p}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus quos commodi neque quod dicta
                      mollitia facere ipsa fuga natus perferendis corporis doloremque veritatis, iure reiciendis eius
                      eveniet doloribus, beatae soluta!
                    </Text>
                  </View>
                  
                </View>
              )}
            </View>
          </View>
          
        </View>
    )
}

export default InactiveTasks




