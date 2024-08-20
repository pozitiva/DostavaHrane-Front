import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { jelaMock } from "../../utils/dataMocks";
import DishCard from "../components/DishCard";

const RestaurantScreen = ({ route }) => {
  const { restoran } = route.params;
  const [jela, setJela] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "burgers", title: "Burgeri" },
    { key: "pasta", title: "Paste" },
  ]);

  useEffect(() => {
    setJela(jelaMock);
  }, []);

  const filterJela = (tip) => {
    return jela.filter(
      (jelo) => jelo.tip === tip && jelo.restoranId === restoran.id
    );
  };

  const BurgersRoute = () => (
    <FlatList
      data={filterJela("burgeri")}
      renderItem={({ item }) => <DishCard dish={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  const PastaRoute = () => (
    <FlatList
      data={filterJela("paste")}
      renderItem={({ item }) => <DishCard dish={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  const renderScene = SceneMap({
    burgers: BurgersRoute,
    pasta: PastaRoute,
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-6">
        <Image
          source={restoran.sourceSlike}
          className="w-full h-48 rounded-lg"
        />
        <Text className="text-2xl font-bold mt-4">{restoran.imeRestorana}</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
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
