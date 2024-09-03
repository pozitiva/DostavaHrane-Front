import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton"; // Assuming you have a custom button component

import { images } from "../../constants";
export default function Welcome({ navigation }) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-5">
      <View className="mb-8">
        <Image source={images.cooking} className="w-80 h-80" />
      </View>
      <Text className="text-3xl font-bold text-gray-800 mb-2">Miss D</Text>
      <Text className="text-base text-gray-600 text-center mb-8">
        Vaš sledeći ukusan obrok je samo nekoliko klikova daleko. Prepustite se
        uživanju i otkrijte omiljena jela jednostavno i brzo!
      </Text>
      <CustomButton
        title="Započni"
        handlePress={() => navigation.navigate("MusterijaLogin")}
        containerStyles="w-full mt-7"
        textStyles="text-xl font-semibold text-black"
      />
    </SafeAreaView>
  );
}
