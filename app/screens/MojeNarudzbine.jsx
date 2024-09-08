import { View, Text } from "react-native";
import React from "react";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";

const MojeNarudzbine = () => {
  const { korisnik } = useKorisnikSkladiste.getState();

  return (
    <View>
      {korisnik.narudzbine.map((n) => (
        <>
          <Text>{n.id}</Text>
          <Text>{n.ukupnaCena}</Text>
        </>
      ))}
    </View>
  );
};

export default MojeNarudzbine;
