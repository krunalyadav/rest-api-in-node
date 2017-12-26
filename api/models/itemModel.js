"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//model schema
var Item = new Schema({
  name: String,
  stock: Number
});

exports = mongoose.model("Items", Item);
