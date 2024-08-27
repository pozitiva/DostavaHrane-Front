import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { icons } from "../../constants";

const BackButton = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={goBack} className="absolute p-2">
      <Image source={icons.leftarrow} className="h-8 w-8" />
    </TouchableOpacity>
  );
};

export default BackButton;
