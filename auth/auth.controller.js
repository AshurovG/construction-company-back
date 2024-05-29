const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

class AuthController {
  async login(req, res) {
    try {
      const { password } = req.body;
      if (bcrypt.compareSync(password, process.env.STORED_HASH)) {
        res.status(200).json({
          message: "Authentication successful",
          token: process.env.JWT_TOKEN,
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.toString() });
    }
  }

  async check(req, res) {
    console.log("aaauuttth");
    try {
      const { token } = req.body;
      if (token === tokenG) {
        res.status(200).json({ message: "success" });
      } else {
        res.status(401).json({ message: "Invalid JWT" });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.toString() });
    }
  }
}

module.exports = new AuthController();
