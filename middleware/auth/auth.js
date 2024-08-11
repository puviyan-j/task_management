import jwt from "jsonwebtoken";
import userSchema from "../../model/usermodel/userschema.js";

const auth = async (req, res, next) => {
  try {
    const encrypt_token = req.headers.token;

    if (!encrypt_token) {
      res.status(400).send({ error: "token not valid" });
    }

    const token = jwt.verify(encrypt_token, process.env.JWTKEY);

    const user = await userSchema
      .findOne({ _id: token.id })
      .select("-password");
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default auth;
