const express = require("express");
const app = express();

app.get("/", (request: any, response: any) => {
  return response.send("aloaa");
});

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
