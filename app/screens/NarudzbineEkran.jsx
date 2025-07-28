import { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNarudzbinaStore } from "../../store/NarudzbinaSkladiste";
import NarudzbinaCard from "../components/NarudzbinaKartica";
import NarudzbinaModal from "./../components/NarudzbinaModal";
import { statusi } from "../../utils/zajednickiPodaci";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const NarudzbineEkran = () => {
  const [izabranaNarudzbina, setIzabranaNarudzbina] = useState(null);
  const [izabraniStatus, setIzabraniStatus] = useState("Na cekanju");

  const {
    narudzbine,
    isLoading,
    pendingChanges,
    syncedJustNow,
    clearJustSynced,
    izmeniNarudzbinu,
    ucitajNarudzbine,
    sinhronizujOfflinePromene,
  } = useNarudzbinaStore((state) => state);

  useFocusEffect(
    useCallback(() => {
      console.log("Ekran je u fokusu, pokrećem sinhronizaciju i učitavanje...");
      sinhronizujOfflinePromene().then(() => {
        ucitajNarudzbine();
      });
    }, [])
  );

  useEffect(() => {
    if (syncedJustNow.length > 0) {
      const message = `Uspešno je sinhronizovano ${syncedJustNow.length} narudžbina koje su čekale.`;
      Alert.alert("Sinhronizacija uspešna!", message);
      clearJustSynced();
    }
  }, [syncedJustNow]);

  const promeniStatusNarudzbine = async (narudzbina, noviStatus) => {
    const izmenjenaNarudzbina = {
      ...narudzbina,
      status: noviStatus,
      VremeDogadjaja: new Date().toISOString(),
    };
    try {
      return izmeniNarudzbinu(izmenjenaNarudzbina);
    } catch (error) {
      console.error("Greška u komponenti prilikom izmene statusa:", error);
      Alert.alert("Greška", "Neuspešna izmena statusa narudžbine.");
    }
  };

  const filtriraneNarudzbine = izabraniStatus
    ? narudzbine.filter((n) => n.status === izabraniStatus)
    : narudzbine;

  const renderContent = () => {
    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }

    if (filtriraneNarudzbine.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>
            Nema narudžbina sa izabranim statusom.
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filtriraneNarudzbine}
        renderItem={({ item }) => (
          <View>
            <NarudzbinaCard
              narudzbina={item}
              onPress={() => setIzabranaNarudzbina(item)}
              isPending={!!pendingChanges[item.id]}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

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
                  izabraniStatus === item.naziv ? "text-white" : "text-primary"
                }`}
              >
                {item.naziv}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{ flex: 1 }}>{renderContent()}</View>

      {izabranaNarudzbina && (
        <NarudzbinaModal
          narudzbina={izabranaNarudzbina}
          onClose={() => setIzabranaNarudzbina(null)}
          promeniStatusNarudzbine={promeniStatusNarudzbine}
        />
      )}
    </SafeAreaView>
  );
};

export default NarudzbineEkran;
