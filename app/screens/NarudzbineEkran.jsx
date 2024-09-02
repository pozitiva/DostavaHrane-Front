import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View, Text } from "react-native";
import { vratiSveNarudzbine } from "../../api/narudzbinaApi";

import NarudzbinaCard from "./../components/NarudzbinaCard";
import NarudzbinaModal from "./../components/NarudzbinaModal";
import CustomButton from "./../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const NarudzbineEkran = () => {
  const [narudzbine, setNarudzbine] = useState([]);
  const [izabranaNarudzbina, setIzabranaNarudzbina] = useState(null);
  const navigation = useNavigation();

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
    setIzabranaNarudzbina(narudzbina);
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold text-gray-900">
        Upravljaj narudzbinama
      </Text>
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
        />
      </View>

      {izabranaNarudzbina && (
        <NarudzbinaModal
          narudzbina={izabranaNarudzbina}
          onClose={() => setIzabranaNarudzbina(null)}
        />
      )}

      <Text className="text-xl font-bold text-gray-900">Upravljaj jelima</Text>
      <CustomButton
        title="Pogledaj sva jela"
        handlePress={() => {
          navigation.navigate("JelaRestorana");
        }}
        containerStyles="mb-10 mt-5"
      />
    </SafeAreaView>
  );
};

export default NarudzbineEkran;
