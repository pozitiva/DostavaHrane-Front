import { View, Text, Modal } from "react-native";
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
    email: "",
    sifra: "",
  });

  const [uspesanLog, setUspesanLog] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { setKorisnik, setTipKorisnika } = useKorisnikSkladiste();

  const handleLogin = async () => {
    try {
      const odgovor = await loginAdmin(admin);
      if (odgovor !== null) {
        setKorisnik(odgovor);
        setTipKorisnika("admin");
        setUspesanLog(true);
      }
    } catch (error) {
      setError("Neuspešno logovanje");
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-4xl font-bold text-primary">
          Uloguj se kao admin!
        </Text>
        <Text className="text-xl text-primary mt-2 mb-6">Unesi podatke</Text>
        <FormField
          title="EMAIL"
          value={admin.email}
          handleChangeText={(e) => setAdmin({ ...admin, email: e })}
          keyboardType="email-address"
          placeholder="restoran@restoran.com"
        />
        <FormField
          title="SIFRA"
          value={admin.sifra}
          handleChangeText={(e) => setAdmin({ ...admin, sifra: e })}
          placeholder="primersifre"
        />
        <CustomButton
          title="Uloguj se"
          handlePress={handleLogin}
          containerStyles="#22A45D rounded-lg p-4 mb-9 mt-9"
          textStyles="text-xl text-white text-center"
        />
        {error && <Text className="text-red-500">{error}</Text>}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={uspesanLog}
        onRequestClose={() => setUspesanLog(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[300px] p-4 bg-white rounded-lg items-center">
            <Text className="text-lg font-bold mb-4">
              Uspešno prijavljivanje!
            </Text>
            <CustomButton
              title="Zatvori"
              handlePress={() => {
                setUspesanLog(false);
                navigation.navigate("AdminPanel");
              }}
              containerStyles="w-full h-[48px] rounded-full"
              textStyles="text-xl text-white text-center"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminLogin;
