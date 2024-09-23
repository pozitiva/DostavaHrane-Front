import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Image, LogBox, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "../constants";
import useKorisnikSkladiste from "../store/KorisnikSkladiste";
import useKorpaSkladiste from "../store/KorpaSkladiste";
import BackButton from "./components/BackButton";
import AdminLogin from "./screens/AdminLogin";
import AdminPanel from "./screens/AdminPanel";
import CartScreen from "./screens/CartScreen";
import Pocetna from "./screens/HomeScreen";
import JelaRestoranaEkran from "./screens/JelaRestoranaEkran";
import KreirajDostavljaca from "./screens/KreirajDostavljaca";
import KreirajJelo from "./screens/KreirajJelo";
import KreirajRestoran from "./screens/KreirajRestoran";
import AdreseEkran from "./screens/MojeAdrese";
import MojeNarudzbine from "./screens/MojeNarudzbine";
import MusterijaLogin from "./screens/MusterijaLogin";
import MusterijaRegistracija from "./screens/MusterijaRegistracija";
import NalogEkran from "./screens/NalogEkran";
import NarudzbineEkran from "./screens/NarudzbineEkran";
import Search from "./screens/PretragaEkran";
import Profile from "./screens/Profile";
import RestaurantScreen from "./screens/RestaurantScreen";
import RestoranLogin from "./screens/RestoranLogin";
import Welcome from "./screens/Welcome";

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
          return (
            <Image
              source={iconSource}
              style={{ width: 24, height: 24, tintColor: color }}
            />
          );
        },
        tabBarLabel: ({ focused }) => {
          const color = focused ? "#EF9920" : "gray";
          let label;
          switch (route.name) {
            case "JelaRestorana":
              label = "Jela Restorana";
              break;
            case "KreirajJelo":
              label = "Kreiraj Jelo";
              break;
            default:
              label = route.name;
          }
          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
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
            options={{ ...headerOptions, headerTitle: "Narudžbine" }}
          />
          <Tab.Screen
            name="JelaRestorana"
            component={JelaRestoranaEkran}
            options={{
              ...headerOptions,
              headerTitle: "Jela Restorana",
            }}
          />
          <Tab.Screen
            name="KreirajJelo"
            component={KreirajJelo}
            options={{
              ...headerOptions,
              headerTitle: "Kreiraj Jelo",
            }}
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
