const userService = require("../../services/user.service");
const responses = require("../../helpers/response");
const { Device } = require("../../models/index");

module.exports = {
  getListUser: async (req, res, next) => {
    const { sort = "id", order = "asc", q, page = 1, limit } = req.query;
    const filter = {};
    if (q) {
      filter[Op.or] = {
        name: {
          [Op.iLike]: `%${q}%`,
        },
        email: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }
    const options = {
      order: [[sort, order]],
      attributes: { exclude: "password" },
      where: filter,
    };
    if (Number.isInteger(+limit) && Number.isInteger(+page)) {
      const offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }
    try {
      const { count, rows: users } = await userService.findAndCountAll(options);
      return responses.successResponse(res, 200, "Success", users, {
        count,
      });
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  getUser: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userService.findByPk(id, {
        attributes: { exclude: "password" },
        include: {
          model: Device,
          as: "devices",
        },
      });

      if (!user) {
        return responses.errorResponse(res, 404, "User not found");
      }
      return responses.successResponse(res, 200, "Success", {
        name: user.name,
        email: user.email,
        devices: user.devices,
      });
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  getProfile: async (req, res, next) => {
    const id = req.user.id;
    console.log(id);
    try {
      const user = await userService.findByPk(id, {
        attributes: { exclude: "password" },
        include: {
          model: Device,
          as: "devices",
        },
      });
      if (!user) {
        return responses.errorResponse(res, 404, "User not found");
      }
      return responses.successResponse(res, 200, "Success", user.dataValues);
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  update: async (req, res, next) => {
    const { id } = req.params;
    const method = req.method;
    if (req.body.name.length < 5) {
      return responses.errorResponse(res, 400, "Tên phải từ 5 ký tự");
    }
    //Validate
    try {
      if (method === "PATCH") {
        const user = await userService.update(
          {
            name: req.body.name,
          },
          {
            id,
          }
        );
        if (!user) {
          return responses.errorResponse(res, 404, "User not exist");
        }
        return responses.successResponse(res, 200, "Success");
      } else {
        return responses.errorResponse(res, 500, "Server Error");
      }
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    const confirm = await userService.delete({ id });
    if (confirm) {
      return responses.successResponse(res, 204, "Success");
    }
    return responses.errorResponse(res, 404, "User not exist");
  },
  deletes: async (req, res, next) => {
    let idList = req.body;
    if (!idList) {
      return responses.errorResponse(res, 400, "Bad request");
    }
    idList = Array.isArray(idList) ? idList : [idList];
    try {
      idList.forEach(async (id) => {
        await userService.delete({ id });
      });
      return responses.successResponse(res, 200, "Success");
    } catch (e) {
      return responses.errorResponse(res, 500, "Server Error");
    }
  },
};
