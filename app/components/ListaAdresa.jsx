import React from "react";
import { Text, View } from "react-native";

const ListaAdresa = ({ addresses }) => {
  if (!addresses || addresses.length === 0) {
    return <Text className="text-gray-500">No addresses available.</Text>;
  }

  return (
    <View className="p-4">
      {addresses.map((address, index) => (
        <View key={index} className="mb-2 p-3 bg-gray-100 rounded-lg">
          <Text className="text-base">
            {address.naziv} : {address.ulica} , {address.grad}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ListaAdresa;
