import { Request, Response } from "express";
import Joi from "joi";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video")

const setupDb = async () => {
    await db.none(`
        DROP TABLE IF EXISTS planets;

        CREATE TABLE planets (
    id SERIAL NOT NULL PRIMARY KEY
    name  TEXT NOT NULL
)`)

    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)
    
    const planets = await db.many(`SELECT * FROM planets`)
    console.log(planets);
    
}
setupDb() 

type Planet = {
    id: number,
    name: string,
};

type Planets = Planet[];

let planets: Planets = [
    { id: 1, name: "Earth2", },
    { id: 2, name: "Mars2", },
];

const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets)
}

const getOneById = (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id))
    res.status(200).json(planet)
}


const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});

const create = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet: Planet = { id, name };
    const validateNewPlanet = planetSchema.validate(newPlanet)

    if (validateNewPlanet.error) {
        return res.status(400).json({ msg: validateNewPlanet.error.details[0].message })
    } else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: 'new planet created' })
    }

}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    planets = planets.map(p => p.id === Number(id) ? ({ ...p, name }) : p)

    console.log(planets);

    res.status(200).json({ msg: 'planet addes' })

}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params
    planets = planets.filter(p => p.id !== Number(id))

    res.status(200).json({ msg: "Freezer ha distrutto il pianeta" })
}


export {
    getAll, getOneById, create, updateById, deleteById
}