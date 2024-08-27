import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { icons } from "../constants";
import { commonTabOptions } from "./components/TabIcon";
import CartScreen from "./screens/CartScreen";
import DishScreen from "./screens/DishScreen";
import Pocetna from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import RestaurantScreen from "./screens/RestaurantScreen";
import Search from "./screens/Search";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/WelcomeScreen";
import BackButton from "./components/BackButton";

const Stack = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();

const headerOptions = {
  headerShown: true,
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: "#EF9920",
  },
  headerLeft: () => <BackButton />,
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pocetna"
        component={Pocetna}
        options={{
          headerShown: true, // Prikazuje header na Pocetna ekranu
          headerTitle: "Pocetna", // Naslov za Pocetna
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Restoran"
        component={RestaurantScreen}
        options={{
          headerShown: true, // Prikazuje header na Restoran ekranu
          headerTitle: "Restoran", // Naslov za Restoran
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Jelo"
        component={DishScreen}
        options={{
          headerShown: true, // Prikazuje header na Jelo ekranu
          headerTitle: "Jelo", // Naslov za Jelo
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Korpa"
        component={CartScreen}
        options={{
          headerShown: true, // Prikazuje header na Korpa ekranu
          headerTitle: "Korpa", // Naslov za Korpa
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
};

const TabScreens = () => {
  return (
    <TabNav.Navigator
      screenOptions={{
        ...headerOptions,
        headerShown: false, // Header je već podešen unutar HomeStack, tako da ne treba dupli header ovde
      }}
    >
      <TabNav.Screen
        name="Pocetna"
        component={HomeStack} // HomeStack uključuje Pocetna i sve ostale ekrane
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
    </TabNav.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Uloguj"
          component={SignIn}
          options={{
            ...headerOptions,
            headerTitle: "Logovanje",
          }}
        />
        <Stack.Screen
          name="Registruj"
          component={SignUp}
          options={{
            ...headerOptions,
            headerTitle: "Registracija",
          }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabScreens}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
