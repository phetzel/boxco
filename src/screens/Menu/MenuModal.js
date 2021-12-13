import React, { useContext, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";

import dbContext from "../../context/dbContext";
import { createGame } from "../../sqlite/games/games";

import colors from "../../constants/colors";

import AppText from "../../components/AppText";

const MenuModal = ({ visible, setVisible }) => {
  const [title, setTitle] = useState("");
  const { db } = useContext(dbContext);
  if (!visible) return null;

  const handleCreate = async () => {
    const date = new Date().toString();
    createGame(db, title, date).then((res) => console.log(res));
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <AppText text={"New game"} />
        <TouchableOpacity style={styles.x} onPress={() => setVisible(false)}>
          <AppText text={"X"} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          placeholder={"Name"}
          value={title}
        />
        <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
          <AppText text={"Create a new game"} style={styles.createButtonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "space-around",
    height: 300,
    width: 300,
  },
  x: {
    position: "absolute",
    right: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  createButton: {
    backgroundColor: colors.black,
    borderRadius: 4,
    padding: 10,
  },
  createButtonText: {
    color: colors.white,
  },
});

export default MenuModal;
