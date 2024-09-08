import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, LogBox, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "../constants";
import useCartStore from "../store/CartStore";
import BackButton from "./components/BackButton";
import CartScreen from "./screens/CartScreen";
import Pocetna from "./screens/HomeScreen";
import MusterijaLogin from "./screens/MusterijaLogin";
import NarudzbineEkran from "./screens/NarudzbineEkran";
import Profile from "./screens/Profile";
import RestaurantScreen from "./screens/RestaurantScreen";
import RestoranLogin from "./screens/RestoranLogin";

import Welcome from "./screens/Welcome";
import MusterijaRegistracija from "./screens/MusterijaRegistracija";
import JelaRestoranaEkran from "./screens/JelaRestoranaEkran";
import KreirajJelo from "./screens/KreirajJelo";
import useKorisnikSkladiste from "../store/KorisnikSkladiste";
import Search from "./screens/PretragaEkran";
import MojeNarudzbine from "./screens/MojeNarudzbine";
import AdminLogin from "./screens/AdminLogin";
import AdminPanel from "./screens/AdminPanel";

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const TabNav = createBottomTabNavigator();

const headerOptions = {
  headerShown: false,
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
        name="Home"
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
      <Stack.Screen
        name="MojeNarudzbine"
        component={MojeNarudzbine}
        options={{
          headerShown: true,
          headerTitle: "Moje narudzbine",
          ...headerOptions,
        }}
      />
    </Stack.Navigator>
  );
};

const TabScreens = () => {
  const cartCount = useCartStore((state) => state.cart.length);
  const tipKorisnika = useKorisnikSkladiste((state) => state.tipKorisnika);

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
        headerShown: true,
        tabBarIcon: ({ focused }) => {
          const color = focused ? "#EF9920" : "gray";
          const iconSource = {
            Pocetna: icons.home,
            Pretraga: icons.search,
            Profil: icons.profile,
            Korpa: icons.cart,
            Narudzbine: icons.orders,
            JelaRestorana: icons.meals,
            KreirajJelo: icons.create,
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
                ? "Početna"
                : route.name === "Pretraga"
                ? "Pretraga"
                : route.name === "Profil"
                ? "Profil"
                : route.name === "Korpa"
                ? "Korpa"
                : route.name === "Narudzbine"
                ? "Narudžbine"
                : route.name === "JelaRestorana"
                ? "Jela"
                : route.name === "KreirajJelo"
                ? "Kreiraj jelo"
                : ""}
            </Text>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      {tipKorisnika === "musterija" ? (
        <>
          <TabNav.Screen name="Pocetna" component={HomeStack} />
          <TabNav.Screen name="Pretraga" component={Search} />
          <TabNav.Screen name="Profil" component={Profile} />
          <TabNav.Screen name="Korpa" component={CartScreen} />
        </>
      ) : (
        <>
          <TabNav.Screen name="Narudzbine" component={NarudzbineEkran} />
          <TabNav.Screen name="JelaRestorana" component={JelaRestoranaEkran} />
          <TabNav.Screen name="KreirajJelo" component={KreirajJelo} />
        </>
      )}
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
            name="MusterijaLogin"
            component={MusterijaLogin}
            options={{
              ...headerOptions,
              headerTitle: "Logovanje",
            }}
          />
          <Stack.Screen
            name="AdminLogin"
            component={AdminLogin}
            options={{
              ...headerOptions,
              headerTitle: "Logovanje",
            }}
          />
          <Stack.Screen
            name="AdminPanel"
            component={AdminPanel}
            options={{
              ...headerOptions,
              headerTitle: "Admin panel",
            }}
          />

          <Stack.Screen
            name="MusterijaRegistracija"
            component={MusterijaRegistracija}
            options={{
              ...headerOptions,
              headerTitle: "Registracija",
            }}
          />
          <Stack.Screen
            name="RestoranLogin"
            component={RestoranLogin}
            options={{
              ...headerOptions,
              headerTitle: "Logovanje",
            }}
          />

          {/* <Stack.Screen
            name="NarudzbineEkran"
            component={NarudzbineEkran}
            options={{
              ...headerOptions,
              headerTitle: "Narudzbine",
            }}
          /> */}

          {/* <Stack.Screen
            name="JelaRestorana"
            component={JelaRestoranaEkran}
            options={{
              ...headerOptions,
              headerTitle: "Sva jela",
            }}
          /> */}

          {/* <Stack.Screen
            name="KreirajJelo"
            component={KreirajJelo}
            options={{
              ...headerOptions,
              headerTitle: "Kreiraj jelo",
            }}
          /> */}
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
