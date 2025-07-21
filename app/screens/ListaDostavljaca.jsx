import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { vratiSveDostavljace } from "../../api/dostavljacApi";

const ListaDostavljaca = () => {
  const [dostavljaci, setDostavljaci] = useState([]);

  useEffect(() => {
    const obradiDostavljace = async () => {
      try {
        const odgovor = await vratiSveDostavljace();
        setDostavljaci(odgovor);
      } catch (error) {
        console.error("Error fetching restorani:", error);
      }
    };

    obradiDostavljace();
  }, []);

  return (
    <SafeAreaView className="p-4">
      <View className="my-4 ">
        <FlatList
          data={dostavljaci}
          renderItem={({ item }) => (
            <View className="bg-white rounded-lg p-4 mb-4 shadow-md border border-secondary">
              <Text className="text-lg font-bold mb-2 text-primary">
                Ime: {item.ime}
              </Text>
              <Text className="text-base mb-1 text-primary">
                Broj telefona: {item.brojTelefona}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ListaDostavljaca;
