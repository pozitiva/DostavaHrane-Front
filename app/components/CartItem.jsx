import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const CartItem = ({ item, removeFromCart }) => {
  return (
    <View className="border-b border-gray-300 pb-4 mb-4">
      <Text className="text-lg font-bold">{item.naziv}</Text>
      <Text>Quantity: {item.quantity}</Text>
      {item.selectedExtras.length > 0 && (
        <Text>Extras: {item.selectedExtras.join(", ")}</Text>
      )}
    </View>
  );
};

export default CartItem;
