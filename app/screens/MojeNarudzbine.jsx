import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import { statusi } from "../../utils/zajednickiPodaci";

const MojeNarudzbine = () => {
  const { korisnik } = useKorisnikSkladiste.getState();
  const [izabraniStatus, setIzabraniStatus] = useState("Na cekanju");

  const filtriraneNarudzbine = izabraniStatus
    ? korisnik.narudzbine.filter((n) => n.status === izabraniStatus)
    : korisnik.narudzbine;
  return (
    <SafeAreaView className="p-4">
      <View className="my-4 ">
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
          <View className="bg-white rounded-lg p-4 mb-4 shadow-md border border-secondary">
            <Text className="text-lg font-bold mb-2">
              Narudžbina #{item.id}
            </Text>
            <Text className="text-base mb-1">
              Ukupna cena: {item.ukupnaCena}
            </Text>
            <Text className="text-base mb-1">
              Restoran: {item.restoran.ime}
            </Text>
            <Text className="text-base mb-1">Status: {item.status}</Text>
            <Text className="text-base ">Stavke narudzbine: </Text>

            {item.stavkeNarudzbine.map((stavka, index) => (
              <View key={index} className="rounded-lg mb-2">
                <Text className="text-base font-semibold">
                  {stavka.jelo.naziv}
                </Text>
                <Text className="text-sm">Količina: {stavka.kolicina}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MojeNarudzbine;
