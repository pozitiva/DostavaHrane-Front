import React, { useEffect, useState } from "react";
import { Button, Image, Modal, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { Picker } from "@react-native-picker/picker";
import useJeloSkladiste from "../../store/JeloSkladiste";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import { tipoviJela } from "../../utils/zajednickiPodaci";

const KreirajJelo = () => {
  const { dodajJelo, ucitajJela } = useJeloSkladiste((state) => ({
    dodajJelo: state.dodajJelo,
    ucitajJela: state.ucitajJela,
  }));
  const [jelo, setJelo] = useState({
    naziv: "",
    cena: "",
    tipJela: "",
    slikaUrl: "",
  });
  const [jeloUspesno, setJeloUspesno] = useState(false);

  const navigation = useNavigation();

  const obradiBiranjeSlike = async () => {
    console.log("OVO JE BIRANJE SLIKEEEEEEEEE");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("IZABRANA SLIDZAAAAAAAAAAA");
      setJelo({ ...jelo, slikaUrl: result.assets[0].uri });
    }
  };

  const obradiKreiranjeJela = async () => {
    try {
      const formData = new FormData();
      formData.append("slika", {
        uri: jelo.slikaUrl,
        type: "image/jpeg",
        name: "photo.jpg",
      });

      formData.append("naziv", jelo.naziv);
      formData.append("cena", jelo.cena);
      formData.append("tipJela", jelo.tipJela);
      console.log("SAD CU DA UDJEM U DODAVANJE");
      await dodajJelo(formData);
      await ucitajJela();

      setJeloUspesno(true);
      setJelo({
        naziv: "",
        cena: "",
        tipJela: "",
        slikaUrl: "",
      });
    } catch (error) {
      console.error("Došlo je do greške prilikom kreiranja jela:", error);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="ml-3">
          <Text className="text-xl font-bold ">KREIRAJ NOVO JELO</Text>

          <View className="p-4">
            <Text className="text-xl font-bold mb-5 "> </Text>
            <FormField
              title="Naziv"
              value={jelo.naziv}
              handleChangeText={(e) => setJelo({ ...jelo, naziv: e })}
              otherStyles="w-[93%]"
            />
            <FormField
              title="Cena"
              value={jelo.cena}
              handleChangeText={(e) => setJelo({ ...jelo, cena: e })}
              otherStyles="w-[93%]"
              keyboardType="numeric"
            />

            <Picker
              selectedValue={jelo.tipJela || ""}
              onValueChange={(itemValue) => {
                setJelo({ ...jelo, tipJela: itemValue });
              }}
              className="text-base py-3 px-2 border border-gray-300 rounded-lg text-black"
            >
              {tipoviJela.map((tipJela, index) => (
                <Picker.Item key={index} label={tipJela} value={tipJela} />
              ))}
            </Picker>

            <CustomButton
              title="Izaberite sliku"
              handlePress={obradiBiranjeSlike}
              containerStyles="w-full h-[48px] rounded-full mt-10 mb-10"
            />
            {jelo.slikaUrl && (
              <Image
                // source={{ uri: `http://192.168.0.13:5076${jelo.slikaUrl}` }}
                source={{ uri: `http://192.168.1.54:5076${jelo.slikaUrl}` }}
                style={{ width: 200, height: 200 }}
              />
            )}

            <CustomButton
              title="Kreiraj jelo"
              handlePress={obradiKreiranjeJela}
              containerStyles="w-full h-[48px] rounded-full"
            />
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={jeloUspesno}
          onRequestClose={() => setJeloUspesno(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-[300px] p-4 bg-white rounded-lg items-center">
              <Text className="text-lg font-bold mb-4">
                Jelo je uspešno kreirano!
              </Text>
              <CustomButton
                title="Zatvori"
                handlePress={() => {
                  setJeloUspesno(false);
                  navigation.navigate("JelaRestorana");
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

export default KreirajJelo;
