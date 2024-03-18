const Joi = require("joi");
const pgPromise = require("pg-promise");

const db = pgPromise()("postgres://postgres:123abc@localhost:5432/video");

const planetSchema = Joi.object({
  name: Joi.string().required(),
});

const getAll = async (_, res) => {
  try {
    const planets = await db.many(`SELECT * FROM planets`);
    return res.status(200).json({ planets });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching planets", error });
  }
};

const getOneById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`Fetching planet with ID: ${id}`);
    const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1`, id);
    if (!planet) {
      return res.status(404).json({ message: "Planet not found" });
    }
    console.log(`Found planet:`, planet);
    return res.status(200).json({ planet });
  } catch (error) {
    console.error("Error fetching planet:", error);
    return res.status(500).json({ message: "Error fetching planet", error });
  }
};



const create = async (req, res) => {
  /*const { name } = req.body;
   try {
    const newPlanet = await db.one(
      `INSERT INTO planets (name) VALUES ($1) RETURNING *`,
      name
    );
    return res.status(201).json({ newPlanet });
  } catch (error) {
    return res.status(400).json({ message: "Error creating planet", error });
  } */
  const { name } = req.body;
  const newPlanet = { name };
  const valiedateNewPlanet = planetSchema.validate(newPlanet)

  if (valiedateNewPlanet.error) {
    return res.status(400).json({ msg: valiedateNewPlanet.error })
  } else {
    await db.none(`INSERT INTO planets(name) VALUES ($1)`, name);
    res.status(201).json({ msh: "the planet was created" })
  }

};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
  res.status(200).json({ msg: "planet updated" })
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const planetId = parseInt(id, 10);
  console.log("ID fornito:", id);
  console.log("planetId parsificato:", planetId);

  if (isNaN(planetId)) {
    return res.status(400).json({ message: "ID del pianeta non valido" });
  }

  try {
    await db.none(`DELETE FROM planets WHERE id=$1`, planetId);
    return res.status(200).json({ msg: "Freezer ha distrutto il pianeta" });
  } catch (error) {
    return res.status(500).json({ message: "Freezer ha distrutto il pianeta", error });
  }
};

module.exports = { getAll, getOneById, create, updateById, deleteById };