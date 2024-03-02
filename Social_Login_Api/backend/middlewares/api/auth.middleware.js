const { verifyToken } = require("../../utils/jwt");
const { errorResponse } = require("../../helpers/response");
const blacklistService = require("../../services/blacklist.service");
const userService = require("../../services/user.service");
const { Device } = require("../../models/index");
module.exports = async (req, res, next) => {
  const accessToken = req.get("Authorization")?.split(" ").slice(-1).join();
  const blacklist = await blacklistService.findOne(accessToken);
  if (blacklist) {
    return errorResponse(res, 401, "Unauthorize");
  }
  const decoded = verifyToken(accessToken);
  if (!decoded) {
    return errorResponse(res, 401, "Unauthorize");
  }
  const userId = decoded.userId;
  const exp = decoded.exp;
  const user = await userService.findOne(
    {
      id: userId,
    },
    {
      model: Device,
      as: "devices",
    },
    { exclude: ["password"] }
  );
  const checkDevice = user.devices.find((device) => {
    return device.user_agent === req.get("user-agent");
    // return (
    //   device.user_agent ===
    //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    // );
  });
  if (!user || user.status === "inactive" || !checkDevice.status) {
    return errorResponse(res, 401, "Unauthorize");
  }
  req.user = {
    accessToken,
    exp,
    ...user.dataValues,
  };
  return next();
};
