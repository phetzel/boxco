import React from "react";
import { Text, StyleSheet } from "react-native";

import colors from "../constants/colors";

const AppText = ({ style, text }) => {
  return <Text style={[styles.text, style]}>{text}</Text>;
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.black,
  },
});

export default AppText;
