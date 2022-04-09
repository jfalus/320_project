function login(app, passport){
  app.post('/api/login',
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/',
    })
    // }),
    // function(req, res) {
    //   console.log(req)
    // }
  );
}

module.exports = login;