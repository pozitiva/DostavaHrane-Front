import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Counter = ({
  kolicina,
  setKolicina,
  item = {},

  removeFromCart = () => {},
}) => {
  const increment = () => {
    const newKolicina = kolicina + 1;
    setKolicina(newKolicina);
  };

  const decrement = () => {
    if (kolicina > 1) {
      const newKolicina = kolicina - 1;
      setKolicina(newKolicina);
    } else if (kolicina === 1) {
      removeFromCart(item.uniqueId);
    }
  };

  return (
    <View className="flex-row items-center justify-center mt-4">
      <TouchableOpacity
        onPress={decrement}
        className="bg-gray-200 rounded-full p-2"
      >
        <Text className="text-xl text-primary">-</Text>
      </TouchableOpacity>
      <Text className="mx-4 text-lg text-primary">{kolicina}</Text>
      <TouchableOpacity
        onPress={increment}
        className="bg-gray-200 rounded-full p-2"
      >
        <Text className="text-xl text-primary">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;
