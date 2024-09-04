import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import useNarudzbinaSkladiste from "../../store/NarudzbinaSkladiste";
import NarudzbinaCard from "./../components/NarudzbinaCard";
import NarudzbinaModal from "./../components/NarudzbinaModal";

const NarudzbineEkran = () => {
  const [izabranaNarudzbina, setIzabranaNarudzbina] = useState(null);
  const { narudzbine, ucitajNarudzbine } = useNarudzbinaSkladiste((state) => ({
    narudzbine: state.narudzbine,
    ucitajNarudzbine: state.ucitajNarudzbine,
  }));

  useEffect(() => {
    const obradiNarudzbine = async () => {
      try {
        await ucitajNarudzbine();
      } catch (error) {
        console.error("Error fetching narudzbine:", error);
      }
    };

    obradiNarudzbine();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <Text className="text-xl font-bold text-gray-900">
        Upravljaj narudzbinama
      </Text>

      <FlatList
        data={narudzbine}
        renderItem={({ item }) => (
          <View>
            <NarudzbinaCard
              narudzbina={item}
              onPress={() => setIzabranaNarudzbina(item)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

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
