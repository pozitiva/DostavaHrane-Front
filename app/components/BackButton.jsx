import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { icons } from "../../constants";

const BackButton = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = () => {
    const profileRelatedScreens = [
      "MojeNarudzbine",
      "NalogEkran",
      "AdreseEkran",
    ];

    if (profileRelatedScreens.includes(route.name)) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Pocetna");
      }
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Pocetna");
    }
  };

  return (
    <TouchableOpacity onPress={goBack} className="absolute p-2">
      <Image source={icons.leftarrow} className="h-8 w-8" />
    </TouchableOpacity>
  );
};

export default BackButton;
