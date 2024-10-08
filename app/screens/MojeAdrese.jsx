import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import AdresaModal from "../components/AdresaModal";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import { useNavigation } from "expo-router";
import AdresaKartica from "../components/AdresaKartica";

const AdreseEkran = () => {
  const { korisnik, dodajAdresu } = useKorisnikSkladiste((state) => ({
    korisnik: state.korisnik,
    dodajAdresu: state.dodajAdresu,
  }));

  const navigation = useNavigation();
  const [adresa, setAdresa] = useState({
    id: "",
    naziv: "",
    ulica: "",
    grad: "",
  });
  const [adresaUspesno, setAdresaUspesno] = useState(false);
  const obradiKreiranjeAdrese = async () => {
    try {
      console.log(adresa);
      dodajAdresu(adresa);

      setAdresaUspesno(true);
      setAdresa({
        id: "",
        naziv: "",
        ulica: "",
        grad: "",
      });
      console.log("Adresa je uspešno kreirana:");
    } catch (error) {
      console.error("Došlo je do greške prilikom kreiranja adrese:", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4">
          <View>
            <Text className="text-2xl font-bold mb-3 text-primary ">
              Dodaj novu adresu
            </Text>
            <FormField
              title="Naziv"
              value={adresa.naziv}
              handleChangeText={(e) =>
                setAdresa({ ...adresa, naziv: e.target.value })
              }
              // otherStyles="w-[93%]"
            />
            <FormField
              title="Ulica"
              value={adresa.ulica}
              handleChangeText={(e) =>
                setAdresa({ ...adresa, ulica: e.target.value })
              }
              // otherStyles="w-[93%]"
            />
            <FormField
              title="Grad"
              value={adresa.grad}
              handleChangeText={(e) =>
                setAdresa({ ...adresa, grad: e.target.value })
              }
              // otherStyles="w-[93%]"
            />
            <CustomButton
              title="Dodaj adresu"
              handlePress={obradiKreiranjeAdrese}
              containerStyles="w-full h-[48px] rounded-full"
            />
          </View>
          <Text className="text-xl font-bold mt-5 text-primary ">Adrese:</Text>
          <FlatList
            data={korisnik.adrese}
            renderItem={({ item }) => (
              <View>
                <AdresaKartica onPress={() => setAdresa(item)} adresa={item} />
              </View>
            )}
            key={(item) => item.id}
            keyExtractor={(item) => item.naziv}
          />
          {adresa && (
            <AdresaModal adresa={adresa} onClose={() => setAdresa("")} />
          )}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={adresaUspesno}
          onRequestClose={() => setAdresaUspesno(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-4 bg-white rounded-lg items-center">
              <Text className="text-lg font-bold mb-4">
                Adresa je uspešno napravljena!
              </Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setAdresaUspesno(false);
                  navigation.navigate("Profil");
                }}
                containerStyles="w-full h-[48px] rounded-full"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdreseEkran;
