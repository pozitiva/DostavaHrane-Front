import { useNavigation } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { API_BASE_URL } from "../../utils/zajednickiPodaci";

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
        source={{ uri: `${API_BASE_URL}${restoran.slikaUrl}` }}
        className="h-48 w-full rounded-xl"
      />
      <Text className="text-left mt-2 ml-1 text-primary">{restoran.ime}</Text>
      <Text className="text-left mt-1 text-primary"> {restoran.opis}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
