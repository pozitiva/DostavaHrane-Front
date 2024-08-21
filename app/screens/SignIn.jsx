import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import { images } from "../../constants";
import { useNavigation } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView>
        <Text className="text-lg text-gray-800 mb-4">Sign In</Text>
        <Text className="text-3xl font-bold text-gray-900">Welcome</Text>
        <Text className="text-sm text-gray-600 mt-2 mb-6">
          Enter your Phone number or Email address for sign in. Enjoy your food
        </Text>

        <FormField
          title="EMAIL"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          //otherStyles="mt-7"
          keyboardType="email-address"
          placeholder="Your email address"
        />

        <FormField
          title="PASSWORD"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          //otherStyles="mt-7"
          placeholder="Your password"
        />

        <CustomButton
          title="Login"
          handlePress={() => {
            navigation.navigate("Pocetna");
          }}
          containerStyles="#22A45D rounded-lg p-4 mb-4"
          //isLoading={isSubmitting}
        />

        <View className="flex-row justify-center mb-4">
          <Text className="text-xs text-gray-600">Don't have an account? </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Registruj")}>
            <Text className="text-xs text-orange-500">Create new account.</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-xs text-center text-gray-600 mb-4">Or</Text>

        <TouchableOpacity className="bg-blue-700 rounded-lg p-4 flex-row items-center justify-center mb-4">
          <Image source={images.facebook} className="w-5 h-5 mr-3" />
          <Text className="text-white font-bold">CONNECT WITH FACEBOOK</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-red-600 rounded-lg p-4 flex-row items-center justify-center">
          <Image source={images.google} className="w-5 h-5 mr-3" />
          <Text className="text-white font-bold">CONNECT WITH GOOGLE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
