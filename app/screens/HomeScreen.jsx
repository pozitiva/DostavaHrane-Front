import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { FlatList } from "react-native";
import RestaurantCard from "./../components/RestaurantCard";
import { vratiSveRestorane } from "../../api/restoranApi";

const Pocetna = () => {
  const [restorani, setRestorani] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const handleRestorans = async () => {
      const odgovor = await vratiSveRestorane();

      setRestorani(odgovor);
    };

    handleRestorans();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        className="flex-1 mx-4"
        data={restorani}
        renderItem={({ item }) => <RestaurantCard restoran={item} />}
        // keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </SafeAreaView>
  );
};

export default Pocetna;
