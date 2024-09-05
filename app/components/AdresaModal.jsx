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
      console.log("uslo");
      const adresaData = {
        id: adresa.id,
        naziv: izmenjenaAdresa.naziv,
        ulica: izmenjenaAdresa.ulica,
        grad: izmenjenaAdresa.grad,
      };
      console.log(adresaData);

      const odgovor = await izmeniAdresu(adresa.id, adresaData);

      console.log(odgovor);

      onClose();
    } catch (error) {
      console.error("Greska prilikom izmene adrese:", error);
    }
  };

  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={550}
      modalHeight={635}
      onClose={() => onClose()}
    >
      <ScrollView>
        <View className="flex-1 bg-white p-4 items-center ">
          <View className="flex-1 bg-white p-4 items-center ">
            <FormField
              title="Naziv"
              value={izmenjenaAdresa.naziv}
              placeholder="Unesite naziv adrese"
              handleChangeText={(text) =>
                setIzmenjenaAdresa({ ...izmenjenaAdresa, naziv: text })
              }
              otherStyles="w-full height: 50, width: 270 "
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
        </View>

        <View className="flex-row justify-center ">
          <CustomButton
            title="Izmeni adresu"
            containerStyles="w-[160px] h-[48px] rounded-full "
            handlePress={obradiIzmenuAdrese}
          />
        </View>
      </ScrollView>
    </Modalize>
  );
};

export default AdresaModal;
