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
      navigation.navigate("Profil");
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Pocetna");
    }
  };

  return (
    <TouchableOpacity onPress={goBack} style={{ padding: 10 }}>
      <Image source={icons.leftarrow} style={{ height: 32, width: 32 }} />
    </TouchableOpacity>
  );
};

export default BackButton;
