import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardNotification from '../components/notificationsScreen/CardNotification';


 const NotificationsScreen = () => {
    return (
      <ScrollView>
        <View style={styles.contNotificaciones}>
          <CardNotification color={'#1ABCFE'}/>
          <CardNotification color={'#1ABCFE'}/>
          <CardNotification color={'#BF8EFC'}/>
          <CardNotification color={'#1ABCFE'}/>
          <CardNotification color={'#BF8EFC'}/>
          <CardNotification color={'#1ABCFE'}/>
          <CardNotification color={'#BF8EFC'}/>
          <CardNotification color={'#1ABCFE'}/>
          <CardNotification color={'#BF8EFC'}/>
      </View>
      </ScrollView>
    );
  };

 

  export default NotificationsScreen;

  const styles = StyleSheet.create({
    contNotificaciones:{
        marginTop:20,
        display:'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"

    }
  });