import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";

import useNarudzbinaSkladiste from "../../store/NarudzbinaSkladiste";
import NarudzbinaCard from "./../components/NarudzbinaCard";
import NarudzbinaModal from "./../components/NarudzbinaModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { statusi } from "../../utils/zajednickiPodaci";

const NarudzbineEkran = () => {
  const [izabranaNarudzbina, setIzabranaNarudzbina] = useState(null);
  const [izabraniStatus, setIzabraniStatus] = useState("Na cekanju");
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

  const filtriraneNarudzbine = izabraniStatus
    ? narudzbine.filter((n) => n.status === izabraniStatus)
    : narudzbine;

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <View className="my-4 mt-4">
        <FlatList
          data={statusi}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`p-4 mr-4 rounded-lg ${
                izabraniStatus === item.naziv ? "bg-secondary" : "bg-gray-200"
              }`}
              onPress={() => setIzabraniStatus(item.naziv)}
            >
              <Text
                className={`text-center font-bold ${
                  izabraniStatus === item.naziv ? "text-white" : "text-gray-900"
                }`}
              >
                {item.naziv}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filtriraneNarudzbine}
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
