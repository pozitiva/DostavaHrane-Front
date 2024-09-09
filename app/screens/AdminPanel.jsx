import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./../components/CustomButton";
import { useNavigation } from "expo-router";

const AdminPanel = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center space-y-4">
      <CustomButton
        title="Kreiraj restoran"
        handlePress={() => navigation.navigate("KreirajRestoran")}
        containerStyles="py-3 px-6 rounded-full"
      />

      <CustomButton
        title="Kreiraj dostavljaca"
        handlePress={() => navigation.navigate("KreirajDostavljaca")}
        containerStyles="py-3 px-6 rounded-full mt-10"
      />
    </View>
  );
};

export default AdminPanel;
