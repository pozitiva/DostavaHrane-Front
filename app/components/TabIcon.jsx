// components/TabIcon.js
import React from "react";
import { View, Text, Image } from "react-native";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View
      style={{ alignItems: "center", justifyContent: "center", height: 50 }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color, marginTop: 15 }}
      />
      <Text
        style={{ color: focused ? color : "black", fontSize: 10, marginTop: 5 }}
      >
        {name}
      </Text>
    </View>
  );
};

export const commonTabOptions = (icon, name) => ({
  tabBarIcon: ({ color, focused }) => (
    <TabIcon icon={icon} color={color} focused={focused} name={name} />
  ),
  tabBarLabel: "",
  tabBarActiveTintColor: "#EF9920",
  tabBarInactiveTintColor: "gray",
  tabBarStyle: { backgroundColor: "#FFFFFF", height: 60, paddingBottom: 5 },
});

export default TabIcon;
