import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Counter from "../components/Counter";
import CustomButton from "./../components/CustomButton";

const DishScreen = ({ route }) => {
  const { dish } = route.params;
  const [selectedExtras, setSelectedExtras] = useState([]);

  const toggleExtra = (extra) => {
    if (selectedExtras.includes(extra)) {
      setSelectedExtras(selectedExtras.filter((item) => item !== extra));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="items-center mb-6">
          <Image source={dish.sourceSlike} className="w-full h-48 rounded-lg" />
          <Text className="text-2xl font-bold mt-4">{dish.naziv}</Text>
        </View>

        <View className="px-4">
          <Text className="text-lg font-bold mb-2">Dodaci</Text>
          {dish.dodaci?.map((extra, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleExtra(extra)}
              className="flex-row items-center mb-4"
            >
              <View
                className={`h-6 w-6 mr-2 border-2 border-gray-400 rounded ${
                  selectedExtras.includes(extra) ? "bg-black" : "bg-white"
                }`}
              />
              <Text className="text-lg">{extra}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Counter />

        <View className="flex items-center">
          <CustomButton
            title="Dodaj u porudžbinu"
            containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            handlePress={() => {
              /* Handle your button press here */
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DishScreen;
