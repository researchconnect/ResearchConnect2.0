const passport = require('passport');
const mongoose = require('mongoose');
const googleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');

const User = mongoose.model('users');
const Student = mongoose.model('students');
const FacultyMember = mongoose.model('faculty_members');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

// Passport setup
const root = (process.env.NODE_ENV === 'production') ? `https://${keys.baseURL}` : '';
passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${root}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      // We need to save the accessToken & info to DB
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // We already have a record with unique profile.id
        return done(null, existingUser);
      }

      if (!profile.emails[0].value.endsWith("@ucsc.edu")) {
        return done(null, null);
      }

      // Get cruzid from email
      const profile_cruzid = profile.emails[0].value.split('@')[0];

      // Check if person with this cruzid exists in faculty
      const existingFacultyMember = await FacultyMember.findOne({
        cruzid: profile_cruzid,
      });

      // User logging in for first time - save to db
      const user = await new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        cruzid: profile_cruzid,
        isProfessor: !!existingFacultyMember,
        isSetup: false,
        name: profile.displayName,
      }).save();

      // If the user is a student we need to create a new student account
      if (!user.isProfessor) {
        await new Student({
          cruzid: user.cruzid,
          name: user.name,
          major: '',
          resume: '',
        })
          .save();
      } else {
        await new FacultyMember({ cruzid: user.cruzid, name: user.name })
          .save();
      }

      done(null, user);
    },
  ),
);
