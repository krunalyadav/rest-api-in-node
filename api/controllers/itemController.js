"use strict";

var mongoose = require("mongoose"),
  Item = mongoose.model("Items");

// get all items
exports.getAllItems = (req, res) => {
  Item.find({}, (error, item) => {
    if (error) res.send(error);
    res.json(item);
  });
};

// add/post an item
exports.addItem = (req, res) => {
  var newItem = new Item(req.body);
  newItem.save((error, item) => {
    if (error) res.send(error);
    res.json(item);
  });
};

// get single item
exports.getItem = (req, res) => {
  Item.findById(req.params.itemId, (error, item) => {
    if (error) res.send(error);
    res.json(item);
  });
};

// update item
exports.updateItem = (req, res) => {
  Item.findOneAndUpdate(
    { _id: req.params.itemId },
    req.body,
    { new: true },
    (error, item) => {
      if (error) res.send(error);
      res.json(item);
    }
  );
};

//delete item
exports.deleteItem = (req, res) => {
  Item.remove(
    {
      _id: req.params.itemId
    },
    (error, item) => {
      if (error) res.send(error);
      res.json({ message: "Item deleted successfully" });
    }
  );
};
