import React from "react";
import { View, Text, Button, StyleSheet } from 'react-native';
import CalculatorScreen from "./screens/CalculatorScreen";
import "react-native-gesture-handler";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.texto}>
      <Text style={styles.heading}>Calculadora APP</Text>
      <Text style={styles.titulo}>Proyecto Final ReactNative</Text>
      <Text>José Arnoldo Rojo Borquez</Text>
      <Button title="A Calcular" onPress={() => navigation.navigate("Details")}/>
    </View>
  );
}

function DetailsScreen () {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
      <CalculatorScreen />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    texto: {
      flex: 1, 
      alignItems: "center", 
      justifyContent: "center"
    },

    heading: {
      fontSize: 40,
      color: '#0A2A73',
      fontWeight: 'bold'
    },
    
    titulo:{
      fontSize: 20,
      fontWeight: 'bold'
    }
})

export default App;

