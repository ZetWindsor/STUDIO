//per esercizio 12 "CRUD with dummy database" guarda il commit precedente
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");

const {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} = require("./controllers/planets.js");
const app = express();
const upload = multer({ dest: 'uploads/' });
const { logIn, signUp, logOut } = require("./controllers/users.js");
const { authorize } = require("./authorize.js");
require("./passport.js");


app.use(helmet());
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);

app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage)

app.post("/api/users/login", logIn)
app.post("/api/users/signup", signUp)
app.get("/api/users/logout", authorize, logOut)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server up and running on port:http://locahost:${process.env.SERVER_PORT}`);
});
