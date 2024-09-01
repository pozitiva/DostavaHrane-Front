import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loginRestoran } from "../../api/authApi";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import useMusterijaSkladiste from "../../store/KorisnikSkladiste";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";

const RestoranLogin = () => {
  const [restoran, setRestoran] = useState({
    email: "kfc@kfc.com",
    sifra: "dunja123",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik } = useKorisnikSkladiste();

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const odgovor = await loginRestoran(restoran);
      console.log(odgovor);
      if (odgovor !== null) {
        setKorisnik(odgovor);
        // console.log(odgovor);
        navigation.navigate("NarudzbineEkran");
        // navigation.navigate("Pocetna");
      }
    } catch (error) {
      setError("Neuspešno logovanje");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-3xl font-bold text-gray-900">Dobrodošli!</Text>
        <Text className="text-sm text-gray-600 mt-2 mb-6">
          Enter your Phone number or Email address for sign in. Enjoy your food
        </Text>
        <FormField
          title="EMAIL"
          value={restoran.email}
          handleChangeText={(e) => setRestoran({ ...restoran, email: e })}
          //otherStyles="mt-7"
          keyboardType="email-address"
          placeholder="Tvoj email"
        />
        <FormField
          title="PASSWORD"
          value={restoran.sifra}
          handleChangeText={(e) => setRestoran({ ...restoran, sifra: e })}
          //otherStyles="mt-7"
          placeholder="Tvoja sifra"
        />
        <CustomButton
          title="Uloguj se"
          handlePress={handleLogin}
          containerStyles="#22A45D rounded-lg p-4 mb-4"
          //isLoading={isSubmitting}
        />
        {error && <Text className="text-red-500">{error}</Text>}

        <View className="flex-row justify-center mb-4 mt-5">
          <Text className="text-xs text-gray-600 ">Nisi restoran? </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MusterijaLogin")}
          >
            <Text className="text-xs text-orange-500">
              Uloguj se kao musterija.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RestoranLogin;
