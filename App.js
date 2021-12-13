import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import dbContext from "./src/context/dbContext";
import loadDatabase from "./src/sqlite/loadDatabase";
import Menu from "./src/screens/Menu/Menu";

const db = loadDatabase("db");
console.log(db);

export default function App() {
  return (
    <dbContext.Provider value={{ db }}>
      <Menu />
    </dbContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
