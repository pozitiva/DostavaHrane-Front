import { router, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import CustomButton from "../components/CustomButton";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className=" h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <View>
            <Text className="text-3xl text-black font-bold text-center ">
              Food Delivery
            </Text>
            <Image
              source={icons.delivery}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
          </View>

          <Text className="text-3xl text-black font-bold text-center ">
            Dobro dosli
          </Text>
          <Text className="text-sm font-pregular text-black-100 mt-7 text-center">
            neki tekst kako nam je drago sto su tu i bas su lepi nmp
          </Text>
          <CustomButton
            title="Uloguj se"
            // handlePress={() => router.push("/sign-in")}
            //handlePress={() => router.push("/pocetna")}
            handlePress={() => navigation.navigate("Pocetna")}
            containerStyles="w-full mt-7"
          />
          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
