import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, Text } from 'react-native';


// Crea las pantallas que deseas navegar
function CasiJala({ navigation }) {
    return (
      <Button
        title="Ir a Detalles"
        onPress={() => navigation.navigate('Detalles')}
      />
    );
  }

  export default CasiJala
  