"use strict";
const express = require("express");
const app = express();
const twit = require("./routes/routes");

app.use(express.static("./public"));
app.use(express.json());
app.use("/", twit);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});