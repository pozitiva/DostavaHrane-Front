import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginMusterija } from "../../api/authApi";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const MusterijaLogin = () => {
  const [musterija, setMusterija] = useState({
    email: "",
    sifra: "",
    tipKorisnika: "",
  });

  const [uspesanLog, setUspesanLog] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik, setTipKorisnika } = useKorisnikSkladiste();
  const [verzijaBrojac, setVerzijaBrojac] = useState(0);

  const handleLogin = async () => {
    try {
      const odgovor = await loginMusterija(musterija);

      if (odgovor !== null) {
        setKorisnik(odgovor);
        setTipKorisnika("musterija");
        setUspesanLog(true);
      }
    } catch (error) {
      setError("Neuspešno logovanje");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <ScrollView>
        <Text className="text-4xl font-bold text-primary">Dobrodošli!</Text>
        <Text className="text-xl text-primary mt-5 mb-10">
          Unesite vaše podatke
        </Text>
        <FormField
          title="EMAIL"
          value={musterija.email}
          handleChangeText={(e) => setMusterija({ ...musterija, email: e })}
          keyboardType="email-address"
          placeholder="primer@primer.com"
        />
        <FormField
          title="SIFRA"
          value={musterija.sifra}
          handleChangeText={(e) => setMusterija({ ...musterija, sifra: e })}
          placeholder="primersifre"
        />
        <CustomButton
          title="Uloguj se"
          handlePress={handleLogin}
          containerStyles=" rounded-lg p-4 mb-4 mt-7"
          textStyles="text-xl text-white text-center "
        />
        {error && <Text className="text-red-500">{error}</Text>}

        <View className="flex-row justify-center mb-8 mt-6">
          <Text className="text-m text-primary">Nemaš nalog? </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MusterijaRegistracija")}
          >
            <Text className="text-m text-secondary">Kreiraj novi nalog.</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-4 mt-8">
          <Text className="text-m text-primary ">Imaš restoran? </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("RestoranLogin")}
          >
            <Text className="text-m text-secondary">Upravljaj restoranom.</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-20 ">
          <TouchableOpacity
            onPress={() => {
              setVerzijaBrojac(verzijaBrojac + 1);
              if (verzijaBrojac === 5) {
                navigation.navigate("AdminLogin");
                setVerzijaBrojac(0);
              }
            }}
          >
            <Text className=" text-m align-middle text-primary">
              Verzija 1.0.0
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={uspesanLog}
          onRequestClose={() => setUspesanLog(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-4 bg-white rounded-lg items-center">
              <Text className="text-lg font-bold mb-4 text-primary">
                Uspešno logovanje!
              </Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setUspesanLog(false);
                  navigation.navigate("MainTabs", {
                    screen: "Pocetna",
                  });
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

export default MusterijaLogin;
