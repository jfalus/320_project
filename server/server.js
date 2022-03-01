const app = require('./index');
const port = 3000
const passport = require('passport')
const LocalStrategy = require('passport-local').LocalStrategy

const session = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

//strategy for authentication
const strategy = new LocalStrategy(
  async (email, password, done) => {
    //add function to find a user
    const user = await findUser(db, email);
    if (user.length === 0) {
      return done(null, false, { message: 'Wrong email' });
    }
    //add function to check credentials
    if (!checkCred(email, password)) {
      await new Promise((r) => setTimeout(r, 1000));
      return done(null, false, { message: 'Wrong password' });
    }
    return done(null, email);
  },
);

//initalize the session
app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

// Allow JSON inputs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

app.post('/login',
  passport.authenticate('local', {
    //placeholders for redirects
    successRedirect: '/home',
    failureRedirect: '/',
  })
);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })