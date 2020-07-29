const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// set Model
const userValidationSchema = require("./validation-schemas/userSchema");
const User = require("../models/User");

// @route  POST api/users/register
// @desc   Register new user
// @access Public
exports.registerUser = async (req, res, next) => {
  try {
    // validation
    const value = await userValidationSchema.validateAsync(req.body);

    const { name, email, password, repeat_password } = value;

    //Check for existing user
    User.findOne({ email }).then((user) => {
      if (user)
        return res.status(400).json({
          success: false,
          error: "User already exists",
        });
      const newUser = new User({
        name,
        email,
        password,
      });

      //Create salt and hash the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;

          //Create a new user
          newUser
            .save()
            .then((user) => {
              jwt.sign(
                {
                  id: user.id,
                },
                process.env.JWT_SECRET,
                { expiresIn: 7200 },
                (err, token) => {
                  if (err) throw err;

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                    },
                  });
                }
              );
            })
            .catch((error) => res.status(500).json({ succes: false, error }));
        });
      });
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      error: error.details[0].message,
    });
  }
};

// @route  POST api/users/auth
// @desc   Auth user
// @access Public
exports.authUser = (req, res, next) => {
  const { email, password } = req.body;

  //Simple validation
  if (!email || !password)
    res.status(400).json({
      success: false,
      error: "Please fill all the fields in order to login",
    });

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user)
      return res.status(400).json({
        success: false,
        error: "User does not exists",
      });

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({
          success: false,
          error: "Invalid credentials",
        });
      jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
};

// @route  GET api/users/auth
// @desc   Get user data
// @access Private

exports.getUserData = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
};
