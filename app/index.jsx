import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/WelcomeScreen";
import Pocetna from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import DishScreen from "./screens/DishScreen";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import TabNavigator from "./screens/TabNavigator";

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
        <Stack.Screen name="Jelo" component={DishScreen} />
        <Stack.Screen name="Uloguj" component={SignIn} />
        <Stack.Screen name="Registruj" component={SignUp} />
        <Stack.Screen name="Pretraga" component={Search} />
        <Stack.Screen name="Profile" component={Profile} />

        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
