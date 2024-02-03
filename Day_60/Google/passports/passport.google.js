const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User, Provider } = require("../models/index");

module.exports = new GoogleStrategy(
  {
    clientID:
      "845678509370-2shsmckmg0jiipsg4uktrbqpuv24o8m6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://google-seven-gamma.vercel.app/auth/google/callback",
    scope: ["email", "profile"],
  },
  async (accessToken, refreshToken, profile, done) => {
    const { displayName: name, emails } = profile;
    // console.log(name, emails[0].value);
    const [provider] = await Provider.findOrCreate({
      where: { name: "google" },
      defaults: { name: "google" },
    });

    const [user] = await User.findOrCreate({
      where: { email: emails[0].value },
      defaults: {
        name,
        email: emails[0].value,
        provider_id: provider.id,
      },
    });
    done(null, user);
  }
);
