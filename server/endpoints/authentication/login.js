function login(app, passport){
  app.post('/api/login',
  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
          res.status(401);
          res.end(info.message);
          return;
      }
      res.redirect("/home")
    })(req, res, next);
  })
}

module.exports = login;