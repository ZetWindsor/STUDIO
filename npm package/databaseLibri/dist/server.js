import express from 'express';
import "express-async-errors";
import morgan from 'morgan';
import Joi from 'joi';
const app = express();
const port = 3002;
let planets = [
    { id: 1, name: "Earth2", },
    { id: 2, name: "Mars2", },
];
app.use(morgan("dev"));
app.use(express.json()); //questo per il post
app.get("/api/planets", (req, res) => {
    res.status(200).json(planets);
});
app.get('/api/planets/:id', (req, res) => {
    const { id } = req.params;
    const planet = planets.find((p) => p.id === Number(id));
    res.status(200).json(planet);
});
const planetSchema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
});
app.post('/api/planets', (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validateNewPlanet = planetSchema.validate(newPlanet);
    if (validateNewPlanet.error) {
        return res.status(400).json({ msg: validateNewPlanet.error.details[0].message });
    }
    else {
        planets = [...planets, newPlanet];
        res.status(201).json({ msg: 'new planet created' });
    }
});
app.put("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    planets = planets.map(p => p.id === Number(id) ? (Object.assign(Object.assign({}, p), { name })) : p);
    console.log(planets);
    res.status(200).json({ msg: 'planet addes' });
});
app.delete("/api/planets/:id", (req, res) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id));
    res.status(200).json({ msg: "Freezer ha distrutto il pianeta" });
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
