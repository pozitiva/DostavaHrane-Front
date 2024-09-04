import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import useNarudzbinaSkladiste from "../../store/NarudzbinaSkladiste";
import CustomButton from "./CustomButton";
import { useNavigation } from "expo-router";

const NarudzbinaModal = ({ narudzbina, onClose }) => {
  const { izmeniNarudzbinu, ucitajNarudzbine } = useNarudzbinaSkladiste(
    (state) => ({
      izmeniNarudzbinu: state.izmeniNarudzbinu,
      ucitajNarudzbine: state.ucitajNarudzbine,
    })
  );
  const modalizeRef = useRef(null);
  const [uspesnoIzmenjeno, setUspesnoIzmenjeno] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    modalizeRef.current?.open();
  }, [narudzbina]);

  const obradiPromenuStatusa = async () => {
    try {
      console.log("uslo u promenu statusa");
      await izmeniNarudzbinu(narudzbina);
      setUspesnoIzmenjeno(true);
      ucitajNarudzbine();
    } catch (error) {
      console.error("Greska prilikom izmene statusa narudzbine:", error);
    }
  };
  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={600}
      modalHeight={600}
      onClose={() => onClose()}
    >
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg font-bold mb-2">
          Detalji narudžbine #{narudzbina.id}
        </Text>
        <Text className="text-base mb-1">
          Datum: {new Date(narudzbina.datumNarudzbine).toLocaleDateString()}
        </Text>
        <Text className="text-base mb-1">Status: {narudzbina.status}</Text>
        <Text className="text-base mb-1">
          Ukupna cena: {narudzbina.ukupnaCena} RSD
        </Text>
        <Text className="text-base mb-1">
          Dostavljač : {narudzbina.dostavljacIme || "N/A"}
        </Text>
        <Text className="text-base mb-1">Adresa: {narudzbina.adresa}</Text>
        <Text className="text-base mb-1">
          Musterija: {narudzbina.musterijaIme}
        </Text>
        <Text className="text-base font-bold mt-4 mb-2">
          Stavke narudžbine:
        </Text>
        {narudzbina.stavkeNarudzbine.map((stavka, index) => (
          <View key={index} className="bg-secondary-100 p-3 rounded-lg mb-2">
            <Text className="text-base font-semibold" background>
              {stavka.jeloIme}
            </Text>
            <Text className="text-sm">Količina: {stavka.kolicina}</Text>
          </View>
        ))}
      </View>

      <View className="flex items-center">
        <CustomButton
          title="Promeni status"
          containerStyles="w-[335px] h-[48px] rounded-full mt-4"
          handlePress={obradiPromenuStatusa}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={uspesnoIzmenjeno}
        onRequestClose={() => setUspesnoIzmenjeno(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[300px] p-4 bg-white rounded-lg items-center">
            <Text className="text-lg font-bold mb-4">
              Status je uspesno izmenjen!
            </Text>
            <CustomButton
              title="Zatvori"
              handlePress={() => {
                setUspesnoIzmenjeno(false);
                navigation.navigate("Narudzbine");
              }}
              containerStyles="w-full h-[48px] rounded-full"
            />
          </View>
        </View>
      </Modal>
    </Modalize>
  );
};
export default NarudzbinaModal;
