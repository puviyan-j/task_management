import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";
import userSchema from "../../model/usermodel/userschema.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exituser = await userSchema.findOne({ email: email });

    if (exituser) {
      return res.status(400).json({ error: "email is alread register" });
    }

    const hashpassword = await bcrypt.hash(password, 8);

    const data = new userSchema({
      name,
      email,
      password: hashpassword,
    });

    const save = await data.save();

    const token = jwt.sign({ id: save._id }, process.env.JWTKEY);

    res.json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email: email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWTKEY);
    res.json({ name: user.name, email: user.email, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getuser = async (req, res) => {
  try {
    const q = req.query.q;

    const keyword = q
      ? {
          $or: [
            { name: { $regex: q, $options: "i" } },
            { email: { $regex: q, $options: "i" } },
          ],
        }
      : {};

    const user = await userSchema
      .find(keyword)
      .find({ _id: { $ne: req.user._id } })
      .select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { signup, login, getuser };
