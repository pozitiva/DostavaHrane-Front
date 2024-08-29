import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Modalize } from "react-native-modalize";
import useCartStore from "../../store/CartStore";
import { images } from "../../constants";
import CustomButton from "./CustomButton";
import Counter from "./Counter";

const JeloModal = ({ jelo, onClose }) => {
  console.log(jelo);
  const [kolicina, setKolicina] = useState(1);
  const modalizeRef = useRef(null);

  useEffect(() => {
    modalizeRef.current?.open();
  }, [jelo]);

  const addToCart = useCartStore((state) => state.addToCart);

  // const toggleExtra = (extra) => {
  //   if (selectedExtras.includes(extra)) {
  //     setSelectedExtras(selectedExtras.filter((item) => item !== extra));
  //   } else {
  //     setSelectedExtras([...selectedExtras, extra]);
  //   }
  // };

  const handleAddToCart = () => {
    const uniqueId = `${jelo.id}-${Date.now()}`;

    const item = {
      ...jelo,
      //selectedExtras,
      kolicina,
      uniqueId,
    };
    addToCart(item);
    setKolicina(1);
    onClose();
    //setSelectedExtras([]);
  };
  return (
    <Modalize
      ref={modalizeRef}
      snapPoint={600} // Visina na koju će modal stati
      modalHeight={600} // Maksimalna visina modala
      onClose={() => onClose()}
    >
      <View className="items-center mb-6">
        <Image source={images.cards} className="w-full h-48 rounded-lg" />
        {/* <Text className="text-2xl font-bold mt-4">{jelo.naziv}</Text> */}
      </View>

      <View className="px-4">
        <Text className="text-lg font-bold mb-2">Dodaci</Text>
        {/* {jelo.dodaci?.map((extra, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleExtra(extra)}
              className="flex-row items-center mb-4"
            >
              <View
                className={h-6 w-6 mr-2 border-2 border-gray-400 rounded ${
                  selectedExtras.includes(extra) ? "bg-black" : "bg-white"
                }}
              />
              <Text className="text-lg">{extra}</Text>
            </TouchableOpacity>
          ))} */}
      </View>

      <Counter kolicina={kolicina} setKolicina={setKolicina} />

      <View className="flex items-center">
        <CustomButton
          title="Dodaj u porudžbinu"
          containerStyles="w-[335px] h-[48px] rounded-full mt-4"
          handlePress={handleAddToCart}
        />
      </View>
    </Modalize>
  );
};

export default JeloModal;
