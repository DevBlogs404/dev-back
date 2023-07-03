const app = require('./index.js')
app.use("/", (req, res) => {
    res.send("App running successfully");
  });
  