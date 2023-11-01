import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../styles/styleCardNotification';

const CardNotification=(props)=> {
  return (
    <View style={[styles.cardNotificacion, { backgroundColor: props.color }]}>
      <View style={styles.topCard}>
          <Text style={styles.titulo}>Te invitaron a una reunion</Text>
          <Text style={styles.fecha}>31/10/2023</Text>
        </View>
        <View style={styles.botCard}>
          <Text style={styles.descripcion}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores rerum quasi vero voluptates tempora nobis velit alias id deleniti perspiciatis unde laborum assumenda nulla consequuntur non libero, recusandae dolorem excepturi!</Text>
        </View>
     </View>
  );
}

export default CardNotification;