import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({ title, handlePress, containerStyles, textStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`justify-center items-center bg-secondary p-2 rounded ${containerStyles} `}
    >
      <Text className={`black text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
