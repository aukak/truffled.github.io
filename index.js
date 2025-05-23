const express = require("express");
const http = require("http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const routes = [
  { path: "/", file: "index.html" },
  { path: "/g", file: "games.html" },
  { path: "/t", file: "tools.html" },
  { path: "/s", file: "settings.html" },
  { path: "/p", file: "partners.html" },
  { path: "/o", file: "other.html" },
  { path: "/pa", file: "partners.html" },
  { path: "/c", file: "credits.html" },
  { path: "/404", file: "404.html" },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "public", route.file));
  });
});

app.use((req, res) => {
  res.redirect("/404");
});

const bareServer = createBareServer("/b/");
const server = http.createServer((req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});