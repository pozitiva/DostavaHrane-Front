import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginRestoran } from "../../api/authApi";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const RestoranLogin = () => {
  const [restoran, setRestoran] = useState({
    email: "kfc@kfc.com",
    sifra: "dunja123",
  });

  const [uspesanLog, setUspesanLog] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik, setTipKorisnika } = useKorisnikSkladiste();
  const [verzijaBrojac, setVerzijaBrojac] = useState(0);

  const handleLogin = async () => {
    try {
      const odgovor = await loginRestoran(restoran);
      if (odgovor !== null) {
        setKorisnik(odgovor);
        setTipKorisnika("restoran");
        setUspesanLog(true);
      }
    } catch (error) {
      setError("Neuspešno logovanje");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-4xl font-bold text-gray-900">
          Uloguj se kao restoran!
        </Text>
        <Text className="text-xl text-gray-600 mt-2 mb-6">
          Unesi podatke svog restorana
        </Text>
        <FormField
          title="EMAIL"
          value={restoran.email}
          handleChangeText={(e) => setRestoran({ ...restoran, email: e })}
          keyboardType="email-address"
          placeholder="restoran@restoran.com"
        />
        <FormField
          title="PASSWORD"
          value={restoran.sifra}
          handleChangeText={(e) => setRestoran({ ...restoran, sifra: e })}
          placeholder="primersifre"
        />
        <CustomButton
          title="Uloguj se"
          handlePress={handleLogin}
          containerStyles="#22A45D rounded-lg p-4 mb-9 mt-9"
        />
        {error && <Text className="text-red-500">{error}</Text>}

        <View className="flex-row justify-center mb-4 mt-5">
          <Text className="text-m text-gray-600 ">
            Ne upravljaš restoranom?{" "}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MusterijaLogin")}
          >
            <Text className="text-m text-secondary">
              Uloguj se kao mušterija.
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-36 ">
          <TouchableOpacity
            onPress={() => {
              setVerzijaBrojac(verzijaBrojac + 1);
              if (verzijaBrojac === 5) {
                navigation.navigate("AdminLogin");
                setVerzijaBrojac(0);
              }
            }}
          >
            <Text className=" text-m align-middle text-gray-600">
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
              <Text className="text-lg font-bold mb-4">Uspešno logovanje!</Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setUspesanLog(false);
                  navigation.navigate("MainTabs", {
                    screen: "NarudzbinaEkran",
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

export default RestoranLogin;
