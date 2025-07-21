import { useNavigation } from "expo-router";
import React from "react";
import { View } from "react-native";
import CustomButton from "./../components/CustomButton";

const AdminPanel = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center">
      <CustomButton
        title="Kreiraj restoran"
        handlePress={() => navigation.navigate("KreirajRestoran")}
        containerStyles="bg-transparent border-b border-gray-300 rounded-none items-start"
        textStyles="text-left text-primary text-xl"
      />
      <CustomButton
        title="Kreiraj dostavljača"
        handlePress={() => navigation.navigate("KreirajDostavljaca")}
        containerStyles="mt-5 bg-transparent border-b border-gray-300 rounded-none items-start"
        textStyles="text-left text-primary text-xl"
      />
      <CustomButton
        title="Prikazi sve restorane"
        handlePress={() => navigation.navigate("ListaRestorana")}
        containerStyles="mt-5 bg-transparent border-b border-gray-300 rounded-none items-start"
        textStyles="text-left text-primary text-xl"
      />
      <CustomButton
        title="Prikazi sve dostavljače"
        handlePress={() => navigation.navigate("ListaDostavljaca")}
        containerStyles="mt-5 bg-transparent border-b border-gray-300 rounded-none items-start"
        textStyles="text-left text-primary text-xl"
      />
    </View>
  );
};

export default AdminPanel;
