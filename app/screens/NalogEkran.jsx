import { useNavigation } from "expo-router";
import React, { useState } from "react";
import { Modal, Text, View } from "react-native";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";

const NalogEkran = () => {
  const { korisnik, izmeniKorisnika, setKorisnik } = useKorisnikSkladiste(
    (state) => ({
      korisnik: state.korisnik,
      izmeniKorisnika: state.izmeniKorisnika,
      setKorisnik: state.setKorisnik,
    })
  );
  const [izmenjenKorisnik, setIzmenjenKorisnik] = useState(korisnik);
  const navigation = useNavigation();
  const [izmenjenUspesno, setIzmenjenUspesno] = useState(false);

  const obradiIzmenuKorisnika = async () => {
    try {
      const korisnikData = {
        id: korisnik.id,
        ime: izmenjenKorisnik.ime,
        brojTelefona: izmenjenKorisnik.brojTelefona,
      };

      await izmeniKorisnika(korisnikData);
      setIzmenjenUspesno(true);
    } catch (error) {
      console.error("Greska prilikom izmene korsinika:", error);
      setIzmenjenUspesno(false);
    }
  };
  return (
    <View className="flex-1 bg-white p-4 items-center">
      <FormField
        title="Ime i prezime"
        value={izmenjenKorisnik.ime}
        placeholder="Unesite ime i prezime"
        handleChangeText={(text) =>
          setIzmenjenKorisnik({ ...izmenjenKorisnik, ime: text })
        }
        otherStyles="w-full max-w-[335px] mt-5"
      />
      <FormField
        title="Broj telefona"
        value={izmenjenKorisnik.brojTelefona}
        placeholder="Unesite broj telefona"
        handleChangeText={(text) =>
          setIzmenjenKorisnik({ ...izmenjenKorisnik, brojTelefona: text })
        }
        otherStyles="w-full max-w-[335px]"
      />

      <CustomButton
        title="Izmeni korisnika"
        containerStyles="w-[160px] h-[48px] rounded mt-10 "
        handlePress={obradiIzmenuKorisnika}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={izmenjenUspesno}
        onRequestClose={() => setIzmenjenUspesno(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[300px] p-4 bg-white rounded-lg items-center">
            <Text className="text-lg font-bold mb-4">
              Profil je uspešno izmenjen!
            </Text>
            <CustomButton
              title="Zatvori"
              handlePress={() => {
                setIzmenjenUspesno(false);
                navigation.navigate("Profil");
              }}
              containerStyles="w-full h-[48px] rounded-full"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NalogEkran;
