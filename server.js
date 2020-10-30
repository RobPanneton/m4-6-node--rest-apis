"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  handlerAccessClientbase,
  handlerAccessClientInfo,
  handlerCreateNewClient,
  handlerDeleteClient,
} = require("./handlers/clientHandlers");
const {
  handlerGetWord,
  handlerGetRandomWord,
  handlerGuessStatus,
} = require("./handlers/hangmanHandlers");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  .get("/clients", handlerAccessClientbase)

  .get("/clients/:id", handlerAccessClientInfo)

  .post("/clients", handlerCreateNewClient)

  .delete("/clients/:id", handlerDeleteClient)

  // HANGMAN

  .get("/hangman/word/:id", handlerGetWord)

  .get("/hangman/word", handlerGetRandomWord)

  .get("/hangman/guess/:id/:letter", handlerGuessStatus)
  // MISC

  .get("*", (req, res) => {
    res.status(404).json({
      status: "failed",
      message: "this page does not exist",
    });
  })

  // endpoints

  .listen(8000, () => console.log(`Listening on port 8000`));
