import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { jelaMock } from "../../utils/dataMocks";

const RestaurantCard = ({ restoran, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(restoran)}
      className="w-[45%] mb-4 mx-[2.5%]"
    >
      <Image source={restoran.sourceSlike} className="h-48 w-full" />
      <Text className="text-left mt-2">{restoran.imeRestorana}</Text>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
