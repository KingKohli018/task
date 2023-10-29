const usermodel = require("../model/user");
const bcrypt = require("bcrypt");
const key = process.env.Secret_key;
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = await usermodel.findOne({ email: email});

    if (user) {
      res.send({ status: false, message: "User allready exist" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const register = await usermodel.create({
      email: email,
      password: hash,
      username: username,
    });

    res.send({
      status: true,
      message: "user register successfully",
      userdata: register,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: "Something went wrong!!" });
  }
};


//user login ....................................

exports.userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usermodel.findOne({ email: email });
        if (!user) {
            res.send({ status: false, message: "User not found" })
            return
        }
        const ismamtch = await bcrypt.compare(password, user.password);
        if (ismamtch) {

            const token = await jwt.sign({ id: user._id, email: user.email }, key, {
                expiresIn: "1d",
            });

            user.fcm_token = req.body.fcm_token
            await user.save()
            const data = {
                id: user._id,
                username: user.username,
                email: user.email,
            };
            res.set({
                token: token,
            });
            res.send({
                status: true,
                message: "user login Successfull",
                userdata: data,
                token: token,
            });

        } else {
            res.send({ status: false, message: "password dont matched" })
            return
        }
    } catch (err) {
        console.log(err)
        res.send(err);
    }
}