const passport = require('passport');
const {Strategy: GoogleStrategy} = require('passport-google-oauth2');
require('dotenv').config();
const {pool} = require('./dbConfig')

authUser = (request, accessToken,refreshToken, profile,done)=>{
    const account = profile;
    console.log(account)
    const  currentUser =  pool.query(`SELECT * FROM "Users" where google_id = $1`,[account.sub]);
    console.log(currentUser);
    return done(null, profile);
}

passport.use(new GoogleStrategy ({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
},authUser));



// The "user" is the authenticated user object, that is passed from the authUser() function in "Google Strategy".
// This "user" object is attached to 
// "req.session.passport.user.{user}"
passport.serializeUser( (user, done) => {
    done(null, user)
 });

passport.deserializeUser((user, done) => {
done (null, user)
})
