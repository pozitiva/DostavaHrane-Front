import React from "react";
import Pocetna from "./screens/(tabs)/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/WelcomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Pocetna" component={Pocetna} />
        <Stack.Screen name="Restoran" component={RestaurantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
