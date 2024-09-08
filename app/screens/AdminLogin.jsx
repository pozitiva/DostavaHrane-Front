import { View, Text } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import { loginAdmin } from "../../api/authApi";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({
    email: "admin@admin.admin",
    sifra: "milos145",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik, setTipKorisnika } = useKorisnikSkladiste();

  const handleLogin = async () => {
    setIsSubmitting(true);
    setError(null);
    // try {
    const odgovor = await loginAdmin(admin);
    console.log(odgovor);
    if (odgovor !== null) {
      setKorisnik(odgovor);
      setTipKorisnika("admin");
      navigation.navigate("AdminPanel");
    }
    // } catch (error) {
    //   setError("Neuspešno logovanje");
    // }
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-4xl font-bold text-gray-900">
          Uloguj se kao admin!
        </Text>
        <Text className="text-xl text-gray-600 mt-2 mb-6">Unesi podatke</Text>
        <FormField
          title="EMAIL"
          value={admin.email}
          handleChangeText={(e) => setAdmin({ ...admin, email: e })}
          keyboardType="email-address"
          placeholder="restoran@restoran.com"
        />
        <FormField
          title="PASSWORD"
          value={admin.sifra}
          handleChangeText={(e) => setAdmin({ ...admin, sifra: e })}
          placeholder="primersifre"
        />
        <CustomButton
          title="Uloguj se"
          handlePress={handleLogin}
          containerStyles="#22A45D rounded-lg p-4 mb-9 mt-9"
        />
        {error && <Text className="text-red-500">{error}</Text>}

        {/* <View className="flex-row justify-center mb-4 mt-5">
          <Text className="text-m text-gray-600 ">Nisi restoran? </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MusterijaLogin")}
          >
            <Text className="text-m text-secondary">
              Uloguj se kao musterija.
            </Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminLogin;
