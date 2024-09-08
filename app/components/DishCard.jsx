import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const DishCard = ({ jelo, onPress }) => {
  // console.log(jelo);
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className="flex-row items-center py-4 border-b border-gray-200"
    >
      <Image
        source={{ uri: `http://192.168.0.13:5076${jelo.slikaUrl}` }}
        // source={{ uri: `http://192.168.1.54:5076${jelo.slikaUrl}` }}
        className="h-20 w-20 rounded-lg ml-2"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">{jelo.naziv}</Text>
        <Text className="text-gray-600 mt-1"> {jelo.tipJela}</Text>
      </View>
      <Text className="text-base  text-right text-black absolute right-0 bottom-0 mr-4 mb-2">
        {jelo.cena} RSD
      </Text>
    </TouchableOpacity>
  );
};

export default DishCard;
