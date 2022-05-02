function logout(app){
  app.delete('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}

module.exports = logout;