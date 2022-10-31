const passport = require("passport");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.users;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secret;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ where: { email: jwt_payload.email }})
    .then(user => {
        if (!user) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false)
        }
    })
}));