import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Counter = ({
  kolicina,
  setKolicina,
  item = () => {},
  addToCart = () => {},
  removeFromCart = () => {},
}) => {
  //console.log("Counter Props:", { quantity, setQuantity }); // Check if props are received

  const increment = () => {
    setKolicina(kolicina + 1);
    if (addToCart && item) {
      addToCart({ ...item, kolicina: kolicina + 1 });
    }
  };

  const decrement = () => {
    if (kolicina > 1) {
      setKolicina(kolicina - 1);

      addToCart({ ...item, kolicina: kolicina - 1 });
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
        <Text className="text-xl">-</Text>
      </TouchableOpacity>
      <Text className="mx-4 text-lg">
        {kolicina.toString().padStart(1, "0")}
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
