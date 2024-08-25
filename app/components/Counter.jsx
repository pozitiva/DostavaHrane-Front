import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Counter = ({ quantity, setQuantity }) => {
  //console.log("Counter Props:", { quantity, setQuantity }); // Check if props are received

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View className="flex-row items-center justify-center mt-4">
      <TouchableOpacity
        onPress={decrement}
        className="bg-gray-200 rounded-full p-2"
      >
        <Text className="text-xl">-</Text>
      </TouchableOpacity>
      <Text className="mx-4 text-lg">
        {quantity.toString().padStart(1, "0")}
      </Text>
      <TouchableOpacity
        onPress={increment}
        className="bg-gray-200 rounded-full p-2"
      >
        <Text className="text-xl">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
