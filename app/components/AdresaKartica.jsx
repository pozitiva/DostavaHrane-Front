import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AdresaKartica = ({ adresa, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className="flex-row items-center py-4 border-b border-gray-200"
    >
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-primary">{adresa.naziv}</Text>
        <Text className="text-primary mt-1">
          {adresa.ulica} , {adresa.grad}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AdresaKartica;
