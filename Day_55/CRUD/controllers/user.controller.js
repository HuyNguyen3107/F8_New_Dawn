const userModel = require("../models/user");
const { string } = require("yup");

module.exports = {
  index: async (req, res, next) => {
    try {
      const { status, keyword } = req.query;
      const users = await userModel.all(status, keyword);
      const msg = req.flash("msg-success");
      res.render("users/index", {
        users,
        msg,
      });
    } catch (e) {
      return next(e);
    }
  },
  add: (req, res, next) => {
    res.render("users/add", { req });
  },
  handleAdd: async (req, res, next) => {
    const rule = {
      name: string()
        .min(5, "Tên phải từ năm ký tự")
        .required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("validate-emailExist", "Email đã tồn tại", async (value) => {
          const arr = await userModel.isEmailExist(value);
          if (arr?.length) {
            return false;
          }
          return true;
        }),
      password: string()
        .test(
          "validate-password",
          "Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt :))",
          (value) => {
            const pattern =
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return pattern.test(value);
          }
        )
        .required("Mật khẩu bắt buộc phải nhập"),
      status: string()
        .required()
        .test("validate-status", "Trạng thái không hợp lệ", (value) => {
          return +value === 1 || +value === 0;
        }),
    };

    const body = await req.validate(req.body, rule);
    if (body) {
      await userModel.addUser(body);
      req.flash("msg-success", "Thêm người dùng thành công");
      return res.redirect("/users");
    }

    return res.redirect("/users/add");
  },
  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userModel.getUser(id);
      if (!user?.length) {
        throw new Error("Hông có user này nghen");
      }
      user[0].status = user[0].status ? 1 : 0;
      req.olds = user[0];
      res.render("users/edit", { req });
    } catch (e) {
      return next(e);
    }
  },
  handleEdit: async (req, res, next) => {
    const { id } = req.params;
    const rule = {
      name: string()
        .min(5, "Tên phải từ năm ký tự")
        .required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("validate-emailExist", "Email không tồn tại", async (value) => {
          const arr = await userModel.isEmailExist(value);
          if (arr?.length) {
            return true;
          }
          return false;
        }),
      password: string()
        .test(
          "validate-password",
          "Tối thiểu tám ký tự, ít nhất một chữ cái, một số và một ký tự đặc biệt :))",
          (value) => {
            const pattern =
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return pattern.test(value);
          }
        )
        .required("Mật khẩu bắt buộc phải nhập"),
      status: string()
        .required()
        .test("validate-status", "Trạng thái không hợp lệ", (value) => {
          return +value === 1 || +value === 0;
        }),
    };

    const body = await req.validate(req.body, rule);
    if (body) {
      await userModel.updateUser(body, id);
      req.flash("msg-success", "Cập nhật người dùng thành công");
      return res.redirect("/users");
    }

    return res.redirect("/users/edit/" + id);
  },
  handleDelete: async (req, res, next) => {
    const { id } = req.params;
    await userModel.delete(id);
    req.flash("msg-success", "Xóa người dùng thành công");
    return res.redirect("/users");
  },
};
