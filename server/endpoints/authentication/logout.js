function logout(app){
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}

module.exports = logout;