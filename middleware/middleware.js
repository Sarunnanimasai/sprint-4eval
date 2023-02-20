const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "mytoken", (err, decoded) => {
    if (decoded) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.send({ msg: "Please Login First" });
    }
  });
};

module.exports = { Auth };
