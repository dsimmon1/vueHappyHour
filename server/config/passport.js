
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require("../models");



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'yoursecret';

module.exports = passport => {
    passport.use (
        new JwtStrategy(opts, async (jwt_payload, done) => {
            await db.Users.find({username: jwt_payload.username}).then(user => {
                console.log(user)
                if(user) {return  done(null, user)}
                else {return done(null, false)}
            }).catch(err=> {
                console.log(err);
            })
            }
        )
    )
}
