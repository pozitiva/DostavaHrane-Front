import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import DishScreen from "./screens/DishScreen";
import Pocetna from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import RestaurantScreen from "./screens/RestaurantScreen";
import Search from "./screens/Search";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/WelcomeScreen";
import { icons } from "../constants";
import TabIcon, { commonTabOptions } from "./components/TabIcon"; // Import both TabIcon and commonTabOptions
import CartScreen from "./screens/CartScreen";

const Stack = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();

const TabScreens = () => {
  return (
    <TabNav.Navigator>
      <TabNav.Screen
        name="Pocetna"
        component={Pocetna}
        options={commonTabOptions(icons.home, "Pocetna")}
      />
      <TabNav.Screen
        name="Pretraga"
        component={Search}
        options={commonTabOptions(icons.search, "Pretraga")}
      />
      <TabNav.Screen
        name="Profil"
        component={Profile}
        options={commonTabOptions(icons.profile, "Profil")}
      />
      {/* Adding RestaurantScreen to TabNavigator but hiding it from the tab bar */}
      <TabNav.Screen
        name="Restoran"
        component={RestaurantScreen}
        options={{ tabBarButton: () => null }} // This hides the tab from the tab bar
      />
      <TabNav.Screen
        name="Jelo"
        component={DishScreen}
        options={{ tabBarButton: () => null }} // This hides the tab from the tab bar
      />
      <TabNav.Screen
        name="Korpa"
        component={CartScreen}
        options={{ tabBarButton: () => null }} // This hides the tab from the tab bar
      />
    </TabNav.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabScreens}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen name="Jelo" component={DishScreen} /> */}
        <Stack.Screen
          name="Uloguj"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registruj"
          component={SignUp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
