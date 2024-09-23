import React from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import CustomButton from "../components/CustomButton";

import { useNavigation } from "expo-router";

const Profile = () => {
  const { korisnik } = useKorisnikSkladiste((state) => ({
    korisnik: state.korisnik,
  }));

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="p-5">
          <View className="flex-row items-center mb-5">
            <Image
              source={icons.profilePic}
              style={{
                width: 70,
                height: 70,
                borderRadius: 40,
              }}
            />
            <View className="ml-6 justify-cente">
              <Text className="text-xl font-bold mb-1 text-secondary">
                {korisnik.ime}
              </Text>
              <Text className="text-m ">{korisnik.brojTelefona}</Text>
            </View>
          </View>
          <CustomButton
            title="Moje narudzbine"
            handlePress={() => navigation.navigate("MojeNarudzbine")}
            containerStyles="mt-5 bg-transparent border-b border-gray-300 rounded-none items-start"
            textStyles="text-left text-primary text-xl"
          />
          <CustomButton
            title="Izmeni profil "
            handlePress={() => navigation.navigate("NalogEkran")}
            containerStyles="mt-5 bg-transparent border-b border-gray-300 rounded-none items-start"
            textStyles="text-left text-primary text-xl"
          />
          <CustomButton
            title="Moje adrese"
            handlePress={() => navigation.navigate("AdreseEkran")}
            containerStyles="mt-5 bg-transparent border-b border-gray-300 rounded-none items-start"
            textStyles="text-left text-primary text-xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
