/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";

import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { mySchema } from "./src/models/schema";
import { dbModels } from "./src/models/index.js";

import { createNavigation } from "./src/screens/Navigation";

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  dbName: "WatermelonDemo",
  schema: mySchema
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: dbModels
});

const Navigation = createNavigation({ database });

AppRegistry.registerComponent(appName, () => Navigation);
