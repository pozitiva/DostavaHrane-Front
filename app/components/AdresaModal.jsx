import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import CustomButton from "./CustomButton";
import FormField from "./FormField";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";

const AdresaModal = ({ adresa, onClose }) => {
  const modalizeRef = useRef(null);
  const [izmenjenaAdresa, setIzmenjenaAdresa] = useState(adresa);

  const { izmeniAdresu } = useKorisnikSkladiste.getState();

  useEffect(() => {
    if (adresa && adresa.id) {
      setIzmenjenaAdresa(adresa);
      modalizeRef.current?.open();
    }
  }, [adresa]);

  const obradiIzmenuAdrese = async () => {
    try {
      const adresaData = {
        id: adresa.id,
        naziv: izmenjenaAdresa.naziv,
        ulica: izmenjenaAdresa.ulica,
        grad: izmenjenaAdresa.grad,
      };

      await izmeniAdresu(adresa.id, adresaData);

      onClose();
    } catch (error) {
      console.error("Greska prilikom izmene adrese:", error);
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={500}
      modalHeight={550}
      onClose={() => onClose()}
      modalStyle={{ paddingBottom: 0, marginBottom: 0 }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 0 }}>
        <View className="p-2 items-center ">
          <FormField
            title="Naziv"
            value={izmenjenaAdresa.naziv}
            placeholder="Unesite naziv adrese"
            handleChangeText={(text) =>
              setIzmenjenaAdresa({ ...izmenjenaAdresa, naziv: text })
            }
            otherStyles="w-full max-w-[335px] h-[70px] mt-7"
          />
          <FormField
            title="Ulica"
            value={izmenjenaAdresa.ulica}
            placeholder="Unesite ulicu i broj"
            handleChangeText={(text) =>
              setIzmenjenaAdresa({ ...izmenjenaAdresa, ulica: text })
            }
            otherStyles="w-full max-w-[335px] h-[70px] mt-7"
          />

          <FormField
            title="Grad"
            value={izmenjenaAdresa.grad}
            placeholder="Unesite grad"
            handleChangeText={(text) =>
              setIzmenjenaAdresa({ ...izmenjenaAdresa, grad: text })
            }
            otherStyles="w-full max-w-[335px] h-[70px] mt-7"
          />
        </View>

        <View className="flex-row justify-center ">
          <CustomButton
            title="Izmeni adresu"
            containerStyles="w-[160px] h-[48px] rounded-full mt-5"
            handlePress={obradiIzmenuAdrese}
          />
        </View>
      </ScrollView>
    </Modalize>
  );
};

export default AdresaModal;
