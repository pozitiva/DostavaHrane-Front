import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import useJeloSkladiste from "../../store/JeloSkladiste";
import DishCard from "../components/DishCard";
import UpravljanjeJelomModal from "../components/UpravljanjeJelomModal";

const JelaRestoranaEkran = () => {
  //const [jela, setJela] = useState([]);
  const [jelo, setJelo] = useState("");

  const { jela, ucitajJela } = useJeloSkladiste((state) => ({
    jela: state.jela,
    ucitajJela: state.ucitajJela,
  }));

  useEffect(() => {
    const obradiJela = async () => {
      try {
        console.log(jelo);
        await ucitajJela();
        // const odgovor = await vratiSvaJela();
        //setJela(odgovor);
      } catch (error) {
        console.error("Error fetching narudzbine:", error);
      }
    };

    obradiJela();
  }, []);

  return (
    <SafeAreaView>
      <View>
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
