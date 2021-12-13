import React, { useContext, useEffect, useState } from "react";
import { Alert, View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import dbContext from "../../context/dbContext";
import { getGames, deleteGame } from "../../sqlite/games/games";

import AppText from "../../components/AppText";
import MenuModal from "./MenuModal";
import colors from "../../constants/colors";

const Menu = (props) => {
  const [games, setGames] = useState();
  const [modal, setModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const { db } = useContext(dbContext);

  useEffect(() => {
    getGames(db).then((res) => setGames(res));
  }, [trigger]);

  const handleMenuModal = () => {
    setModal(true);
  };

  const deleteGameAlert = (num) =>
    Alert.alert(
      "Delete game",
      "Are you sure you would like to delete this game?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () =>
            deleteGame(db, num).then((res) => setTrigger(!trigger)),
          style: "destructive",
        },
      ]
    );

  console.log(games);
  return (
    <View style={styles.container}>
      <AppText style={styles.title} text={"BOXCO"} />
      <View style={styles.buttonContainer}>
        {games &&
          games.map((game) => (
            <TouchableOpacity key={game.id} style={styles.button}>
              <AppText style={styles.buttonText} text={game.title} />
              <Entypo
                name={"trash"}
                size={20}
                onPress={() => deleteGameAlert(game.id)}
              />
            </TouchableOpacity>
          ))}

        <TouchableOpacity
          style={[styles.button, styles.createButton]}
          onPress={handleMenuModal}
        >
          <AppText style={styles.buttonText} text={"Create a new game"} />
        </TouchableOpacity>
      </View>
      <MenuModal visible={modal} setVisible={setModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "red",
    flex: 1,
  },
  title: {
    alignSelf: "center",
    paddingTop: 50,
    fontSize: 50,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 100,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    padding: 20,
    width: 300,
  },
  buttonText: {
    // alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  createButton: {
    backgroundColor: "green",
    justifyContent: "center",
  },
});

export default Menu;
