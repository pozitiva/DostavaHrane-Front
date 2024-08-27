import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { vratiRestoran } from "../../api/restoranApi";
import { images } from "../../constants";
import DishCard from "../components/DishCard";

const RestaurantScreen = ({ route }) => {
  const { restoranId } = route.params;

  const [index, setIndex] = useState(0);
  const [restoran, setRestoran] = useState({});
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const vratiRestoranPoId = async () => {
      const odgovor = await vratiRestoran(restoranId);
      setRestoran(odgovor);

      // Group dishes by type
      const groupedDishes = odgovor.jela.reduce((groups, jelo) => {
        const { tipJela } = jelo;
        if (!groups[tipJela]) {
          groups[tipJela] = [];
        }
        groups[tipJela].push(jelo);
        return groups;
      }, {});

      // Check if grouped dishes exist
      if (Object.keys(groupedDishes).length === 0) {
        console.error("No dishes found for the restaurant.");
        return;
      }

      // Create routes and scenes dynamically based on dish types
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
                <DishCard dish={item} onPress={() => handlePress(item)} />
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

  const handlePress = (jela) => {
    navigation.navigate("Jelo", { jela });
  };

  // Check if routes and scenes are set before rendering TabView
  if (routes.length === 0 || Object.keys(scenes).length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-6">
        <Image source={images.cards} className="w-full h-48 rounded-lg" />
        <Text className="text-2xl font-bold mt-4">{restoran.ime}</Text>
        <Text className="text-left mt-2">
          Radno vreme: {restoran.radnoVreme}
        </Text>
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
    </SafeAreaView>
  );
};

export default RestaurantScreen;
