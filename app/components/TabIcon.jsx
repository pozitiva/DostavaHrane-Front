import React from "react";
import { View, Text, Image } from "react-native";

const TabIcon = ({ icon, badgeCount }) => (
  <View style={{ position: "relative" }}>
    <Image source={icon} style={{ width: 24, height: 24 }} />
    {badgeCount > 0 && (
      <View
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          backgroundColor: "red",
          borderRadius: 10,
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>{badgeCount}</Text>
      </View>
    )}
  </View>
);

export default TabIcon;
