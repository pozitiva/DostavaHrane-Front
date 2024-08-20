import { View, Text, Image } from "react-native";
import React from "react";

const DishCard = ({ dish }) => {
  return (
    <View className="flex-row items-center py-4 border-b border-gray-200">
      <Image
        source={dish.sourceSlike}
        className="h-20 w-20 rounded-lg"
        resizeMode="cover"
      />

      <View className="flex-1 ml-4">
        <Text className="text-lg font-bold">{dish.naziv}</Text>
        <Text lassName="text-gray-600 mt-1"> {dish.opis}</Text>
      </View>
      <Text className="text-base font-semibold text-right text-black absolute right-0 bottom-0 mr-4 mb-2">
        {dish.cena}
      </Text>
    </View>
  );
};

export default DishCard;
