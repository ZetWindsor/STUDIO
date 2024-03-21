const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const passportJWT = require('passport-jwt');
const { db } = require('./db.js');

const { SECRET } = process.env;

passport.use(
    new passportJWT.Strategy({
        secretOrKey: SECRET,
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
        async (payload, done) => {
            try {
                const user = await db.one(`SELECT * FROM users WHERE id=$1`, payload.id);
                return user ? done(null, user) : done(new Error("User not found"));
            } catch (error) {
                done(error);
            }
        })
);
