import React, { useEffect, useState } from "react";
import { FlatList, TextInput, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigation } from "@react-navigation/native";
import { vratiSveRestorane } from "../../api/restoranApi";

const Search = () => {
  const [restorani, setRestorani] = useState([]);

  useEffect(() => {
    const handleRestorans = async () => {
      try {
        const odgovor = await vratiSveRestorane();
        setRestorani(odgovor);
      } catch (error) {
        console.error("Error fetching restorani:", error);
      }
    };

    handleRestorans();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <TextInput
          placeholder="Pretraži restorane"
          className="p-3 bg-gray-200 rounded-md"
        />
      </View>
      <Text className="text-lg font-bold mt-4 mb-2 px-4">
        Najbolji restorarani
      </Text>
      <FlatList
        className="flex-1 mx-4"
        data={restorani}
        renderItem={({ item }) => <RestaurantCard restoran={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </SafeAreaView>
  );
};

export default Search;
