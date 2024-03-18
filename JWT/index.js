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
} = require("./conrtrollers/planets");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})


const upload = multer({ storage })

const app = express();

app.use(helmet());
app.use(cors());
app.use("./uploads", express.static("uploads"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);
app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);
app.delete("/api/planets/:id", deleteById);

app.post("/api/planets/:id/image", upload.single("image"), createImage)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server up and running on port:http://locahost:${process.env.SERVER_PORT}`);
});
