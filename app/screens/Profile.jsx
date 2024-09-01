import React, { useState } from "react";
import { Modal, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useMusterijaSkladiste from "../../store/KorisnikSkladiste";
import FormField from "../components/FormField";
import ListaAdresa from "../components/ListaAdresa";
import CustomButton from "../components/CustomButton";
import { kreirajAdresu } from "../../api/adresaApi";

const Profile = () => {
  const { korisnik } = useMusterijaSkladiste.getState();
  const [adresa, setAdresa] = useState({
    naziv: "",
    ulica: "",
    grad: "",
  });
  const [adresaUspesno, setAdresaUspesno] = useState(false);

  const obradiKreiranjeAdrese = async () => {
    try {
      const odgovor = await kreirajAdresu(adresa);

      if (odgovor === "Adresa je uspesno dodato") {
        setAdresaUspesno(true);
        setAdresa({
          naziv: "",
          ulica: "",
          grad: "",
        });
        console.log("Adresa je uspešno kreirana:", odgovor);
      }
    } catch (error) {
      console.error("Došlo je do greške prilikom kreiranja adrese:", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="ml-3">
          <Text className="text-xl font-bold">Ime: {korisnik.ime}</Text>

          <Text className="text-lg font-semibold mt-6 ml-4">Adrese:</Text>
          <ListaAdresa addresses={korisnik.adrese} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
