import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, Modal, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useJeloSkladiste from "../../store/JeloSkladiste";
import { tipoviJela } from "../../utils/zajednickiPodaci";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const KreirajJelo = () => {
  const { dodajJelo, ucitajJela } = useJeloSkladiste((state) => ({
    dodajJelo: state.dodajJelo,
    ucitajJela: state.ucitajJela,
  }));
  const [jelo, setJelo] = useState({
    naziv: "",
    cena: "",
    opis: "",
    tipJela: "",
    slikaUrl: "",
  });
  const [jeloUspesno, setJeloUspesno] = useState(false);

  const navigation = useNavigation();

  const obradiBiranjeSlike = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
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
      formData.append("opis", jelo.opis);

      await dodajJelo(formData);
      await ucitajJela();

      setJeloUspesno(true);
      setJelo({
        naziv: "",
        cena: "",
        opis: "",
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
        <View className=" ml-3 p-4">
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
          <FormField
            title="Opis"
            value={jelo.opis}
            handleChangeText={(e) => setJelo({ ...jelo, opis: e })}
            otherStyles="w-[93%]"
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
              source={{ uri: `${jelo.slikaUrl}` }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <CustomButton
            title="Kreiraj jelo"
            handlePress={obradiKreiranjeJela}
            containerStyles="w-full h-[48px] rounded-full"
          />
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
                Jelo je uspesno kreirano!
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
