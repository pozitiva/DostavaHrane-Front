import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import useAdresaSkladiste from "../../store/AdresaSkladiste";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import CustomButton from "./CustomButton";
import FormField from "./FormField";

const AdresaModal = ({ adresa, onClose }) => {
  const modalizeRef = useRef(null);
  const [izmenjenaAdresa, setIzmenjenaAdresa] = useState(adresa);

  const { izmeniAdresu } = useAdresaSkladiste((state) => ({
    izmeniAdresu: state.izmeniAdresu,
  }));

  useEffect(() => {
    setIzmenjenaAdresa(adresa);

    modalizeRef.current?.open();
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
      snapPoint={400}
      modalHeight={635}
      onClose={() => onClose()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 bg-white p-4 items-center mb-6">
            <View className="flex-1 bg-white p-4 items-center mb-6">
              <FormField
                title="Naziv"
                value={izmenjenaAdresa.naziv}
                placeholder="Unesite naziv adrese"
                handleChangeText={(text) =>
                  setIzmenjenaAdresa({ ...izmenjenaAdresa, naziv: text })
                }
                otherStyles="w-full max-w-[335px] h-[70px]"
              />
              <FormField
                title="Ulica"
                value={izmenjenaAdresa.ulica}
                placeholder="Unesite ulicu i broj"
                handleChangeText={(text) =>
                  setIzmenjenaAdresa({ ...izmenjenaAdresa, ulica: text })
                }
                otherStyles="w-full max-w-[335px] h-[70px]"
              />

              <FormField
                title="Grad"
                value={izmenjenaAdresa.grad}
                placeholder="Unesite grad"
                handleChangeText={(text) =>
                  setIzmenjenaAdresa({ ...izmenjenaAdresa, grad: text })
                }
                otherStyles="w-full max-w-[335px] h-[70px]"
              />
            </View>
          </View>

          <View className="flex-row justify-center mb-10">
            <CustomButton
              title="Izmeni adresu"
              containerStyles="w-[160px] h-[48px] rounded-full mr-8"
              handlePress={obradiIzmenuAdrese}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modalize>
  );
};

export default AdresaModal;
