const driver = require("bigchaindb-driver");

const getOfferListBusiness = async (businessId) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  var result = {};

await conn.searchAssets(businessId).then(
      (res) => {
        if(res.length > 0){
      
        result = { status: "success", message: res };}
        else
      
        result = { status: "error", message: "No offers found" };
      },
      (err) => {
        
        result = { status: "error", message: "No offers found" };
      }
    );


  return result;
};

//get userId to get all transactions done by the user.
module.exports = { getOfferListBusiness };