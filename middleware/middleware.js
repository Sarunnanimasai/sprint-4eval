const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, "mytoken", (err, decoded) => {
    if (err) {
      res.send({ msg: "Please Login First" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { Auth };
