const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const users = require("../controllers/users");

const router = express.Router();

router
  .route("/register")
  .get(users.renderRegister)
  .post(wrapAsync(users.register));

router
  .route("/login")
  .get(users.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.login
  );

router.get("/logout", users.logout);

module.exports = router;

// app.get("/fakeuser", async (req, res) => {
//   const user = new User({
//     email: "streetboyOT@gmail.com",
//     username: "DoughnutBoy",
//   });
//   const newUser = await User.register(user, "toughguy");
//   res.send(newUser);
// });
