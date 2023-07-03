const app = require("./index");
app.use("/", (req, res) => {
  res.send("App running successfully");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app running at ${PORT}`);
});
