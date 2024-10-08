import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { registracijaMusterije } from "../../api/authApi";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const MusterijaRegistracija = () => {
  const [musterija, setMusterija] = useState({
    ime: "",
    email: "",
    brojTelefona: "",
    sifra: "",
    potvrdjenaSifra: "",
  });

  const [registracijaUspesno, setRegistracijaUspesno] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      console.log(musterija);
      const odgovor = await registracijaMusterije(musterija);

      setRegistracijaUspesno(true);
      setMusterija({
        ime: "",
        email: "",
        brojTelefona: "",
        sifra: "",
        potvrdjenaSifra: "",
      });
      console.log("Musterija je uspešno kreirana:", odgovor);
    } catch (error) {
      setError("Neuspešna registracija");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-3xl font-bold text-primary">Kreiraj nalog</Text>

        <View className="text-xs text-primary mt-2 mb-6">
          <Text>Unesi svoje podatke</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("MusterijaLogin")}
          >
            <Text className=" text-secondary">Već imaš nalog?</Text>
          </TouchableOpacity>
        </View>

        <FormField
          title="IME"
          value={musterija.ime}
          handleChangeText={(e) => setMusterija({ ...musterija, ime: e })}
          placeholder="Tvoje ime"
        />
        <FormField
          title="EMAIL"
          value={musterija.email}
          handleChangeText={(e) => setMusterija({ ...musterija, email: e })}
          keyboardType="email-address"
          placeholder="Tvoja email adresa"
        />
        <FormField
          title="BROJ TELEFONA"
          value={musterija.brojTelefona}
          handleChangeText={(e) =>
            setMusterija({ ...musterija, brojTelefona: e })
          }
          keyboardType="numeric"
          placeholder="Tvoje broj telefona"
        />

        <FormField
          title="SIFRA"
          value={musterija.sifra}
          handleChangeText={(e) => setMusterija({ ...musterija, sifra: e })}
          placeholder="Tvoja šifra"
        />

        <FormField
          title="POTVRDJENA SIFRA"
          value={musterija.potvrdjenaSifra}
          handleChangeText={(e) =>
            setMusterija({ ...musterija, potvrdjenaSifra: e })
          }
          placeholder="Tvoja potvrđena šifra"
        />

        <CustomButton
          title="Registruj se"
          handlePress={handleSignUp}
          containerStyles=" rounded-lg p-2 mb-4"
        />

        {error && <Text className="text-red-500">{error}</Text>}

        <View className=" flex-1 justify-center items-center">
          <Text className=" text-sm text-primary">
            Registracijom slažeš se sa uslovima korišćenja i politikom
            privatnosti.
          </Text>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={registracijaUspesno}
          onRequestClose={() => setRegistracijaUspesno(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-4 bg-white rounded-lg items-center">
              <Text className="text-lg font-bold mb-4">
                Uspesno ste se registrovali!
              </Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setRegistracijaUspesno(false);
                  navigation.navigate("MusterijaLogin");
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

export default MusterijaRegistracija;
