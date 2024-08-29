import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "../../store/CartStore";
import CustomButton from "../components/CustomButton";
import Counter from "../components/Counter";
import useMusterijaSkladiste from "./../../store/MusterijaSkladiste";
import { napraviNarudzbinu } from "./../../api/narudzbinaApi";
import { Picker } from "@react-native-picker/picker";

const CartScreen = () => {
  const { korisnik } = useMusterijaSkladiste.getState();
  const { cart, removeFromCart, clearCart, addToCart } = useCartStore(
    (state) => ({
      cart: state.cart,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
      addToCart: state.addToCart,
    })
  );
  const [izabranaAdresa, setIzabranaAdresa] = useState(korisnik.adrese[0]);

  const handlePlaceOrder = async () => {
    const firstItem = cart[0];
    const restoranId = firstItem.restoranId;

    const orderData = {
      restoranId: restoranId,
      adresaId: izabranaAdresa.id,
      stavkeNarudzbine: cart.map((item) => ({
        jeloId: item.id,
        cena: item.cena,
        kolicina: item.kolicina,
      })),
    };

    try {
      const response = await napraviNarudzbinu(orderData);
      console.log("Narudžbina je uspešno napravljena:", response);
      // obrisa5ti korp, iskociti pop up uspesno narudceno, vratiti na pocetni ekran
    } catch (error) {
      console.error("Došlo je do greške prilikom naručivanja:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <FlatList
        ListHeaderComponent={() => (
          <Text className="text-2xl font-bold mb-4">Vaša korpa</Text>
        )}
        data={cart}
        keyExtractor={(item) => item.uniqueId.toString()}
        renderItem={({ item }) => (
          <View className="mb-4 flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.naziv}</Text>
              <Text>Kolicina: {item.kolicina}</Text>
            </View>
            <Counter
              kolicina={item.kolicina}
              setKolicina={(newKolicina) => {
                if (newKolicina > 0) {
                  addToCart({ ...item, kolicina: newKolicina });
                } else {
                  removeFromCart(item.uniqueId);
                }
              }}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
            {/* UKUPNA CENA */}
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
                  value={adresa.id}
                />
              ))}
            </Picker>
            <CustomButton
              title="Isprazni korpu"
              handlePress={clearCart}
              containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            />
            <CustomButton
              title="Poruči"
              handlePress={handlePlaceOrder}
              containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
