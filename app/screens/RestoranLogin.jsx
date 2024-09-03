import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik, setTipKorisnika } = useKorisnikSkladiste();

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const odgovor = await loginRestoran(restoran);
      console.log(odgovor);
      if (odgovor !== null) {
        setKorisnik(odgovor);
        setTipKorisnika("restoran");
        console.log("Korisnik set in store:", odgovor);
        navigation.navigate("MainTabs", {
          screen: "NarudzbinaEkran",
        });
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
          <Text className="text-m text-gray-600 ">Nisi restoran? </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MusterijaLogin")}
          >
            <Text className="text-m text-secondary">
              Uloguj se kao musterija.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestoranLogin;
