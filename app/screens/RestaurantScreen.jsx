import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { jelaMock } from "../../utils/dataMocks";
import DishCard from "../components/DishCard";

const RestaurantScreen = ({ route }) => {
  const { restoran } = route.params;
  const [dish, setDish] = useState([]);
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  const [routes] = useState([
    { key: "burgers", title: "Burgeri" },
    { key: "pasta", title: "Paste" },
  ]);

  useEffect(() => {
    setDish(jelaMock);
  }, []);

  const filterJela = (tip) => {
    return dish.filter(
      (jelo) => jelo.tip === tip && jelo.restoranId === restoran.id
    );
  };

  const handlePress = (dish) => {
    navigation.navigate("Jelo", { dish });
  };

  const BurgersRoute = () => (
    <FlatList
      data={filterJela("burgeri")}
      renderItem={({ item }) => <DishCard dish={item} onPress={handlePress} />}
      //renderItem={({ item }) => <DishCard dish={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  const PastaRoute = () => (
    <FlatList
      data={filterJela("paste")}
      //renderItem={({ item }) => <DishCard dish={item} />}
      renderItem={({ item }) => <DishCard dish={item} onPress={handlePress} />}
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
