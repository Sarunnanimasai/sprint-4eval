const express = require("express");
const { connection } = require("./main");
const { userRoute } = require("./routes/UserRoute");
const { postRoute } = require("./routes/PostRoute");
const { Auth } = require("./middleware/middleware");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoute);
app.use(Auth);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("This is HomePage");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected");
    console.log("Server is running");
  } catch (error) {
    console.log(error);
  }
});
