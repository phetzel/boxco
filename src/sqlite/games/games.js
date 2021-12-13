export const getGames = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists games (id integer primary key not null, title text, date date);",
      "select * from games;"
    );
  });

  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM games",
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

export const createGame = (db, text, date) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO games (title, date) VALUES (?, ?)`,
        [text, date],
        (_, result) => resolve(result.insertId),
        (_, error) => reject(error)
      );
    });
  });
};

export const deleteGame = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM games WHERE id = ?",
        [id],
        resolve,
        (_, error) => reject(error)
      );
    });
  });
};
