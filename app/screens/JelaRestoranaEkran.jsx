import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
// import { vratiSvaJela } from "../../api/jeloApi";
import DishCard from "../components/DishCard";
import UpravljanjeJelomModal from "../components/UpravljanjeJelomModal";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "expo-router";
import useJeloSkladiste from "../../store/JeloSkladiste";

const JelaRestoranaEkran = () => {
  //const [jela, setJela] = useState([]);
  const [jelo, setJelo] = useState("");

  const navigator = useNavigation();

  const { jela, ucitajJela } = useJeloSkladiste((state) => ({
    jela: state.jela,
    ucitajJela: state.ucitajJela,
  }));

  useEffect(() => {
    const obradiJela = async () => {
      try {
        await ucitajJela();
        // const odgovor = await vratiSvaJela();
        //setJela(odgovor);
      } catch (error) {
        console.error("Error fetching narudzbine:", error);
      }
    };

    obradiJela();
  }, []);

  const obradiIzaberiJelo = (jelo) => {
    setIzabranoJelo(jelo);
  };
  return (
    <SafeAreaView>
      <View>
        <CustomButton
          title="Kreiraj novo jelo"
          handlePress={() => navigator.navigate("KreirajJelo")}
          containerStyles=" rounded-lg  "
        />
        <Text>Jela</Text>
        <FlatList
          data={jela}
          renderItem={({ item }) => (
            <View>
              <DishCard onPress={() => setJelo(item)} jelo={item} />
            </View>
          )}
          key={(item) => item.id}
          keyExtractor={(item) => item.naziv}
        />

        {jelo && (
          <UpravljanjeJelomModal jelo={jelo} onClose={() => setJelo("")} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default JelaRestoranaEkran;
