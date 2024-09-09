import { View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { kreirajAdresu } from "../../api/adresaApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { kreirajDostavljaca } from "../../api/dostavljacApi";

const KreirajDostavljaca = () => {
  const [dostavljac, setDostavljac] = useState({
    ime: "",
    brojTelefona: "",
  });
  const [dostavljacUspesno, setDostavljacUspesno] = useState(false);

  const navigation = useNavigation();

  const obradiKreiranjeDostavljaca = async () => {
    try {
      const odgovor = await kreirajDostavljaca(dostavljac);
      setDostavljacUspesno(true);
      setDostavljac({
        ime: "",
        brojTelefona: "",
      });
    } catch (error) {
      console.error(
        "Došlo je do greške prilikom kreiranja dostavljaca:",
        error
      );
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-4">
          <FormField
            title="Ime"
            value={dostavljac.ime}
            handleChangeText={(e) => setDostavljac({ ...dostavljac, ime: e })}
          />
          <FormField
            title="Broj telefona"
            value={dostavljac.brojTelefona}
            handleChangeText={(e) =>
              setDostavljac({ ...dostavljac, brojTelefona: e })
            }
            keyboardType="numeric"
          />

          <CustomButton
            title="Kreiraj dostavljaca"
            handlePress={obradiKreiranjeDostavljaca}
            containerStyles="w-full h-[48px] rounded-full mt-8"
          />
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={dostavljacUspesno}
          onRequestClose={() => setDostavljacUspesno(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-4 bg-white rounded-lg items-center">
              <Text className="text-lg font-bold mb-4">
                Dostavljac je uspešno kreiran!
              </Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setDostavljacUspesno(false);
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

export default KreirajDostavljaca;
