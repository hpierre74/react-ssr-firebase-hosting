import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "./src/App";
import Database from "./src/database";
import express from "express";
import * as fs from "fs";
import * as functions from "firebase-functions";

const index = fs.readFileSync(__dirname + "/index.template.html", "utf8");
const app = express();
app.get("**", (req, res) => {
  const db = new Database("https://ssr-dev-test.firebaseio.com");

  db.get("facts")
    .then(facts => {
      const html = renderToString(<App facts={facts} />);
      const finalHtml = index.replace("<!-- ::APP:: -->", html);
      res.set("Cache-Control", "no-cache");
      res.set("Content-Type", "text/html; utf8");
      res.send(finalHtml);
    })
    .catch(err => {
      throw new Error(err);
    });
});

export let ssrapp = functions.https.onRequest(app);
//app.listen(3006, () => { console.log('Listening on 3006.'); });
