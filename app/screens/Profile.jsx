import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { kreirajAdresu } from "../../api/adresaApi";
import useAdresaSkladiste from "../../store/AdresaSkladiste";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import AdresaKartica from "../components/AdresaKartica";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import AdresaModal from "../components/AdresaModal";

const Profile = () => {
  const { korisnik } = useKorisnikSkladiste.getState();

  const { adrese, ucitajAdrese } = useAdresaSkladiste((state) => ({
    adrese: state.adrese,
    ucitajAdrese: state.ucitajAdrese,
  }));

  const [adresa, setAdresa] = useState({
    id: "",
    naziv: "",
    ulica: "",
    grad: "",
  });
  const [adresaUspesno, setAdresaUspesno] = useState(false);

  useEffect(() => {
    const obradiAdrese = async () => {
      try {
        await ucitajAdrese();
      } catch (error) {
        console.error("Greska prilikom ucitavanja adresa:", error);
      }
    };

    obradiAdrese();
  }, []);

  const obradiKreiranjeAdrese = async () => {
    try {
      await kreirajAdresu(adresa);
      await ucitajAdrese();

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
      <View className="ml-3">
        <Text className="text-xl font-bold">{korisnik.ime}</Text>

        <Text className="text-lg font-semibold mt-6 ">Adrese:</Text>
        <FlatList
          data={adrese}
          renderItem={({ item }) => (
            <View>
              <AdresaKartica onPress={() => setAdresa(item)} adresa={item} />
            </View>
          )}
          key={(item) => item.id}
          keyExtractor={(item) => item.naziv}
        />
        <View className="p-4">
          <Text className="text-xl font-bold mb-5 "> Dodaj novu adresu</Text>
          <FormField
            title="Naziv"
            value={adresa.naziv}
            handleChangeText={(e) => setAdresa({ ...adresa, naziv: e })}
            otherStyles="w-[93%]"
          />
          <FormField
            title="Ulica"
            value={adresa.ulica}
            handleChangeText={(e) => setAdresa({ ...adresa, ulica: e })}
            otherStyles="w-[93%]"
          />
          <FormField
            title="Grad"
            value={adresa.grad}
            handleChangeText={(e) => setAdresa({ ...adresa, grad: e })}
            otherStyles="w-[93%]"
          />
          <CustomButton
            title="Kreiraj adresu"
            handlePress={obradiKreiranjeAdrese}
            containerStyles="w-full h-[48px] rounded-full"
          />
        </View>
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
                //navigation.navigate("Pocetna");
              }}
              containerStyles="w-full h-[48px] rounded-full"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
