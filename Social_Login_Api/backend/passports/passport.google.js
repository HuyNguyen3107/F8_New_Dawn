const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = new GoogleStrategy(
  {
    clientID:
      "338343787360-7nnohf300asn9vku38oilij4vnl55q6s.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: `https://frontend-kappa-sandy.vercel.app/auth/google/callback`,
    passReqToCallback: true,
    scope: ["email", "profile"],
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const dataSave = {
      provider: profile?.provider,
      name: profile?.displayName,
      email: profile?.emails[0].value,
      thumbnail: profile?._json?.picture,
    };
    return done(null, dataSave);
  }
);
