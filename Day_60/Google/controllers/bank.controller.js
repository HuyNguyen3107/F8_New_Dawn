const path = require("path");

module.exports = {
  index: async (req, res) => {
    const options = {
      root: path.join(__dirname) + "/../public/images",
    };

    const fileName = "qrcode.jpg";
    res.set("Content-type", "image/jpg");
    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.error("Error sending file:", err);
      } else {
        console.log("Sent:", fileName);
      }
    });
  },
};
