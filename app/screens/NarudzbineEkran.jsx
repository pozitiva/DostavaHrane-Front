import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text } from "react-native";
import { vratiSveNarudzbine } from "../../api/narudzbinaApi";

import NarudzbinaCard from "./../components/NarudzbinaCard";
import NarudzbinaModal from "./../components/NarudzbinaModal";

const NarudzbineEkran = () => {
  const [narudzbine, setNarudzbine] = useState([]);
  const [izabranaNarudzbina, setIzabranaNarudzbina] = useState(null);

  useEffect(() => {
    const obradiNarudzbine = async () => {
      try {
        const odgovor = await vratiSveNarudzbine();
        setNarudzbine(odgovor);
      } catch (error) {
        console.error("Error fetching narudzbine:", error);
      }
    };

    obradiNarudzbine();
  }, []);

  const handleIzaberiNarudzbinu = (narudzbina) => {
    console.log("ovo govno");
    setIzabranaNarudzbina(narudzbina);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900">Narudzbine</Text>
      <View className="flex-1 pt-8 ">
        <FlatList
          className="flex-1 "
          data={narudzbine}
          renderItem={({ item }) => (
            <NarudzbinaCard
              narudzbina={item}
              onClick={handleIzaberiNarudzbinu}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          //numColumns={2}
          // /contentContainerStyle={{ alignItems: "center" }}
        />
      </View>
      {izabranaNarudzbina && (
        <NarudzbinaModal
          narudzbina={izabranaNarudzbina}
          onClose={() => setIzabranaNarudzbina(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default NarudzbineEkran;
