const SamlStrategy = require("passport-saml").Strategy;
const fs = require("fs");

const config = {
  strategy: "saml",
  saml: {
    path: "/login/callback",
    entryPoint:
      "https://ssourl/auth/realms/lahuman/protocol/saml/clients/saml-test",
    issuer: "saml-test",
    privateCert: fs.readFileSync("path/client-private-key.pem", "utf-8"),
    signatureAlgorithm: "sha256",
  },
};

const init = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new SamlStrategy(
      {
        path: config.saml.path,
        entryPoint: config.saml.entryPoint,
        issuer: config.saml.issuer,
        privateCert: config.saml.privateCert,
        signatureAlgorithm: config.saml.signatureAlgorithm,
      },
      function (profile, done) {
        console.log(profile);
        return done(null, {
          id: profile.nameID,
          email: profile.email,
        });
      }
    )
  );
};

module.exports = {
  init,
  config,
};
