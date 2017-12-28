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
* **[mongoose](http://mongoosejs.com/)** - Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. It provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query string, business logic hooks and more, out of the box.
* **[body-parser](https://github.com/expressjs/body-parser)** - It is a body parsing middleware. It parses the incoming request bodies in a middleware before your handlers and makes them available under the `body` property of `request` object. i.e. `req.body`.
* **[cors](https://github.com/expressjs/cors)** - It is a node.js package which allows a cross-domain to consume our REST APIs. It can be used to enable [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) with various options.

Now let's create our `server.js` file, which is used to configure our application. The initial content of the file is as below.

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
