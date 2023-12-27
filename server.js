const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/express-backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(userRoutes);
app.use(postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
