import { useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const RestaurantCard = ({ restoran }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Restoran", {
      restoranId: restoran.id,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      className="w-[45%] mb-4 mx-[2.5%]"
    >
      <Image
        // source={{ uri: `http://192.168.0.13:5076${restoran.slikaUrl}` }}
        source={{ uri: `http://192.168.1.54:5076${restoran.slikaUrl}` }}
        className="h-48 w-full rounded-xl"
      />
      <Text className="text-left mt-2 ml-1">{restoran.ime}</Text>
      <Text className="text-left mt-1"> {restoran.opis}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
