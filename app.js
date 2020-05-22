/* eslint-disable no-undef */
"use strict";
global.__basedir = __dirname;
require("dotenv").config();

const SwaggerExpress = require("swagger-express-mw");
const SwaggerUi = require("swagger-tools/middleware/swagger-ui");
const app = require("express")();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
require("./lib/passport").init(passport);

const winston = require("./config/winston");
const passportConfig = require("./lib/passport").config;
module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

app.use(
  require("express-session")({
    secret: "keyboard cat",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Remember to set this
  })
);

app.set("trust proxy", 1); // trust first proxy

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  //loggin 처리
  app.use((req, res, next) => {
    if (req.originalUrl.indexOf("/api/") === 0) {
      if (req.originalUrl.indexOf("/api/loginCallback") === 0) {
        next();
        return;
      }
      if (req.isAuthenticated()) {
        res.status(403).end();
        return;
      }
    }
    next();
  });

  app.use(
    "/api/loginCallback",
    passport.authenticate(passportConfig.strategy, {
      failureRedirect: "/",
      failureFlash: true,
    }),
    (req, res, next) => {
      res.redirect("/auth/loginCheck");
    }
  );

  // Dynamic swagger host
  swaggerExpress.runner.swagger.host = process.env.HOST;
  app.use(helmet());
  app.use(morgan("combined", { stream: winston.stream }));

  const options = {
    apiDocs: "/api/api-docs",
    swaggerUi: "/api/docs",
  };
  // enable SwaggerUI
  app.use(SwaggerUi(swaggerExpress.runner.swagger, options));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // add this line to include winston logging
    winston.error(
      `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
        req.method
      } - ${req.ip}`
    );

    // render the error page
    res.status(err.status || 500);
    res.json(err);
  });

  if (swaggerExpress.runner.swagger.paths["/hello"]) {
    console.log(
      "try this:\ncurl http://127.0.0.1:" + port + "/hello?name=Scott"
    );
  }
});
