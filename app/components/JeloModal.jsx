import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import useKorpaSkladiste from "../../store/KorpaSkladiste";
import { API_BASE_URL } from "../../utils/zajednickiPodaci";
import Counter from "./Counter";
import CustomButton from "./CustomButton";

const JeloModal = ({ jelo, onClose }) => {
  const [kolicina, setKolicina] = useState(1);
  const modalizeRef = useRef(null);

  const { addToCart, clearCart, cart } = useKorpaSkladiste((state) => ({
    addToCart: state.addToCart,
    clearCart: state.clearCart,
    cart: state.cart,
  }));

  useEffect(() => {
    modalizeRef.current?.open();
  }, [jelo]);

  const handleAddToCart = () => {
    const currentRestaurantId = jelo.restoranId;
    const cartRestaurantId = cart.length > 0 ? cart[0].restoranId : null;

    if (cartRestaurantId && cartRestaurantId !== currentRestaurantId) {
      Alert.alert(
        "Upozorenje",
        "Možete dodavati stavke samo iz jednog restorana u korpu."
      );
      clearCart();
    }

    const uniqueId = `${jelo.id}-${Date.now()}`;

    const item = {
      ...jelo,
      kolicina,
      uniqueId,
    };
    addToCart(item);
    setKolicina(1);
    onClose();
  };
  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={550}
      modalHeight={635}
      onClose={() => onClose()}
    >
      <View className="items-center mb-6">
        <Image
          source={{ uri: `${API_BASE_URL}${jelo.slikaUrl}` }}
          className="w-full h-48 rounded-lg"
        />
        <Text className="text-2xl mt-4 text-primary">{jelo.naziv}</Text>
        <Text className="text-sm p-3 text-primary">{jelo.opis}</Text>
        <Text className="text-xl p-2 text-primary">Cena: {jelo.cena}</Text>
      </View>

      <Counter kolicina={kolicina} setKolicina={setKolicina} />

      <View className="flex items-center">
        <CustomButton
          title="Dodaj u porudžbinu"
          containerStyles="w-[335px] h-[48px] rounded-full mt-5"
          handlePress={handleAddToCart}
        />
      </View>
    </Modalize>
  );
};

export default JeloModal;
