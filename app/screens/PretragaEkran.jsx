import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { pretragaRestorana } from "../../api/restoranApi";
import { tipoviJela } from "../../utils/zajednickiPodaci";
import CustomButton from "../components/CustomButton";
import RestaurantCard from "../components/RestaurantCard";

const Search = () => {
  const [restorani, setRestorani] = useState([]);
  const [nazivZaPretragu, setNazivZaPretragu] = useState("");
  const [tipZaPretragu, setTipZaPretragu] = useState("");
  const [uspesnaPreraga, setUspesnaPreraga] = useState(false);

  const obradiPretragu = async () => {
    try {
      const odgovor = await pretragaRestorana(
        nazivZaPretragu.trim() || "",
        tipZaPretragu || ""
      );
      setRestorani(odgovor);
      setUspesnaPreraga(true);
    } catch (error) {
      console.error("Greska prilikom pretrage restorana", error);
      setUspesnaPreraga(false);
    }
  };

  // Ucitaj sve restorane kada se komponenta montira
  useEffect(() => {
    const ucitajSveRestorane = async () => {
      try {
        const odgovor = await pretragaRestorana("", "");
        setRestorani(odgovor);
        setUspesnaPreraga(true);
      } catch (error) {
        console.error("Greska prilikom ucitavanja svih restorana", error);
        setUspesnaPreraga(false);
      }
    };

    ucitajSveRestorane();
  }, []);

  // Funkcija za brisanje odabranog tipa i prikaz svih restorana
  const obrisiTipIPrikaziSveRestorane = async () => {
    setTipZaPretragu(""); // Resetuj odabran tip
    try {
      const odgovor = await pretragaRestorana("", ""); // Prikazi sve restorane
      setRestorani(odgovor);
      setUspesnaPreraga(true);
    } catch (error) {
      console.error("Greska prilikom ucitavanja svih restorana", error);
      setUspesnaPreraga(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <TextInput
          placeholder="Pretraži restorane"
          className="p-3 bg-gray-200 rounded-md"
          value={nazivZaPretragu}
          onChangeText={(text) => setNazivZaPretragu(text)}
        />
        <Picker
          selectedValue={tipZaPretragu}
          onValueChange={(itemValue) => {
            setTipZaPretragu(itemValue);
          }}
        >
          <Picker.Item
            label={"Svi restorani"}
            value={""}
            color="text-primary"
          />
          {tipoviJela.map((tipJela, index) => (
            <Picker.Item
              key={index}
              label={tipJela}
              value={tipJela}
              color="text-primary"
            />
          ))}
        </Picker>
        {tipZaPretragu && (
          <TouchableOpacity
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onPress={obrisiTipIPrikaziSveRestorane}
          >
            <Ionicons name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
        <CustomButton
          title="Pretrazi"
          handlePress={obradiPretragu}
        ></CustomButton>
      </View>
      <Text className="text-lg font-bold mt-4 mb-2 px-4 text-primary">
        Restorani
      </Text>
      <FlatList
        className="flex-1 mx-4"
        data={restorani}
        renderItem={({ item }) => <RestaurantCard restoran={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ alignItems: "center" }}
      />
    </SafeAreaView>
  );
};

export default Search;
