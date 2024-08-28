import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "../../constants";
import { useNavigation } from "expo-router";

const DishCard = ({ jelo, onPress }) => {
  // console.log(jelo);
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className="flex-row items-center py-4 border-b border-gray-200"
    >
      <Image
        source={images.cards}
        className="h-20 w-20 rounded-lg"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">{jelo.naziv}</Text>
        <Text className="text-gray-600 mt-1"> {jelo.tipJela}</Text>
      </View>
      <Text className="text-base  text-right text-black absolute right-0 bottom-0 mr-4 mb-2">
        {jelo.cena}
      </Text>
    </TouchableOpacity>
  );
};

export default DishCard;
