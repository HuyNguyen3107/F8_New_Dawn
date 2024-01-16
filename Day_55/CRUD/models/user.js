const sql = require("../utils/db");

module.exports = {
  all: (status, keyword) => {
    let filter = sql`WHERE name IS NOT NULL`;
    if (status === "active" || status === "inactive") {
      filter = sql`${filter} AND status=${status === "active"}`;
    }
    if (keyword) {
      filter = sql`${filter} AND (name ILIKE ${
        "%" + keyword + "%"
      } OR email ILIKE ${"%" + keyword + "%"})`;
    }

    return sql`SELECT * FROM users ${filter} ORDER BY id DESC`;
  },
  isEmailExist: (email) => {
    return sql`SELECT id FROM users WHERE email=${email}`;
  },
  addUser: (data) => {
    const status = +data.status === 1;
    return sql`
      INSERT INTO users(name, email, password, status)
      VALUES (${data.name}, ${data.email}, ${data.password}, ${status})
    `;
  },
  getUser: (id) => {
    return sql`SELECT name, email, password, status FROM users WHERE id=${id}`;
  },
  updateUser: (data, id) => {
    const status = +data.status === 1;
    return sql`
      UPDATE users
      SET name=${data.name}, email=${data.email}, password=${data.password}, status=${status}, updated_at=NOW()
      WHERE id=${id}
    `;
  },
  delete: (id) => {
    return sql`
      DELETE FROM users WHERE id=${id}
    `;
  },
};
