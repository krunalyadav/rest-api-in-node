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
* **[nodemon](https://github.com/remy/nodemon)** - It is used to monitor any changes in already running Node.js application and restart the server automatically. So, if we do any changes while the server is running, we do not have to kill the running process and rerun the application again. It will automatically handle by nodemon.
* **[mongoose](http://mongoosejs.com/)** - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a straight-forward, schema-based solution to model your application data. It includes built-in typecasting, validation, query string, business logic hooks and more, out of the box.
* **[body-parser](https://github.com/expressjs/body-parser)** - It is a body parsing middleware. It parses the incoming request bodies in a middleware before your handlers and makes them available under the `body` property of `request` object. i.e. `req.body`.
* **[cors](https://github.com/expressjs/cors)** - It is a Node.js package which allows a cross-domain to consume our REST APIs. It can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.

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

Now navigate to the terminal and stop the currently running server by pressing `ctrl + c` key. Now type `npm start` and press enter. It will start the server again but the difference is now our nodemon is monitoring changes so we do not have to restart the server again.

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

Now, lets set up the routes for our application. Create `itemRoutes.js` file inside the `api/routes` folder and paste the following content into it.

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

Here we are specifying a particular handler function from `itemController`, which will be called when that particular route will be hit. 

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

Here we are importing `mongoose` package and `Item` model schema from mongoose. We are exporting a couple of functions. Explanation of each function in details is as below.

* `getAllItems`: Here we are receiving two parameters in a function. One is `request` object and the other is `response` object. In Item schema, we are calling [find](http://mongoosejs.com/docs/api.html#model_Model.find) method to find items. Here we are passing an empty object(no specific filter criteria). So we will get all items in array form in response. In the callback function, we are also passing two parameters. First one is error object and the second one is item object. If there is an error in fetching all items then error object will contain the error message, that we have checked in subsequent statements. So, if a callback function has an error in fetching the items, we will return an error in response else items list in response. 

* `addItem`: In this function same as described previously we are receiving two objects `request` and `response` as a parameter. Here we are creating a new Item with the value passed in the body of the request object. Thanks to body-parser we are able to receive posted item in `req.body` object. After creating new Item we are calling `save` method to save the details into MongoDB database. The callback function of `save` method will receive two objects error and item(which is saved) in parameter and based on the respective value we are sending the item or error in response to the client.

* `getItem`: In this function we are getting the `itemId` from `req.params` object. Then we are using [findById](http://mongoosejs.com/docs/api.html#model_Model.findById), which will return us the Item with specific id if it exists else an empty object. 

* `updateItem`: Here we are calling [findOneAndUpdate](http://mongoosejs.com/docs/api.html#model_Model.findById) method of model, in which we are passing `itemId`, `req.body` which will contain the item with new values that are required to update in database, `{ new: true}` the value of new is false by default but if we want to get the updated item in response then we have to set the value of new to true, callback function which will contain error and newly updated item object and send it to the database respectively.

* `deleteItem`: Here we are calling the remove method of a model and passing the `itemId` in order to specify which item to remove. Here in a callback function, we are passing a message on successful deletion of Item else we are sending an error to the client.

# Connecting the dots

Now let's connect the dots and put everything together. We have created our Model, defined our Routes and created our handler functions. Now is the time to put all them together. Let's navigate to `server.js` file and modified it as mentioned below.

```javascript
var express = require("express"),
  mongoose = require("mongoose"),
  Item = require("./api/models/itemModel"),
  bodyParser = require("body-parser"),
  routes = require("./api/routes/itemRoutes"),
  cors = require("cors");

var app = express(),
  port = process.env.PORT || 8080;

mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds133657.mlab.com:33657/<dbname>", {
  useMongoClient: true
});
var connection = mongoose.connection;
connection.on(
  "error",
  console.error.bind(console, "There is a problem while connecting MongoDB")
);

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// for cross-origin resource sharing, used when you are consuming APIs from cross domain
app.use(cors());

//setup routes
routes(app);

// handle not found route
app.use((req, res) => {
  res.status(404).send({
    url: req.originalUrl + " not found"
  });
});

// binds and listens for connections on specified host and port
var server = app.listen(port, () => {
  console.log("Server listens at: " + server.address().port);
});
```

Here we are importing `mongoose`, `body-parser` and `cors` package and we are also importing our `Item` model and our routes. Here I have used `mLab` instead of local machine's mongo instance. If you want to know more about it then please visit [here](https://mlab.com/). 

Here we are connecting to MongoDB server and if we face any issues we are printing the error message on the console. 

After that, we are binding `body-parser` and `cors` middleware into the app object. Then we are registering our routes.

We are also binding middleware to handle 404 requests on the server. So if some unknown route gets hit the client will get the 404 status code and message that the requested route did not find.

Our application was in running mode and special thanks to `nodemon` we do not have to stop the server to reflect the new changes. 

Now, let's test our APIs using `Postman`.

# Testing via Postman

Now open your postman, enter the URL `http://localhost:8080/api/items` and press enter.

![get all item](https://user-images.githubusercontent.com/16562273/34460295-f83ad75c-ee2f-11e7-9c8f-4c74fc460a91.png)

Here you can see "[]" empty array as there no item exist in the database yet. Now, let's add our first item. On the same address, change method to `POST`, click on `Body` and select `raw` checkbox. When you select `raw`, you will have a couple of options available on the right side in the drop-down, from that select `JSON(application/json)` and then add the `name` and `stock` in JSON form as shown below.

![post an item](https://user-images.githubusercontent.com/16562273/34460334-2c3add8a-ee31-11e7-9e74-e03a5644eaca.png)

After that press enter and you will see newly created Item in Body section as shown in below image.

![post an item](https://user-images.githubusercontent.com/16562273/34460349-8813129e-ee31-11e7-9296-974eaed678f1.png)

Now the same way we will add another Item with name `Item-2` and then we will change the method to `GET` and hit the same URL. Now we will able to see two items that we just added.

![get all item](https://user-images.githubusercontent.com/16562273/34460371-0345a968-ee32-11e7-96b9-c139a9e25f5a.png)

If we want to get only one item then we have to add `itemId` at the end of URL. So, we will change the URL to get the single Item to `http://localhost:8080/api/items/5a489d269eff972664524610` and press enter. You will see single Item in Body section as shown below.

![get single item](https://user-images.githubusercontent.com/16562273/34461481-3238da96-ee51-11e7-87b1-f449539cd104.png)

Now we will update the Item. For that change the method to `PUT` and update the request parameters in a body as shown below.

![put item](https://user-images.githubusercontent.com/16562273/34461487-8694346e-ee51-11e7-930b-cf8fd2de5687.png)

Now when we press enter the item will be updated and we will get the updated item in response as shown below.

![put item](https://user-images.githubusercontent.com/16562273/34461492-b622646c-ee51-11e7-9620-c3013bb5f2ac.png)

Now to delete the item, we just have to change the method to delete and press enter. we will get the response as shown below.

![delete item](https://user-images.githubusercontent.com/16562273/34461500-e9ef0ce6-ee51-11e7-9c12-e10acef1e23d.png)

So, this way we can perform CRUD operations in REST APIs in Node.js. I hope you enjoyed this tutorial. If you found anything wrong and if you want to improve this tutorial, kindly submit a PR and make this tutorial better.

If you like this tutorial then please star this GitHub repository and if you face any trouble implementing this code then please create an Issue in this repository.

Thank you very much for reading this tutorial. 

Happy Coding...!!
