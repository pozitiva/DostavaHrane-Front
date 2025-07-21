import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const NarudzbinaCard = ({ narudzbina, onPress }) => {
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <Text className="text-lg font-bold mb-2 text-primary">
        Narudžbina #{narudzbina.id}
      </Text>
      <Text className="text-base mb-1 text-primary">
        Status: {narudzbina.status}
      </Text>
      <Text className="text-base mb-1 text-primary">
        Musterija: {narudzbina.musterijaIme}
      </Text>

      <TouchableOpacity
        onPress={() => onPress()}
        className="mt-4 bg-secondary p-2 rounded"
      >
        <Text className="text-white text-center">Pogledaj detalje</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NarudzbinaCard;
