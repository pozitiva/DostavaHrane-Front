import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { kreirajRestoran } from "../../api/restoranApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { Image } from "react-native";
import { API_BASE_URL } from "../../utils/zajednickiPodaci";

const KreirajRestoran = () => {
  const [restoran, setRestoran] = useState({
    ime: "",
    opis: "",
    email: "",
    sifra: "",
    slikaUrl: "",
  });
  const [restoranUspesno, setRestoranUspesno] = useState(false);

  const navigation = useNavigation();

  const obradiBiranjeSlike = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setRestoran({ ...restoran, slikaUrl: result.assets[0].uri });
    }
  };

  const obradiKreiranjeRestorana = async () => {
    try {
      const formData = new FormData();
      formData.append("slika", {
        uri: restoran.slikaUrl,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      formData.append("ime", restoran.ime);
      formData.append("opis", restoran.opis);
      formData.append("email", restoran.email);
      formData.append("sifra", restoran.sifra);

      await kreirajRestoran(formData);

      setRestoranUspesno(true);
      setRestoran({
        ime: "",
        opis: "",
        email: "",
        sifra: "",
        slikaUrl: "",
      });
    } catch (error) {
      console.error("Došlo je do greške prilikom kreiranja restorana:", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4">
          <FormField
            title="Ime"
            value={restoran.ime}
            handleChangeText={(e) => setRestoran({ ...restoran, ime: e })}
          />
          <FormField
            title="Opis"
            value={restoran.opis}
            handleChangeText={(e) => setRestoran({ ...restoran, opis: e })}
          />
          <FormField
            title="Email"
            value={restoran.email}
            handleChangeText={(e) => setRestoran({ ...restoran, email: e })}
            keyboardType="email-address"
          />
          <FormField
            title="Sifra"
            value={restoran.sifra}
            handleChangeText={(e) => setRestoran({ ...restoran, sifra: e })}
          />

          <CustomButton
            title="Izaberite sliku"
            handlePress={obradiBiranjeSlike}
            containerStyles="w-full h-[48px] rounded-full mt-10 mb-10"
          />

          {restoran.slikaUrl && (
            <Image
              source={{ uri: `${API_BASE_URL}${restoran.slikaUrl}` }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <CustomButton
            title="Kreiraj restoran"
            handlePress={obradiKreiranjeRestorana}
            containerStyles="w-full h-[48px] rounded-full"
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={restoranUspesno}
          onRequestClose={() => setRestoranUspesno(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-4 bg-white rounded-lg items-center">
              <Text className="text-lg font-bold mb-4">
                Restoran je uspešno kreiran!
              </Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setRestoranUspesno(false);
                  navigation.navigate("AdminPanel");
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

export default KreirajRestoran;
