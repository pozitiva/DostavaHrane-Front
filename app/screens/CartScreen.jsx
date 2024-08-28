import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCartStore from "../../store/CartStore";
import CustomButton from "../components/CustomButton";
import Counter from "../components/Counter";

const CartScreen = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCartStore(
    (state) => ({
      cart: state.cart,
      removeFromCart: state.removeFromCart,
      clearCart: state.clearCart,
      addToCart: state.addToCart,
    })
  );

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
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <CustomButton
              title="Isprazni korpu"
              handlePress={clearCart}
              containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            />
            <CustomButton
              title="Poruči"
              handlePress={() => {}}
              containerStyles="w-[335px] h-[48px] rounded-full mt-4"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
