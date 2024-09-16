import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import useJeloSkladiste from "../../store/JeloSkladiste";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import { API_BASE_URL, tipoviJela } from "../../utils/zajednickiPodaci";
import CustomButton from "./CustomButton";
import FormField from "./FormField";

const UpravljanjeJelomModal = ({ jelo, onClose }) => {
  const { korisnik } = useKorisnikSkladiste.getState();
  const modalizeRef = useRef(null);
  const [izmenjenoJelo, setIzmenjenoJelo] = useState(jelo);
  const [izabranTipJela, setIzabranTipJela] = useState(jelo.tipJela);

  const { izmeniJelo, obrisiJelo, ucitajJela } = useJeloSkladiste((state) => ({
    izmeniJelo: state.izmeniJelo,
    obrisiJelo: state.obrisiJelo,
    ucitajJela: state.ucitajJela,
  }));

  useEffect(() => {
    setIzmenjenoJelo(jelo);
    setIzabranTipJela(jelo.tipJela);

    modalizeRef.current?.open();
  }, [jelo]);

  const obradiIzmenuJela = async () => {
    try {
      const jeloData = {
        id: jelo.id,
        naziv: izmenjenoJelo.naziv,
        cena: izmenjenoJelo.cena,
        tipJela: izabranTipJela,
        restoranId: korisnik.id,
        slikaUrl: jelo.slikaUrl,
        opis: jelo.opis,
      };

      await izmeniJelo(jeloData);

      ucitajJela();
      onClose();
    } catch (error) {
      console.error("Greska prilikom izmene jela:", error);
    }
  };

  const obradiBrisanjeJela = async () => {
    try {
      await obrisiJelo(jelo.id);
      ucitajJela();
      onClose();
    } catch (error) {
      console.error("Greska prilikom izmene jela:", error);
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={300}
      modalHeight={870}
      onClose={() => onClose()}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="items-center mb-6">
          <Image
            source={{
              uri: `${API_BASE_URL}${izmenjenoJelo.slikaUrl}`,
            }}
            className="w-full h-48 rounded-lg"
          />
        </View>

        <View className="flex-1 bg-white p-4 items-center mb-6">
          <FormField
            title="Naziv"
            value={izmenjenoJelo.naziv}
            placeholder="Unesite naziv jela"
            handleChangeText={(text) =>
              setIzmenjenoJelo({ ...izmenjenoJelo, naziv: text })
            }
            otherStyles="w-full max-w-[335px]"
          />

          <FormField
            title="Cena"
            value={isNaN(izmenjenoJelo.cena) ? "" : String(izmenjenoJelo.cena)}
            placeholder="Unesite cenu jela"
            handleChangeText={(text) => {
              const novaCena = text.trim() === "" ? "" : parseFloat(text);
              setIzmenjenoJelo({
                ...izmenjenoJelo,
                cena: isNaN(novaCena) ? "" : novaCena,
              });
            }}
            keyboardType="numeric"
            otherStyles="w-full max-w-[335px]"
          />
          {/* <FormField
            title="Opis"
            value={izmenjenoJelo.opis}
            placeholder="Unesite opis jela"
            handleChangeText={(text) =>
              setIzmenjenoJelo({ ...izmenjenoJelo, opis: text })
            }
            otherStyles="w-full max-w-[335px]"
          /> */}

          <View className="w-full max-w-[335px]">
            <Text className="text-xs text-gray-500 mb-1">Tip jela</Text>
            <View className="border border-gray-300 rounded-md">
              <Picker
                selectedValue={izabranTipJela}
                onValueChange={(itemValue) => {
                  setIzabranTipJela(itemValue);
                  setIzmenjenoJelo({ ...izmenjenoJelo, tipJela: itemValue });
                }}
                className="text-base py-2 px-2 border-gray-300 rounded-md text-black"
              >
                {tipoviJela.map((tipJela, index) => (
                  <Picker.Item key={index} label={tipJela} value={tipJela} />
                ))}
              </Picker>
            </View>
          </View>
        </View>

        <View className="flex-row justify-center">
          <CustomButton
            title="Izmeni jelo"
            containerStyles="w-[160px] h-[48px] rounded-full mr-8"
            handlePress={obradiIzmenuJela}
          />

          <CustomButton
            title="Obriši jelo"
            containerStyles="w-[160px] h-[48px] rounded-full ml-4"
            handlePress={obradiBrisanjeJela}
          />
        </View>
      </ScrollView>
    </Modalize>
  );
};

export default UpravljanjeJelomModal;
