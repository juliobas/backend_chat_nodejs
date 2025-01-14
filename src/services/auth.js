const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getByEmail = require('../models/user/getbyemail');
const create = require('../models/user/register');
const getbyid = require('../models/user/getbyid');


passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        const user = await getByEmail(email);
        if (user) {
            return done(null, false, { message: 'Email already taken' });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const { name } = req.body;
        const newUser = await create(name, email, hashedPassword);
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }    
        
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
        const user = await getByEmail(email);
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = bcrypt.compareSync(password, user.password);
        if (!validate) {
            return done(null, false, { message: 'Wrong password' });
        }
        return done(null, user, { message: 'Logged in successfully' });
    } catch (error) {
        return done(error);
    }
  }));

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'GMa7pg2od40l6C74I01BIKoT0QkUhehW'
};
  
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await getById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;
