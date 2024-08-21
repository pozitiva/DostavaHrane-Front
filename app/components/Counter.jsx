import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Counter = () => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
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
      <Text className="mx-4 text-lg">{count.toString().padStart(1, "0")}</Text>
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
