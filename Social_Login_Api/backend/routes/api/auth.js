var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const md5 = require("md5");
const { string } = require("yup");
const { ServerResponse } = require("http");
const passport = require("passport");
// const authController = require("../../controllers/api/auth.controller");
const userService = require("../../services/user.service");
const providerService = require("../../services/provider.service");
const deviceService = require("../../services/device.service");
const userTokenService = require("../../services/userToken.service");
const blacklistService = require("../../services/blacklist.service");
const responses = require("../../helpers/response");
const sendMail = require("../../utils/mail");
const DeviceDetector = require("device-detector-js");
const deviceDetector = new DeviceDetector();
const { Device } = require("../../models/index");
const { where } = require("sequelize");
const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../../utils/jwt");

router.get("/google", (req, res) => {
  const emptyResponse = new ServerResponse(req);
  passport.authenticate(
    "google",
    {
      scope: ["email", "profile"],
    },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");
  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  async (req, res) => {
    try {
      // Lấy data user
      const data = req.user;
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Bad request",
        });
      }
      // Nếu email đã có tài khoản thì đăng nhập tài khoản đó, nếu email chưa có tài khoản thì tạo tài khoản mới với email đó
      const user = await userService.findOne({ email: data.email });
      const provider = await providerService.findOne(data.provider);
      if (!user) {
        if (provider) {
          await userService.add(data.name, data.email, null, provider.id);
        } else {
          const googleProvider = await providerService.add(data.provider);
          await userService.add(data.name, data.email, null, googleProvider.id);
        }
      } else {
        if (provider) {
          await userService.update(
            {
              name: data.name,
              provider_id: provider.id,
            },
            {
              email: data.email,
            }
          );
        } else {
          const googleProvider = await providerService.add(data.provider);
          await userService.update(
            {
              name: data.name,
              provider_id: googleProvider.id,
            },
            {
              email: data.email,
            }
          );
        }
      }

      // const verifyCode = randomCode();
      // const subject = `Here is your verify code`;
      // const message = `<h3>${verifyCode}</h3>`;
      // const check2FA = await sendMail(data.email, subject, message);
      // if (check2FA) {
      //   req.flash("userEmail", data.email);
      //   req.flash("verifyCode", verifyCode);
      //   return responses.successResponse(res, 200, "Send email success");
      // }
      const userUpdated = await userService.findOne(
        {
          email: data.email,
        },
        {
          model: Device,
          as: "devices",
        }
      );
      const userAgent = req.get("user-agent");
      const device = deviceDetector.parse(userAgent);
      const checkDevice = userUpdated.devices.find((device) => {
        return device.user_agent === req.get("user-agent");
        // return (
        //   device.user_agent ===
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        // );
      });
      if (checkDevice) {
        const devicesId = userUpdated.devices.map((device) => device.id);
        devicesId.forEach(async (id) => {
          if (id === checkDevice.id) {
            await deviceService.update(
              {
                status: true,
              },
              {
                id,
              }
            );
          } else {
            await deviceService.update(
              {
                status: false,
              },
              {
                id,
              }
            );
          }
        });
      } else {
        const devicesId = userUpdated.devices.map((device) => device.id);
        devicesId.forEach(async (id) => {
          await deviceService.update(
            {
              status: false,
            },
            {
              id,
            }
          );
        });
        const deviceInstance = await deviceService.add(
          device.client.name,
          device.os.name,
          device.device.type,
          true,
          req.get("user-agent")
        );
        // const deviceInstance = await deviceService.add(
        //   "Chrome",
        //   "Windows",
        //   "desktop",
        //   true,
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        // );
        await userUpdated.addDevices(deviceInstance);
      }
      const accessToken = createAccessToken({
        userId: userUpdated.id,
        userName: userUpdated.name,
        userEmail: userUpdated.email,
      });
      const refreshToken = createRefreshToken();
      await userTokenService.add(refreshToken, userUpdated.id);
      if (!accessToken) {
        return responses.errorResponse(res, 500, "Server Error");
      }
      return responses.successResponse(res, 200, "Verify success", {
        id: userUpdated.id,
        name: userUpdated.name,
        email: userUpdated.email,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      console.log(e);
      return responses.errorResponse(res, 500, "Server Error");
    }
  }
);

router.get("/github", (req, res) => {
  const emptyResponse = new ServerResponse(req);

  passport.authenticate(
    "github",
    { scope: ["user:email"] },
    (err, user, info) => {
      console.log(err, user, info);
    }
  )(req, emptyResponse);

  const url = emptyResponse.getHeader("location");

  return res.status(200).json({
    status: 200,
    message: "Thành công",
    result: {
      urlRedirect: url,
    },
  });
});
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
  }),
  async (req, res) => {
    // Lấy data user
    try {
      const data = req.user;
      if (!data) {
        return res.status(400).json({
          status: 400,
          message: "Bad request",
        });
      }
      // Nếu email đã có tài khoản thì đăng nhập tài khoản đó, nếu email chưa có tài khoản thì tạo tài khoản mới với email đó
      const user = await userService.findOne({ email: data.email });
      const provider = await providerService.findOne(data.provider);
      if (!user) {
        if (provider) {
          await userService.add(data.name, data.email, null, provider.id);
        } else {
          const githubProvider = await providerService.add(data.provider);
          await userService.add(data.name, data.email, null, githubProvider.id);
        }
      } else {
        if (provider) {
          await userService.update(
            {
              name: data.name,
              provider_id: provider.id,
            },
            {
              email: data.email,
            }
          );
        } else {
          const githubProvider = await providerService.add(data.provider);
          await userService.update(
            {
              name: data.name,
              provider_id: githubProvider.id,
            },
            {
              email: data.email,
            }
          );
        }
      }

      // const verifyCode = randomCode();
      // const subject = `Here is your verify code`;
      // const message = `<h3>${verifyCode}</h3>`;
      // const check2FA = await sendMail(data.email, subject, message);
      // if (check2FA) {
      //   req.flash("userEmail", data.email);
      //   req.flash("verifyCode", verifyCode);
      //   return responses.successResponse(res, 200, "Send email success");
      // }
      const userUpdated = await userService.findOne(
        {
          email: data.email,
        },
        {
          model: Device,
          as: "devices",
        }
      );
      const userAgent = req.get("user-agent");
      const device = deviceDetector.parse(userAgent);
      const checkDevice = userUpdated.devices.find((device) => {
        return device.user_agent === req.get("user-agent");
        // return (
        //   device.user_agent ===
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        // );
      });
      if (checkDevice) {
        const devicesId = userUpdated.devices.map((device) => device.id);
        devicesId.forEach(async (id) => {
          if (id === checkDevice.id) {
            await deviceService.update(
              {
                status: true,
              },
              {
                id,
              }
            );
          } else {
            await deviceService.update(
              {
                status: false,
              },
              {
                id,
              }
            );
          }
        });
      } else {
        const devicesId = userUpdated.devices.map((device) => device.id);
        devicesId.forEach(async (id) => {
          await deviceService.update(
            {
              status: false,
            },
            {
              id,
            }
          );
        });
        const deviceInstance = await deviceService.add(
          device.client.name,
          device.os.name,
          device.device.type,
          true,
          req.get("user-agent")
        );
        // const deviceInstance = await deviceService.add(
        //   "Chrome",
        //   "Windows",
        //   "desktop",
        //   true,
        //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        // );
        await userUpdated.addDevices(deviceInstance);
      }
      const accessToken = createAccessToken({
        userId: userUpdated.id,
        userName: userUpdated.name,
        userEmail: userUpdated.email,
      });
      const refreshToken = createRefreshToken();
      await userTokenService.add(refreshToken, userUpdated.id);
      if (!accessToken) {
        return responses.errorResponse(res, 500, "Server Error");
      }
      return responses.successResponse(res, 200, "Verify success", {
        id: userUpdated.id,
        name: userUpdated.name,
        email: userUpdated.email,
        accessToken,
        refreshToken,
      });
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  }
);

module.exports = router;
