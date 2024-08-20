import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { restoraniMock } from "../../../utils/dataMocks";
import RestaurantCard from "./../../components/RestaurantCard";
import { FlatList } from "react-native";

const Pocetna = () => {
  const [restorani, setRestorani] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setRestorani(restoraniMock);
    // setRestorani(posaljiZahtevKaBeku())
  }, []);

  const handlePress = (restoran) => {
    navigation.navigate("Restoran", { restoran });
  };

  return (
    <SafeAreaView className="flex-1">
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

export default Pocetna;
