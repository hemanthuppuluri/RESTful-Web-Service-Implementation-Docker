const fs = require("fs");
const express = require("express");
const app = express();
bp=require("body-parser")
app.use(bp.json())
const cr = require("cors");

app.use(cr());

app.get("/heros", (req, res) => {
  fs.readFile(__dirname + "/" + "books.json", "utf-8", (err, data) => {
    // console.log('hity')
    if (err) throw err;
    else console.log("hit");
    // console.log(data)
    res.end(data);
  });
});

app.post("/herosid", (req, res) => {
  fs.readFile(__dirname + "/" + "books.json", "utf-8", (err, data) => {
    console.log('hitid')
    if (err) {
      throw err;
    } else {
      const json = JSON.parse(data);
      const heros = json.heros;
      let result = undefined;
      console.log(req.body.id)
      for (hero of heros) {
        if (hero.id == req.body.id) result = hero;
      }
      console.log(hero)

      if (result) res.end(JSON.stringify(result));
      else res.status("404").send("404: Not Found");
    }
  });
});








app.get("*", (req, res) => res.status("404").send("404: Not Found"));

app.listen(3000, () => {
  console.log("REST API ruuuuuunning on Port 3000");
});
