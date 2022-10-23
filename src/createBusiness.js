const driver = require("bigchaindb-driver");
const createKeys = require("./createKeys");

const createBusiness = async (data) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  const businessExists = await conn.searchAssets(data.number);
  
  if (businessExists.length != 0) {
    return { status: "error", message: "Business already exists" };
  }
  
  //code for business creation
  var result = {};
  const business = {
    createdAt: new Date(),
    id: data.id,
    email: data.email,
    name: data.name,
    number: data.number,
    pin: data.pin,
  };

  const metaData = {
    tpin: `${data.number}TPin`,
    pin: data.pin,
    // have to setup user-settings
  };

  const newBusiness = await createKeys.createKeys(data.number);

  const tx = driver.Transaction.makeCreateTransaction(
    { business },
    { metaData },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(newBusiness.publicKey)
      ),
    ],
    newBusiness.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(tx, newBusiness.privateKey);

  await conn.postTransactionCommit(txSigned).then(
    (res) => {
      result = { status: "success", message: {publickey: newBusiness.publicKey, privateKey: newBusiness.privateKey } };
    },
    (err) => {
      result = { status: "error", message: "Business not created" };
    }
  );
  return result;
};

module.exports = { createBusiness };