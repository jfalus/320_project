function login(app, passport){
  app.post('/api/login',
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/',
    })
  );
}

module.exports = login;