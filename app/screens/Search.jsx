import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { restoraniMock } from "../../utils/dataMocks";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigation } from "expo-router";

const Search = () => {
  const [restorani, setRestorani] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setRestorani(restoraniMock);
    // setRestorani(posaljiZahtevKaBeku())
  }, []);

  const handlePress = (restoran) => {
    //navigation.navigate("Restoran", { restoran });
    navigation.navigate("Restoran", { restoran });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <Text className="text-2xl font-bold">Search</Text>
        <TextInput
          placeholder="Search on foodly"
          className="mt-2 p-3 bg-gray-200 rounded-md"
          editable={true}
          style={{ zIndex: 1 }}
        />
      </View>
      <Text className="text-lg font-bold mt-4 mb-2 px-4">Top Restaurants</Text>
      <FlatList
        className="flex-1 mx-4"
        data={restorani}
        renderItem={({ item }) => (
          <RestaurantCard restoran={item} onPress={handlePress} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </SafeAreaView>
  );
};

export default Search;
