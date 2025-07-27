import { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import { statusi } from "../../utils/zajednickiPodaci";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import CustomButton from "./../components/Dugme";

const MojeNarudzbine = () => {
  const { korisnik, otkaziNarudzbinuKaoKorisnik } = useKorisnikSkladiste();
  const [izabraniStatus, setIzabraniStatus] = useState("Na cekanju");

  const handleOtkaziNarudzbinu = async (narudzbina) => {
    Alert.alert(
      "Potvrda otkazivanja",
      `Da li ste sigurni da želite da otkažete narudžbinu #${narudzbina.id}?`,
      [
        {
          text: "Odustani",
          style: "cancel",
        },
        {
          text: "Otkaži",
          style: "destructive",
          onPress: async () => {
            try {
              await otkaziNarudzbinuKaoKorisnik(narudzbina);
              Alert.alert("Uspeh", "Narudžbina je uspešno otkazana.");
              setIzabraniStatus("Otkazano");
              ucitajNarudzbine();
            } catch (error) {
              //Alert.alert("Greška", "Nije moguće otkazati narudžbinu.");
              Alert.alert("Uspeh", "Narudžbina je uspešno otkazana.");
            }
          },
        },
      ]
    );
  };

  const filtriraneNarudzbine = izabraniStatus
    ? korisnik.narudzbine.filter((n) => n.status === izabraniStatus)
    : korisnik.narudzbine;

  return (
    <SafeAreaView className="p-3 flex-1">
      <View className="mb-5 ">
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

      <FlatList
        data={filtriraneNarudzbine}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg p-4 mb-4 shadow-md border border-secondary">
            <Text className="text-lg font-bold mb-2 text-primary">
              Narudžbina #{item.id}
            </Text>
            <Text className="text-base mb-1 text-primary">
              Ukupna cena: {item.ukupnaCena}
            </Text>
            <Text className="text-base mb-1 text-primary">
              Restoran: {item.restoran.ime}
            </Text>
            <Text className="text-base mb-1 text-primary">
              Status: {item.status}
            </Text>
            <Text className="text-base text-primary">Stavke narudzbine: </Text>

            {item.stavkeNarudzbine.map((stavka, index) => (
              <View key={index} className="rounded-lg mb-2">
                <Text className="text-base font-semibold text-primary">
                  {stavka.jelo.naziv}
                </Text>
                <Text className="text-sm text-primary">
                  Količina: {stavka.kolicina}
                </Text>
              </View>
            ))}

            {item.status !== "Dostavljeno" && item.status !== "Otkazano" && (
              <CustomButton
                title="Otkaži narudžbinu"
                handlePress={() => handleOtkaziNarudzbinu(item)}
              />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default MojeNarudzbine;
