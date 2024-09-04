import React, { useEffect, useState } from "react";
import { FlatList, TextInput, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "../components/RestaurantCard";
import { vratiSveRestorane } from "../../api/restoranApi";

const Search = () => {
  const [restorani, setRestorani] = useState([]);
  const [filteredRestorani, setFilteredRestorani] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleRestorans = async () => {
      try {
        const odgovor = await vratiSveRestorane();
        console.log("prvo odgovor");
        console.log(odgovor);
        setRestorani(odgovor.data);
        console.log("ispisujem restorane");
        console.log(restorani);
        setFilteredRestorani(odgovor.data);
      } catch (error) {
        console.error("Error fetching restorani:", error);
      }
    };

    handleRestorans();
  }, []);

  // useEffect(() => {
  //   const filtrirani = restorani.filter((restoran) =>
  //     restoran.naziv.toLowerCase().startsWith(searchQuery.toLowerCase())
  //   );
  //   setFilteredRestorani(filtrirani);
  // }, [searchQuery, restorani]);

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <TextInput
          placeholder="Pretraži restorane"
          className="p-3 bg-gray-200 rounded-md"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)} // Ažuriramo searchQuery pri promeni unosa
        />
      </View>
      <Text className="text-lg font-bold mt-4 mb-2 px-4">
        Najbolji restorani
      </Text>
      <FlatList
        className="flex-1 mx-4"
        data={filteredRestorani}
        renderItem={({ item }) => <RestaurantCard restoran={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </SafeAreaView>
  );
};

export default Search;
