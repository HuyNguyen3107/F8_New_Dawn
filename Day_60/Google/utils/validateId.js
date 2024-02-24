const { Link } = require("../models/index");

module.exports = (id) => {
  if (id.length !== 6) {
    return "Id của liên kết phải có 6 ký tự";
  }
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let character of id) {
    if (!characters.includes(character)) {
      return "Id của liên kết chỉ chứa chữ in thường, chữ in hoa hoặc số";
    }
  }
  return true;
};
