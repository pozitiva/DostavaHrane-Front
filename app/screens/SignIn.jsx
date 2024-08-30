import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { images } from "../../constants";
import { useNavigation } from "expo-router";
import { loginUser } from "../../api/authApi";
import useMusterijaSkladiste from "./../../store/MusterijaSkladiste";

const SignIn = () => {
  const [musterija, setMusterija] = useState({
    email: "dunja@dunja.com",
    sifra: "dunja123",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik } = useMusterijaSkladiste();

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const odgovor = await loginUser(musterija);
      console.log(odgovor);
      if (odgovor !== null) {
        setKorisnik(odgovor);
        console.log(odgovor);
        navigation.navigate("MainTabs", {
          screen: "Pocetna",
        });
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
          value={musterija.email}
          handleChangeText={(e) => setMusterija({ ...musterija, email: e })}
          //otherStyles="mt-7"
          keyboardType="email-address"
          placeholder="Tvoj email"
        />
        <FormField
          title="PASSWORD"
          value={musterija.sifra}
          handleChangeText={(e) => setMusterija({ ...musterija, sifra: e })}
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
        <View className="flex-row justify-center mb-4">
          <Text className="text-xs text-gray-600">Nemaš nalogt? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Registruj")}>
            <Text className="text-xs text-orange-500">Kreiraj novi nalog.</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xs text-center text-gray-600 mb-4">Or</Text>

        <TouchableOpacity className="bg-red-600 rounded-lg p-4 flex-row items-center justify-center">
          <Image source={images.google} className="w-5 h-5 mr-3" />
          <Text className="text-white font-bold">CONNECT WITH GOOGLE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
