import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "../constants"; // Ensure icons are properly imported
import TabIcon from "./components/TabIcon";
import CartScreen from "./screens/CartScreen";
import Pocetna from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import RestaurantScreen from "./screens/RestaurantScreen";
import Search from "./screens/Search";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Welcome from "./screens/WelcomeScreen";
import BackButton from "./components/BackButton";
import useCartStore from "../store/CartStore";
import { Image, Text, View } from "react-native";

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
          headerShown: true,
          headerTitle: "Pocetna",
          ...headerOptions,
        }}
      />
      <Stack.Screen
        name="Restoran"
        component={RestaurantScreen}
        options={{
          headerShown: true,
          headerTitle: "Restoran",
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
};

const TabScreens = () => {
  const cartCount = useCartStore((state) => state.cart.length);

  const BadgeIcon = ({ icon, badgeCount }) => (
    <View style={{ position: "relative", alignItems: "center" }}>
      <Image
        source={icon}
        style={{ width: 24, height: 24, tintColor: "#EF9920" }}
      />
      {badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -10,
            right: -10,
            backgroundColor: "red",
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <TabNav.Navigator
      screenOptions={({ route }) => ({
        ...headerOptions,
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#EF9920" : "gray";
          const iconSource = {
            Pocetna: icons.home,
            Pretraga: icons.search,
            Profil: icons.profile,
            Korpa: icons.cart,
          }[route.name];

          return route.name === "Korpa" ? (
            <BadgeIcon icon={iconSource} badgeCount={cartCount} />
          ) : (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                tintColor: color,
              }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          const color = focused ? "#EF9920" : "gray";
          return (
            <Text style={{ color, fontSize: 12 }}>
              {route.name === "Pocetna"
                ? "Pocetna"
                : route.name === "Pretraga"
                ? "Pretraga"
                : route.name === "Profil"
                ? "Profil"
                : route.name === "Korpa"
                ? "Korpa"
                : ""}
            </Text>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12, // Customize label size if needed
        },
      })}
    >
      <TabNav.Screen name="Pocetna" component={HomeStack} />
      <TabNav.Screen name="Pretraga" component={Search} />
      <TabNav.Screen name="Profil" component={Profile} />
      <TabNav.Screen name="Korpa" component={CartScreen} />
    </TabNav.Navigator>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView>
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
    </GestureHandlerRootView>
  );
};

export default App;
