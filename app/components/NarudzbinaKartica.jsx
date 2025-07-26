import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NarudzbinaCard = ({ narudzbina, onPress, isPending }) => {
  return (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <Text className="text-lg font-bold mb-2 text-primary">
        Narudžbina #{narudzbina.id}
      </Text>
      <Text className="text-base mb-1 text-primary">
        Status: {narudzbina.status}
      </Text>
      <Text className="text-base mb-1 text-primary">
        Musterija: {narudzbina.musterijaIme}
      </Text>

      <TouchableOpacity
        onPress={() => onPress()}
        disabled={isPending}
        className={`mt-4 p-2 rounded ${
          isPending ? "bg-gray-400" : "bg-secondary"
        }`}
      >
        <Text className="text-white text-center">Pogledaj detalje</Text>
      </TouchableOpacity>
      {isPending && (
        <View className="absolute inset-0 bg-black/100 rounded-lg flex justify-center items-center">
          <Ionicons name="sync-circle" size={40} color="white" />
          <Text className="text-white text-center mt-2 font-bold">
            Čeka na sinhronizaciju...
          </Text>
        </View>
      )}
    </View>
  );
};

export default NarudzbinaCard;
