import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Modal, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "../../store/CartStore";
import useKorisnikSkladiste from "../../store/KorisnikSkladiste";
import Counter from "../components/Counter";
import CustomButton from "../components/CustomButton";

const CartScreen = () => {
  const { korisnik, dodajNarudzbinu } = useKorisnikSkladiste((state) => ({
    korisnik: state.korisnik,
    dodajNarudzbinu: state.dodajNarudzbinu,
  }));
  const [narudzbinaUspesno, setNarudzbinaUspesno] = useState(false);
  const [ukupnaCena, setUkupnaCena] = useState(0);
  const [izabranaAdresa, setIzabranaAdresa] = useState(korisnik.adrese[0]);
  const navigation = useNavigation();

  const { cart, removeFromCart, clearCart, addToCart } = useCartStore(
    (state) => ({
      cart: state.cart,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
      addToCart: state.addToCart,
    })
  );

  const izracunajUkupnuCenu = () => {
    const ukupno = cart.reduce(
      (sum, item) => sum + item.cena * item.kolicina,
      0
    );
    setUkupnaCena(ukupno);
  };

  useEffect(() => {
    izracunajUkupnuCenu();
  }, [cart]);

  const obradiNarucivanje = async () => {
    const prviElement = cart[0];
    const restoranId = prviElement.restoranId;

    const narudzbina = {
      restoranId: restoranId,
      adresaId: izabranaAdresa.id,
      stavkeNarudzbine: cart.map((item) => ({
        jeloId: item.id,
        cena: item.cena,
        kolicina: item.kolicina,
      })),
    };

    try {
      const odgovor = await dodajNarudzbinu(narudzbina);
      setNarudzbinaUspesno(true);
      console.log("Narudžbina je uspešno napravljena:", odgovor);
      clearCart();
    } catch (error) {
      console.error("Došlo je do greške prilikom naručivanja:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <FlatList
        data={cart}
        keyExtractor={(item) => item.uniqueId.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.naziv}</Text>
              <Text>Kolicina: {item.kolicina}</Text>
              <Text>Cena: {item.cena}</Text>
            </View>
            <Counter
              kolicina={item.kolicina}
              setKolicina={(novaKolicina) => {
                if (novaKolicina > 0) {
                  addToCart({ ...item, kolicina: novaKolicina });
                } else {
                  removeFromCart(item.uniqueId);
                }
              }}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Picker
              selectedValue={izabranaAdresa}
              onValueChange={(itemValue) => setIzabranaAdresa(itemValue)}
              className="text-base py-3 px-2 border border-gray-300 rounded-lg text-black"
            >
              {korisnik.adrese.map((adresa) => (
                <Picker.Item
                  key={adresa.id}
                  label={`${adresa.naziv} (${adresa.ulica}, ${adresa.grad})`}
                  value={adresa}
                />
              ))}
            </Picker>
            <Text className="text-lg font-bold mt-4">
              Ukupna cena: {ukupnaCena} RSD
            </Text>
            <CustomButton
              title="Isprazni korpu"
              handlePress={clearCart}
              containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            />
            <CustomButton
              title="Poruči"
              handlePress={obradiNarucivanje}
              containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            />
          </View>
        )}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={narudzbinaUspesno}
        onRequestClose={() => setNarudzbinaUspesno(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[300px] p-4 bg-white rounded-lg items-center">
            <Text className="text-lg font-bold mb-4">
              {/* Narudžbina je uspešno napravljena! */}
              Došlo je do greške pri kreiranju narudzbine!
            </Text>
            <CustomButton
              title="Zatvori"
              handlePress={() => {
                setNarudzbinaUspesno(false);
                navigation.navigate("Pocetna");
              }}
              containerStyles="w-full h-[48px] rounded-full"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;
