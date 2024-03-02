const jwt = require("jsonwebtoken");
// const { JWT_SECRET, JWT_ACCESS_TOKEN_EXPIRE, JWT_REFRESH_TOKEN_EXPIRE } =
//   process.env;
module.exports = {
  createAccessToken: (data = {}) => {
    try {
      return jwt.sign(
        data,
        "1fd81f86e331a17baaa7ff233ff36d2d7278c1c07c828cd8e23ce7b85fb701d0",
        {
          expiresIn: "24h",
        }
      );
    } catch {
      return false;
    }
  },
  createRefreshToken: () => {
    try {
      return jwt.sign(
        {
          value: Math.random() + new Date().getTime(),
        },
        "1fd81f86e331a17baaa7ff233ff36d2d7278c1c07c828cd8e23ce7b85fb701d0",
        {
          expiresIn: "168h",
        }
      );
    } catch {
      return false;
    }
  },
  verifyToken: (token) => {
    try {
      return jwt.decode(
        token,
        "1fd81f86e331a17baaa7ff233ff36d2d7278c1c07c828cd8e23ce7b85fb701d0"
      );
    } catch {
      return false;
    }
  },
};
