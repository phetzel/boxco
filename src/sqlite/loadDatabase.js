import * as SQLite from "expo-sqlite";

export default loadDatabase = (name) => {
  const db = SQLite.openDatabase(name);
  return db;
};
