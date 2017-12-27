# rest-api-in-node
Getting started with REST APIs in Node.js

This is begginer level getting started guide for creating REST APIs in [Node.js](https://nodejs.org/en/docs/), [Express.js](https://expressjs.com/), [MongoDB](https://docs.mongodb.com/) and [Mongoose](http://mongoosejs.com/docs/guide.html). This tutorial will walk you through how to create simple CRUD REST APIs and how to do MongoDB database interaction in Node.js. I assume that you have a basic understanding of Javascript, if not then I request you to please go through the [Javascript tutorial of w3schools](http://mongoosejs.com/docs/guide.html).

Here we will implement REST APIs from scratch, step by step, so you will have a good understanding of how REST APIs are being created from scratch. I will also share code snippets with detail explanation. 

Let's first start with the basic concept that what is REST APIs.

**RE**presentational **S**tate **T**ransfer simply known as REST or RESTful is an architecture style for designing networked applications which uses HTTP requests to GET, PUT, POST and DELETE data. It is a lightweight alternative to mechanism like Remote Procedure Calls and Web Services. It is quite popular because of its stateless nature.

I assume that you have node installed in your machine. If not then I request you to download it from [here](https://nodejs.org/en/) and run the installer, it will do the required job for you.

# Let's Code Now

Now let's first create an empty directory named **rest-node**. Open your Command Line and type the following command.
``` 
mkdir rest-node
```

Now navigate within the directory by running the below command.
```
cd rest-node
```

Now run the below command to create the [package.json](https://docs.npmjs.com/files/package.json) file.
```
npm init -y
```

package.json file contains all the package name along with its version that we install while creating any node application. Now lets install the below packages.

```
npm install express nodemon mongoose body-parser cors --save
```

Here we have installed five packages. Their details are as below.
* **express** - Express is a minimal and flexible Node.js application framework. It provides minimal interface to build our application.
* **nodemon** - It is used to monitor any changes in already running node.js application and restart the server automatically. So, if we do any changes while server is running, we do not have to kill the running process and rerun the application again. It will automatically handled by nodemon.

