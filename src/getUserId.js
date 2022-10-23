const driver = require("bigchaindb-driver");

const getUserId = async (numberString) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};
  var user = "";
  await conn.searchAssets(numberString).then(
    (res) => {
      if (res.length == 0) {
        result = { status: "error", message: "User not found" };
      } else {
        res.forEach((element) => {
          if (element.data.user != undefined) {
            user = element.data.user;
            result = { status: "success", user: user };
          }
        });
      }
    },
    (err) => {
      result = { status: "error", message: "User not found" };
    }
  );

  return result;
};

//get userId to get all transactions done by the user.
module.exports = { getUserId };