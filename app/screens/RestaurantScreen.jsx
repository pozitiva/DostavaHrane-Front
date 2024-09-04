import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { vratiRestoran } from "../../api/restoranApi";
import DishCard from "../components/DishCard";
import JeloModal from "../components/JeloModal";
import useJeloSkladiste from "../../store/JeloSkladiste";

const RestaurantScreen = ({ route }) => {
  const { restoranId } = route.params;

  const [index, setIndex] = useState(0);
  const [restoran, setRestoran] = useState({});
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState({});
  const [jelo, setJelo] = useState("");

  const { jela, ucitajJela } = useJeloSkladiste((state) => ({
    jela: state.jela,
    ucitajJela: state.ucitajJela,
  }));

  useEffect(() => {
    const vratiRestoranPoId = async () => {
      const odgovor = await vratiRestoran(restoranId);
      setRestoran(odgovor);

      const groupedDishes = odgovor.jela.reduce((groups, jelo) => {
        const { tipJela } = jelo;
        if (!groups[tipJela]) {
          groups[tipJela] = [];
        }
        groups[tipJela].push(jelo);
        return groups;
      }, {});

      if (Object.keys(groupedDishes).length === 0) {
        console.error("No dishes found for the restaurant.");
        return;
      }

      const generatedRoutes = Object.keys(groupedDishes).map((tipJela) => ({
        key: tipJela,
        title: tipJela.charAt(0).toUpperCase() + tipJela.slice(1),
      }));

      const generatedScenes = Object.keys(groupedDishes).reduce(
        (scenes, tipJela) => {
          scenes[tipJela] = () => (
            <FlatList
              data={groupedDishes[tipJela]}
              renderItem={({ item }) => (
                <View>
                  <DishCard onPress={() => setJelo(item)} jelo={item} />
                </View>
              )}
              keyExtractor={(item) => item.naziv}
            />
          );
          return scenes;
        },
        {}
      );

      setRoutes(generatedRoutes);
      setScenes(generatedScenes);
    };

    vratiRestoranPoId();
  }, [restoranId]);

  if (routes.length === 0 || Object.keys(scenes).length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-6">
        <Image
          source={{ uri: `http://192.168.0.13:5076${restoran.slikaUrl}` }}
          className="w-full h-48 rounded-lg"
        />
        <Text className="text-2xl font-bold ml-1">{restoran.ime}</Text>
        <Text className="text-left ">{restoran.opis}</Text>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap(scenes)}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "black" }}
            style={{ backgroundColor: "white" }}
            labelStyle={{ color: "black", fontWeight: "bold" }}
          />
        )}
      />
      {jelo && <JeloModal jelo={jelo} onClose={() => setJelo("")} />}
    </SafeAreaView>
  );
};

export default RestaurantScreen;
