import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { API_BASE_URL } from "../../utils/zajednickiPodaci";

const DishCard = ({ jelo, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className="flex-row items-center py-4 border-b border-gray-200"
    >
      <Image
        source={{ uri: `${API_BASE_URL}${jelo.slikaUrl}` }}
        className="h-20 w-20 rounded-lg ml-2"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold text-primary">{jelo.naziv}</Text>
        <Text className="text-primary mt-1"> {jelo.tipJela}</Text>
      </View>
      <Text className="text-base  text-right text-primary absolute right-0 bottom-0 mr-4 mb-2">
        {jelo.cena} RSD
      </Text>
    </TouchableOpacity>
  );
};

export default DishCard;
