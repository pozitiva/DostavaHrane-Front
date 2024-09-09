import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import useCartStore from "../../store/CartStore";
import { API_BASE_URL } from "../../utils/zajednickiPodaci";
import Counter from "./Counter";
import CustomButton from "./CustomButton";

const JeloModal = ({ jelo, onClose }) => {
  console.log(jelo);
  const [kolicina, setKolicina] = useState(1);
  const modalizeRef = useRef(null);

  useEffect(() => {
    modalizeRef.current?.open();
  }, [jelo]);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
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
          source={{ uri: `http://192.168.0.13:5076${jelo.slikaUrl}` }}
          className="w-full h-48 rounded-lg"
        />
        <Text className="text-2xl font-bold mt-4">{jelo.naziv}</Text>
        <Text className="text-sm font-normal p-3 ">{jelo.opis}</Text>
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
3;
