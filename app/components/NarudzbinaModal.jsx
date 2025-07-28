import { useEffect, useRef, useState } from "react";
import { Modal, Text, TouchableOpacity, View, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { useNavigation } from "expo-router";
import { statusi } from "../../utils/zajednickiPodaci";
import CustomButton from "./Dugme";

const NarudzbinaModal = ({ narudzbina, onClose, promeniStatusNarudzbine }) => {
  const modalizeRef = useRef(null);
  const [uspesnoIzmenjeno, setUspesnoIzmenjeno] = useState(false);
  const [izabraniStatus, setIzabraniStatus] = useState(narudzbina.status);

  useEffect(() => {
    modalizeRef.current?.open();
  }, [narudzbina]);

  const obradiPromenuStatusa = async () => {
    try {
      const result = await promeniStatusNarudzbine(narudzbina, izabraniStatus);
      if (result === "online") {
        setUspesnoIzmenjeno(true);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Greska prilikom izmene statusa narudzbine.");
      alert(error.message || "Došlo je do greške.");
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={600}
      modalHeight={600}
      onClose={onClose}
    >
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg font-bold mb-2 text-primary">
          Detalji narudžbine #{narudzbina.id}
        </Text>
        <Text className="text-base mb-1 text-primary">
          Datum: {new Date(narudzbina.datumNarudzbine).toLocaleDateString()}
        </Text>
        <Text className="text-base mb-1 text-primary">
          Status: {narudzbina.status}
        </Text>
        <Text className="text-base mb-1 text-primary">
          Ukupna cena: {narudzbina.ukupnaCena} RSD
        </Text>
        <Text className="text-base mb-1 text-primary">
          Dostavljač : {narudzbina.dostavljacIme || "N/A"}
        </Text>
        <Text className="text-base mb-1 text-primary">
          Adresa: {narudzbina.adresa}
        </Text>
        <Text className="text-base mb-1 text-primary">
          Musterija: {narudzbina.musterijaIme}
        </Text>
        <Text className="text-base font-bold mt-4 mb-2 text-primary">
          Stavke narudžbine:
        </Text>
        {narudzbina.stavkeNarudzbine.map((stavka, index) => (
          <View key={index} className="bg-secondary-100 p-3 rounded-lg mb-2">
            <Text className="text-base font-semibold text-primary" background>
              {stavka.jeloIme}
            </Text>
            <Text className="text-sm text-primary">
              Količina: {stavka.kolicina}
            </Text>
          </View>
        ))}
        <Text className="text-base font-bold mt-4 text-primary">
          Izaberi novi status:
        </Text>
        <FlatList
          data={statusi}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`p-4 mr-4 rounded-lg ${
                izabraniStatus === item.naziv ? "bg-secondary" : "bg-gray-200"
              }`}
              onPress={() => setIzabraniStatus(item.naziv)}
            >
              <Text
                className={`text-center font-bold ${
                  izabraniStatus === item.naziv ? "text-white" : "text-primary"
                }`}
              >
                {item.naziv}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View className="p-4 bg-white">
        <CustomButton
          title="Potvrdi status"
          containerStyles="w-full"
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
            <Text className="text-lg font-bold mb-4 text-primary">
              Uspešno izmenjen status!
            </Text>
            <CustomButton
              title="Zatvori"
              handlePress={() => {
                setUspesnoIzmenjeno(false);
                onClose();
              }}
              containerStyles="w-full"
            />
          </View>
        </View>
      </Modal>
    </Modalize>
  );
};
export default NarudzbinaModal;
