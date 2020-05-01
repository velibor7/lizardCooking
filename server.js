const http = require("http");
const app = require("./backend/app");
const debug = require("debug");

const normalizePort = (val) => {
  var port = process.env.PORT || 3000;
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  }
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit();
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError); // reg for events
server.on("listening", onListening);
server.listen(port);
