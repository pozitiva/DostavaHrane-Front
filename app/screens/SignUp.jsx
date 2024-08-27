import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { images } from "../../constants";
import { useNavigation } from "expo-router";
import { registerUser } from "../../api/authApi";

const SignUp = () => {
  const [musterija, setMusterija] = useState({
    ime: "",
    email: "",
    sifra: "",
    potvrdjenaSifra: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await registerUser(musterija);
      if (response === "Musterija je uspesno registrovana") {
        navigation.navigate("Uloguj");
      }
    } catch (error) {
      setError("Neuspešna registracija");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-3xl font-bold text-gray-900">Kreiraj nalog</Text>

        <View className="text-xs text-gray-600text-sm text-gray-600 mt-2 mb-6">
          <Text>Enter your Name, Email and Password for sign up.</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Uloguj")}>
            <Text className=" text-orange-500">Already have account?.</Text>
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
          title="ŠIFRA"
          value={musterija.sifra}
          handleChangeText={(e) => setMusterija({ ...musterija, sifra: e })}
          placeholder="Tvoja šifra"
        />

        <FormField
          title="POTVRĐENA ŠIFRA"
          value={musterija.potvrdjenaSifra}
          handleChangeText={(e) =>
            setMusterija({ ...musterija, potvrdjenaSifra: e })
          }
          placeholder="Tvoja potvrđena šifra"
        />

        <CustomButton
          title="Registruj se"
          // handlePress={() => {
          //   navigation.navigate("Pocetna");
          // }}
          handlePress={handleSignUp}
          containerStyles="#22A45D rounded-lg p-4 mb-4"
          isLoading={isSubmitting}
        />

        {error && <Text className="text-red-500">{error}</Text>}

        <View className=" flex-1 justify-center items-center">
          <Text className=" text-sm text-gray-600">
            By Signing up you agree to out Teams Conditions & Privacy Policy{" "}
          </Text>
        </View>

        <Text className="text-xs text-center text-gray-600 mb-4">Or</Text>

        <TouchableOpacity className="bg-blue-700 rounded-lg p-4 flex-row items-center justify-center mb-4">
          <Image source={images.facebook} className="w-5 h-5 mr-3" />
          <Text className="text-white font-bold">CONNECT WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-red-600 rounded-lg p-4 flex-row items-center justify-center">
          <Image source={images.google} className="w-5 h-5 mr-3" />
          <Text className="text-white font-bold">CONNECT WITH GOOGLE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
