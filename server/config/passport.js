
const mongodb = require('mongodb');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'yoursecret';

module.exports = passport => {
    passport.use (
        new JwtStrategy(opts, async (jwt_payload, done) => {
            const users = await loadUsers();
            await users.findOne({username: jwt_payload.username}).then(user => {
                if(user) {return  done(null, user)}
                else {return done(null, false)}
            }).catch(err=> {
                console.log(err);
            })
            }
        )
    )
}


async function loadUsers() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://dianna:password@ds153958.mlab.com:53958/drinx-dev', {
        useNewUrlParser: true
    });
    return client.db('drinx-dev').collection('users');
}
