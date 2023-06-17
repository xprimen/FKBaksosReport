import path from "path";
import fs from "fs";

// users in JSON file for simplicity, store in a db for production applications
// let users = require("data/users.json");
// let data = [];

export const dataRepo = {
  getAll,
  //   getById: (id) => users.find((x) => x.id.toString() === id.toString()),
  //   find: (x) => users.find(x),
  createBulk,
  //   update,
  //   delete: _delete,
};

function getAll(table: string) {
  return require("/public/json/" + table + ".json");
}

function createBulk(table: string, dataSend: any[]) {
  // generate new user id
  //   user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;

  // add and save user
  // data.push(dataSend);
  return saveData(table, dataSend);
}

/* function update(id, params) {
  const user = users.find((x) => x.id.toString() === id.toString());

  // set date updated
  user.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(user, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted user and save
  users = users.filter((x) => x.id.toString() !== id.toString());
  saveData();
} */

// private helper functions

export function saveData(table: string, data: any[]) {
  // try {
  //   fs.readdir(process.cwd() + "/renderer/public/json", undefined, (err: any) =>
  //     console.log("Error Read", err)
  //   );
  // } catch (error) {
  //   fs.mkdir(process.cwd() + "/renderer/public/json", undefined, (err: any) =>
  //     console.log("Error MKDIR", err)
  //   );
  // }

  return fs.writeFileSync(
    `./renderer/public/json/${table}.json`,
    JSON.stringify(data, null, 4)
  );
}
