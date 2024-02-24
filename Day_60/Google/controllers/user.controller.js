const { User, Role } = require("../models/index");
const { where, json } = require("sequelize");
const { Op } = require("sequelize");

module.exports = {
  index: async function (req, res, next) {
    const users = await User.findAll();
    res.render("users/index", {
      users,
      req,
    });
  },
  permission: async (req, res, next) => {
    const { id } = req.params;
    const msgSuccess = req.flash("msgSuccess");
    const user = await User.findOne({
      order: [["id", "asc"]],
      where: {
        id,
      },
      include: {
        model: Role,
        as: "roles",
      },
    });
    const roles = await Role.findAll();
    const userRoles = user.roles.map((role) => role.id);
    res.render("users/permission", {
      roles,
      userRoles,
      msgSuccess,
      req,
    });
  },
  handlePermission: async (req, res, next) => {
    const { id } = req.params;
    if (!req.body.roles) {
      req.body.roles = [];
    }
    const roles = Array.isArray(req.body.roles)
      ? req.body.roles
      : [req.body.roles];

    const user = await User.findByPk(id);
    if (user) {
      const roleInstances = await Promise.all(
        roles.map(async (roleId) => await Role.findByPk(roleId))
      );
      await user.setRoles(roleInstances);
      req.flash("msgSuccess", "Phân quyền thành công");
    }
    return res.redirect("/users/permission/" + id);
  },
};
