"use strict";

const Hapi = require("@hapi/hapi");
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  await server.register({
    plugin: require("hapi-mongodb"),
    options: {
      url:
        "mongodb+srv://dbUser:dbUserPassword@cluster0.ohlko.mongodb.net/dbUser?retryWrites=true&w=majority",
      settings: {
        useUnifiedTopology: true,
      },
      decorate: true,
    },
  });

  // Add a new movie to the database
  server.route({
    method: "POST",
    path: "/movies",
    handler: (req, h) => {
      return "Add new movie";
    },
  });
  // Get a single movie
  server.route({
    method: "GET",
    path: "/movies/{id}",
    handler: (req, h) => {
      return "Return a single movie";
    },
  });
  // Update the details of a movie
  server.route({
    method: "PUT",
    path: "/movies/{id}",
    handler: (req, h) => {
      return "Update a single movie";
    },
  });
  // Delete a movie from the database
  server.route({
    method: "DELETE",
    path: "/movies/{id}",
    handler: (req, h) => {
      return "Delete a single movie";
    },
  });
  // Search for a movie
  server.route({
    method: "GET",
    path: "/search",
    handler: (req, h) => {
      return "Return search results for the specified term";
    },
  });

  // upload an image
  server.route({
    path: "/upload",
    method: "POST",
    handler: (req, h) => {
      const { payload } = req;
      return payload;
    },
  });

  await server.start();
  console.log(
    "Server running on %s and connected to mongodb ur mom get",
    server.info.uri
  );
};

try {
  init();
} catch (e) {
  console.error(e);
}
