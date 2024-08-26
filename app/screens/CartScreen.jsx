import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import useCartStore from "../../store/CartStore";
import CartItem from "../components/CartItem";
import * as Icon from "react-native-feather";
import { useNavigation } from "expo-router";

const CartScreen = () => {
  const { cart, removeFromCart, clearCart } = useCartStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
  }));

  const navigation = useNavigation();

  console.log("Cart Items:", cart); // Log cart items
  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="relativer py-4 shadow-sm">
        <TouchableOpacity
          className="absolute z-10 rounded-full p-1 shadow top-5 left-2"
          onPress={() => navigation.goBack()}
        >
          <Icon.ArrowLeft strokeWidh={3} stroke="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <Text className="text-2xl font-bold mb-4">Vaša korpa</Text>
        )}
        data={cart}
        keyExtractor={(item) => item.uniqueId}
        renderItem={({ item }) => (
          <View className="mb-4 flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.naziv}</Text>
              <Text>Dodaci: {item.selectedExtras.join(", ")}</Text>
              <Text>Kolicina: {item.quantity}</Text>
            </View>
            <CustomButton
              title="Izbaci"
              containerStyles="bg-red-500 p-2 rounded-full"
              handlePress={() => removeFromCart(item.productId)} // Remove individual item
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
