const { Strategy } = require("passport-github2");

const GithubPassport = new Strategy(
  {
    clientID: "7010fef90cb669bfd643",
    clientSecret: "863b337dbf60b70544255368bcd198a3af6129de",
    callbackURL: `http://localhost:3001/auth/github/callback`,
    passReqToCallback: true,
    scope: ["profile", "user:email"],
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const dataSave = {
      provider: profile?.provider,
      name: profile?.displayName,
      email: profile?.emails[0]?.value,
      thumbnail: profile?._json?.avatar_url,
    };
    return done(null, dataSave);
  }
);

module.exports = GithubPassport;
