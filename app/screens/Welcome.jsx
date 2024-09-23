import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton"; // Assuming you have a custom button component

import { icons } from "../../constants";
export default function Welcome({ navigation }) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-5">
      <View className="mb-8">
        <Image source={icons.cooking} className="w-80 h-80" />
      </View>
      <Text className="text-3xl font-bold text-primary mb-2">Bocado</Text>
      <Text className="text-base text-primary text-center mb-8">
        Vaš sledeći ukusan obrok je samo nekoliko klikova daleko. Prepustite se
        uživanju i otkrijte omiljena jela jednostavno i brzo!
      </Text>
      <CustomButton
        title="Započni"
        handlePress={() => navigation.navigate("MusterijaLogin")}
        containerStyles="w-full h-[48px] rounded-full flex items-center justify-center"
        textStyles="text-xl text-white text-center "
      />
    </SafeAreaView>
  );
}
