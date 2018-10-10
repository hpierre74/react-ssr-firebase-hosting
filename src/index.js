import React from "react";
import { hydrate } from "react-dom";
import App from "./App";
import Database from "./database";

const db = new Database("https://ssr-dev-test.firebaseio.com");

db.get("facts").then(facts => {
  hydrate(<App facts={facts} />, document.getElementById("root"));
});
