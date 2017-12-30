# Getting Started with REST APIs in Node.js

This is beginner level getting started guide for creating REST APIs in [Node.js](https://nodejs.org/en/docs/), [Express.js](https://expressjs.com/), [MongoDB](https://docs.mongodb.com/) and [Mongoose](http://mongoosejs.com/docs/guide.html). This tutorial will walk you through how to create simple CRUD REST APIs and how to do MongoDB database interaction in Node.js. I assume that you have a basic understanding of Javascript, if not then I request you to please go through the [Javascript tutorial of w3schools](http://mongoosejs.com/docs/guide.html).

Here we will implement REST APIs from scratch, step by step, so you will have a good understanding of how REST APIs are being created from scratch. I will also share code snippets with detail explanation. 

Let's first start with the basic concept that what is REST APIs.

**RE**presentational **S**tate **T**ransfer simply known as REST or RESTful is an architecture style for designing networked applications which use HTTP requests to GET, PUT, POST and DELETE data. It is a lightweight alternative to a mechanism like Remote Procedure Calls and Web Services. It is quite popular because of its stateless nature.

I assume that you have node installed on your machine. If not then I request you to download it from [here](https://nodejs.org/en/) and run the installer, it will do the required job for you.

# Let's Code Now

First, let me show you the final application file structure. It will look something like below.

    - api
      - controllers
        - itemController.js
      - models
        - itemModel.js
      - routes
        - itemRoutes.js
    - node_modules
      - ... various modules that we install via `npm install` command ...
    - .gitignore
    - package.json
    - README.md
    - server.js

Now let's create an empty directory named **rest-node**. Open your Command Line and type the following command.
``` 
mkdir rest-node
```

Now navigate to the directory by running the below command.
```
cd rest-node
```

Now run the below command to create the [package.json](https://docs.npmjs.com/files/package.json) file.
```
npm init -y
```

It will look as below.

```javascript
{
  "name": "rest-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

package.json file contains all the package name along with its version that we install while creating any node application. Now let's install the below packages.

```
npm install express nodemon mongoose body-parser cors --save
```

Here we have installed five packages. Their details are as below.
* **[express](https://expressjs.com/)** - Express is a minimal and flexible Node.js application framework. It provides a minimal interface to build our application.
* **[nodemon](https://github.com/remy/nodemon)** - It is used to monitor any changes in already running node.js application and restart the server automatically. So, if we do any changes while the server is running, we do not have to kill the running process and rerun the application again. It will automatically handle by nodemon.
* **[mongoose](http://mongoosejs.com/)** - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a straight-forward, schema-based solution to model your application data. It includes built-in typecasting, validation, query string, business logic hooks and more, out of the box.
* **[body-parser](https://github.com/expressjs/body-parser)** - It is a body parsing middleware. It parses the incoming request bodies in a middleware before your handlers and makes them available under the `body` property of `request` object. i.e. `req.body`.
* **[cors](https://github.com/expressjs/cors)** - It is a node.js package which allows a cross-domain to consume our REST APIs. It can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.

Now let's create our `server.js` file at the root of the project, which is used to configure our application. The initial content of the file is as below.

# server.js

```javascript
var express = require("express");
var app = express(),
  port = process.env.PORT || 8080;

// binds and listens for connections on specified host and port
var server = app.listen(port, () => {
  console.log("Server listens at: " + server.address().port);
});
```

Here we are importing the express module and creating the server. Our server will receive requests on either 8080 or the one we specify in `PORT` environment variable. Now navigate to the terminal and run the command `node server.js`. You will see `Server listens at: 8080` message on the command line.

If we change anything inside the application, then we have to stop the currently running server and rerun the server in order to reflect new changes, which is a cumbersome process. To resolve this issue we have installed `nodemon` in our application. So, now open `package.json` file and add the following command in `script` section.

```
"start": "nodemon server.js"
```

After adding above scripts, our `package.json` file will look as below.

```javascript
{
  "name": "rest-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.2",
    "cors": "^2.8.4",
    "express": "^4.16.2",
    "mongoose": "^4.13.7",
    "nodemon": "^1.14.3"
  }
}
```

Now let's create an api folder by running `mkdir api` command in command line terminal. After that create three separate folders named models, controllers, and routes by running the command `mkdir api\models api\controllers api\routes`.

Create an `itemModel.js` file inside folder `api\models` and paste the below content in it.

```javascript
"use strict";

var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//model schema
var Item = new Schema({
  name: String,
  stock: Number
});

exports = mongoose.model("Items", Item);
```

You can see that we have imported the `mongoose` package and created an Item schema, which will contain a `name` and `stock` with type `String` and `Number` respectively. 

Now, lets set up the routes for our application. Create and `itemRoutes.js` file inside the `api/routes` folder and paste the following content into it.

```javascript
"use strict";
var itemController = require("../controllers/itemController");

module.exports = app => {
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
```

I have used `ES6` arrow function. To read more about it please visit [here](https://github.com/lukehoban/es6features#arrows). Here we have imported `itemController`, I will explain it in detail very soon. As of now just remember that it is importing `itemController` inside our route file. 

As you can see there are two types of routes defined. one is `/api/items` and the other is `/api/items/:itemId`. The route `/api/items` has `GET` and `POST` methods. The `GET` method we defined here will use to get all the items inside our application. The `POST` method is used to add or post a new item to our application.

We have defined `GET`, `PUT` and `DELETE` method with route `/api/items/:itemId`. Here `:itemId` is a parameter which will contain the item id of a particular item. Here `GET` method will be used to get a single item from our application, `PUT` method used to update the item details inside our application and `DELETE` method used to delete the item from our application.

Here we are specifying a particular handler function from itemController, which will be called when that particular route will be hit. 

Now let's create an `itemController.js` file inside `api/controllers` folder and paste the following content into it.

```javascript
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
```
