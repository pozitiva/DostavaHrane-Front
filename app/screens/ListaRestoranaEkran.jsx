import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { vratiSveRestorane } from "../../api/restoranApi";

const ListaRestorana = () => {
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
    <SafeAreaView className="p-4">
      <View className="my-4 ">
        <FlatList
          data={restorani}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-4 shadow-md border border-secondary">
              <Text className="text-lg font-bold mb-2 text-primary">
                Ime: {item.ime}
              </Text>
              <Text className="text-base mb-1 text-primary">
                Email: {item.email}
              </Text>
              <Text className="text-base mb-1 text-primary">
                Opis: {item.opis}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListaRestorana;
