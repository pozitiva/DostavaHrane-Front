import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { icons } from "../../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-xs text-primary mb-1">{title}</Text>

      <View
        className="border border-gray-300 rounded-lg p-3 mb-4 flex-row items-center"
        style={{ pointerEvents: "auto" }}
      >
        <TextInput
          className="flex-1 text-primary text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "SIFRA" || title === "POTVRDJENA SIFRA") && !showPassword
          }
          style={{ height: 35, width: 200, zIndex: 1 }}
          {...props}
        />

        {(title === "SIFRA" || title === "POTVRDJENA SIFRA") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 ml-2"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
