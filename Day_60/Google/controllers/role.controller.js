const { string } = require("yup");
const { Op, where } = require("sequelize");
const { User, Permission, Role } = require("../models/index");

module.exports = {
  index: async (req, res, next) => {
    const roles = await Role.findAll({
      order: [["id", "asc"]],
    });
    res.render("roles/index", {
      roles,
    });
  },
  add: (req, res, next) => {
    const successMsg = req.flash("msgSuccess");
    res.render("roles/add", {
      req,
      successMsg,
    });
  },
  handleAdd: async (req, res, next) => {
    let { name, permissions } = req.body;
    const rule = {
      name: string()
        .min(5, "Tên phải từ năm ký tự")
        .required("Tên bắt buộc phải nhập"),
    };

    const validName = await req.validate(req.body, rule);
    if (validName) {
      if (!permissions) {
        permissions = [];
      }
      permissions = Array.isArray(permissions) ? permissions : [permissions];
      const [role] = await Role.findOrCreate({
        where: {
          name: name,
        },
        default: {
          name: name,
        },
      });
      if (permissions.length) {
        const permissionInstances = await Promise.all(
          permissions.map(async (value) => {
            const [permissionInstance] = await Permission.findOrCreate({
              where: {
                value: value.trim(),
              },
              default: {
                value: value.trim(),
              },
            });
            return permissionInstance;
          })
        );
        await role.addPermissions(permissionInstances);
        req.flash("msgSuccess", "Thêm vai trò thành công");
      }
    }

    return res.redirect("/roles/add");
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    const successMsg = req.flash("msgSuccess");
    const role = await Role.findByPk(id, {
      include: {
        model: Permission,
        as: "permissions",
      },
    });
    const permissions = role.permissions.map((permission) => {
      return permission.value;
    });

    const roles = await Role.findAll();

    res.render("roles/edit", {
      req,
      successMsg,
      role,
      permissions,
      roles,
    });
  },
  handleEdit: async (req, res, next) => {
    const { id } = req.params;
    if (req.body.role) {
      return res.redirect("/roles/edit/" + req.body.role);
    } else {
      let { name, permissions } = req.body;
      const rule = {
        name: string()
          .min(5, "Tên phải từ năm ký tự")
          .required("Tên bắt buộc phải nhập"),
      };

      const validName = await req.validate(req.body, rule);
      if (validName) {
        if (!permissions) {
          permissions = [];
        }
        permissions = Array.isArray(permissions) ? permissions : [permissions];
        await Role.update({ name }, { where: { id } });
        const role = await Role.findByPk(id);
        if (permissions.length) {
          const permissionInstances = await Promise.all(
            permissions.map(async (value) => {
              const [permissionInstance] = await Permission.findOrCreate({
                where: {
                  value: value.trim(),
                },
                default: {
                  value: value.trim(),
                },
              });
              return permissionInstance;
            })
          );
          await role.setPermissions(permissionInstances);
          req.flash("msgSuccess", "Sửa vai trò thành công");
        }
      }
    }
    return res.redirect("/roles/edit/" + id);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const role = await Role.findByPk(id, {
      include: [
        {
          model: Permission,
          as: "permissions",
        },
        {
          model: User,
          as: "users",
        },
      ],
    });
    await role.removePermissions(role.permissions);
    await role.removeUsers(role.users);
    await role.destroy();
    return res.redirect("/roles");
  },
};
