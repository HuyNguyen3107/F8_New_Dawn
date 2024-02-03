module.exports = {
  logout: (req, res) => {
    req.logout((error) => {
      if (!error) {
        return res.redirect("/auth/login");
      }
    });
  },
};
