const randomId = require("../utils/randomId");
const { Link } = require("../models/index");

module.exports = async () => {
  let shortened_link;
  let linkExist;
  while (linkExist !== null) {
    shortened_link = `https://google-seven-gamma.vercel.app/short/${randomId(
      6
    )}`;
    linkExist = await Link.findOne({
      where: {
        shortened_link,
      },
    });
  }
  return shortened_link;
};
