"use strict";
var itemController = require("../controllers/itemController");

module.exports = function(app) {
  app
    .route("/api/items")
    .get(itemController.getAllItems) // route to get all items
    .post(itemController.addItem); // route to post/add item

  app
    .route("/api/items/:itemId")
    .get(itemController.getItem) // route to get single item
    .put(itemController.updateItem) // route to update one item
    .delete(itemController.deleteItem); // route to delete item
};
