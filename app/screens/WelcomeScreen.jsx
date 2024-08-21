import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton"; // Assuming you have a custom button component

import { images } from "../../constants";
export default function Welcome({ navigation }) {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white p-5">
      <View className="mb-8">
        <Image
          source={images.cooking} // Replace with your logo image URL
          className="w-36 h-36"
        />
      </View>
      <Text className="text-3xl font-bold text-gray-800 mb-2">Welcome</Text>
      <Text className="text-base text-gray-600 text-center mb-8">
        It’s a pleasure to meet you. We are excited that you’re here so let’s
        get started!
      </Text>
      <CustomButton
        title="Uloguj se"
        handlePress={() => navigation.navigate("Uloguj")}
        containerStyles="w-full mt-7"
      />
    </SafeAreaView>
  );
}
