// screens/Pocetna.js

import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, View } from "react-native";
import RestaurantCard from "../components/RestaurantCard";
import { vratiSveRestorane } from "../../api/restoranApi";
import BackButton from "../components/BackButton";

const Pocetna = () => {
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
      <View className="flex-1 pt-16">
        <FlatList
          className="flex-1 mx-4"
          data={restorani}
          renderItem={({ item }) => <RestaurantCard restoran={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pocetna;
