"use strict";

var mongoose = require("mongoose"),
  Item = mongoose.model("Items");

// get all items
exports.getAllItems = function(req, res) {
  Item.find({}, function(error, item) {
    if (error) res.send(error);
    res.json(item);
  });
};

// add/post an item
exports.addItem = function(req, res) {
  var newItem = new Item(req.body);
  newItem.save(function(error, item) {
    if (error) res.send(error);
    res.json(item);
  });
};

// get single item
exports.getItem = function(req, res) {
  Item.findById(req.params.itemId, function(error, item) {
    if (error) res.send(error);
    res.json(item);
  });
};

// update item
exports.updateItem = function(req, res) {
  Item.findOneAndUpdate(
    { _id: req.params.itemId },
    req.body,
    { new: true },
    function(error, item) {
      if (error) res.send(error);
      res.json(item);
    }
  );
};

//delete item
exports.deleteItem = function(req, res) {
  Item.remove(
    {
      _id: req.params.itemId
    },
    function(error, item) {
      if (error) res.send(error);
      res.json({ message: "Item deleted successfully" });
    }
  );
};
