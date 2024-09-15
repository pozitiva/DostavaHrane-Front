import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import { FlatList } from "react-native-gesture-handler";
import NarudzbinaCard from "../components/NarudzbinaCard";
import useNarudzbinaSkladiste from "../../store/NarudzbinaSkladiste";
import NarudzbinaModal from "../components/NarudzbinaModal";
import { SafeAreaView } from "react-native-safe-area-context";

const MojeNarudzbine = () => {
  const { korisnik } = useKorisnikSkladiste.getState();

  const [izabranaNarudzbina, setIzabranaNarudzbina] = useState(null);

  return (
    <SafeAreaView className="p-4">
      <FlatList
        data={korisnik.narudzbine}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg p-4 mb-4 shadow-md border border-secondary-200">
            <Text className="text-lg font-bold mb-2">
              Narudžbina #{item.id}
            </Text>
            <Text className="text-base mb-1">
              Ukupna cena: {item.ukupnaCena}
            </Text>
            <Text className="text-base mb-1">Restoran: {item.restoran}</Text>
            <Text className="text-base mb-1">Status: {item.status}</Text>
            <Text className="text-base ">Stavke narudzbine: </Text>

            {item.stavkeNarudzbine.map((stavka, index) => (
              <View key={index} className="rounded-lg mb-2">
                <Text className="text-base font-semibold">
                  {stavka.jeloIme}
                </Text>
                <Text className="text-sm">Količina: {stavka.kolicina}</Text>
              </View>
            ))}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default MojeNarudzbine;
