const Express = require("express");
const data = require("./data.json");
const path = require("path");
const cors = require("cors");

const App = Express();

App.use(cors());
App.use(Express.static("public"));

App.get("/data", (req, res) => {
  res.send(data);
});

App.get("/data/:id", (req, res) => {
  data.find((item) => {
    console.log(item.id, req.params.id);
    if (item.id === parseInt(req.params.id)) {
      const options = {
        root: path.join(__dirname, "assets/images/"),
      };

      console.log(options.root + item.image);

      res.sendFile(item.image, options, (err) => {
        if (err) {
          res.sendStatus(404);
        } else {
          console.log("File sent to client");
        }
      });
    }
  });
});

App.get("/day/:day", (req, res) => {
  const day = req.params.day;
  const item = data.filter((item) =>
    item.days.some((d) => d.toLowerCase() === day.toLowerCase())
  );

  if (item) {
    console.log("hi stinky", item);
    res.send(item);
  } else {
    res.sendStatus(404);
  }
});

App.listen(5555, () => {
  console.log("Application started on port 5555");
});
