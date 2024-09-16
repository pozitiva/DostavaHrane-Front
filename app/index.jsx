import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, LogBox, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "../constants";
import useKorpaSkladiste from "../store/KorpaSkladiste";
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
import KreirajRestoran from "./screens/KreirajRestoran";
import KreirajDostavljaca from "./screens/KreirajDostavljaca";
import NalogEkran from "./screens/NalogEkran";
import AdreseEkran from "./screens/MojeAdrese";

LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const headerOptions = {
  headerTitleAlign: "center",
  headerTitleStyle: {
    color: "#EF9920",
  },
  headerLeft: () => <BackButton />,
};

const TabIcon = ({ focused, icon }) => {
  const color = focused ? "#EF9920" : "gray";
  return (
    <Image
      source={icon}
      style={{
        width: 24,
        height: 24,
        tintColor: color,
      }}
    />
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen
        name="PocetnaEkran"
        component={Pocetna}
        options={{ headerTitle: "Početna" }}
      />
      <Stack.Screen
        name="Restoran"
        component={RestaurantScreen}
        options={{ headerTitle: "Restoran" }}
      />
      <Stack.Screen
        name="NalogEkran"
        component={NalogEkran}
        options={{ headerTitle: "Nalog" }}
      />
      <Stack.Screen
        name="AdreseEkran"
        component={AdreseEkran}
        options={{ headerTitle: "Moje adrese" }}
      />
      <Stack.Screen
        name="MojeNarudzbine"
        component={MojeNarudzbine}
        options={{ headerTitle: "Moje narudžbine" }}
      />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  const cartCount = useKorpaSkladiste((state) => state.cart.length);
  const tipKorisnika = useKorisnikSkladiste((state) => state.tipKorisnika);

  const BadgeIcon = ({ icon, badgeCount }) => (
    <View style={{ position: "relative", alignItems: "center" }}>
      <Image
        source={icon}
        style={{ width: 24, height: 24, tintColor: "grey" }}
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
    <Tab.Navigator
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
          <Tab.Screen
            name="Pocetna"
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Pretraga"
            component={Search}
            options={{ ...headerOptions, headerTitle: "Pretraga" }}
          />
          <Tab.Screen
            name="Profil"
            component={Profile}
            options={{ ...headerOptions, headerTitle: "Profil" }}
          />
          <Tab.Screen
            name="Korpa"
            component={CartScreen}
            options={{
              ...headerOptions,
              headerTitle: "Korpa",
              tabBarBadge: cartCount > 0 ? cartCount : null,
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Narudzbine"
            component={NarudzbineEkran}
            options={{ ...headerOptions, headerTitle: "Narudzbine" }}
          />
          <Tab.Screen
            name="JelaRestorana"
            component={JelaRestoranaEkran}
            options={{ ...headerOptions, headerTitle: "Jela" }}
          />
          <Tab.Screen
            name="KreirajJelo"
            component={KreirajJelo}
            options={{ ...headerOptions, headerTitle: "Kreiraj jelo" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="MusterijaLogin" component={MusterijaLogin} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="KreirajRestoran" component={KreirajRestoran} />
          <Stack.Screen
            name="KreirajDostavljaca"
            component={KreirajDostavljaca}
          />
          <Stack.Screen name="AdminPanel" component={AdminPanel} />
          <Stack.Screen
            name="MusterijaRegistracija"
            component={MusterijaRegistracija}
          />
          <Stack.Screen name="RestoranLogin" component={RestoranLogin} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
