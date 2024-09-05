import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
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

  const obradiPretragu = async () => {
    try {
      const odgovor = await pretragaRestorana(
        nazivZaPretragu.trim() || "",
        tipZaPretragu || ""
      );
      setRestorani(odgovor);
    } catch (error) {
      console.error("Greska prilikom pretrage restorana", error);
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
          <Picker.Item label={"N/A"} value={""} />
          {tipoviJela.map((tipJela, index) => (
            <Picker.Item key={index} label={tipJela} value={tipJela} />
          ))}
        </Picker>
        {tipZaPretragu && (
          <TouchableOpacity
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onPress={() => setTipZaPretragu("")}
          >
            <Ionicons name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
        <CustomButton
          title="Pretrazi"
          handlePress={obradiPretragu}
        ></CustomButton>
      </View>
      <Text className="text-lg font-bold mt-4 mb-2 px-4">Restorani</Text>
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
