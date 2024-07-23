import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const SettingsButton = ({ ...children }) => {
  return (
    <TouchableOpacity style={styles.container} {...children}>
      <Ionicons name="settings" size={24} color="white" />
      <Text style={styles.text}>Settings</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2E3740",
    width: scale(85),
    height: verticalScale(35),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(5),
    borderRadius: moderateScale(10),
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
});

export default SettingsButton;
