const driver = require("bigchaindb-driver");
const createKeys = require("./createKeys");

const createUser = async (data) => {
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");

  const userExists = await conn.searchAssets(data.id);
  
  if (userExists.length != 0) {
    return { status: "error", message: "User already exists" };
  }
  //code for business creation
  var result = {};
  const user = {
    createdAt: new Date(),
    id: data.id,
    email: data.email,
    name: data.name,
    pin: data.pin,
  };

  const metaData = {
    tpin: `${data.id}TPin`,
    pin: data.pin,
    // have to setup user-settings
  };

  const newUser = await createKeys.createKeys(data.id);

  const tx = driver.Transaction.makeCreateTransaction(
    { user },
    { metaData },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(newUser.publicKey)
      ),
    ],
    newUser.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(tx, newUser.privateKey);

  await conn.postTransactionCommit(txSigned).then(
    (res) => {
      result = { status: "success", message: {publickey: newUser.publicKey, privateKey: newUser.privateKey } };
    },
    (err) => {
      result = { status: "error", message: "User not created" };
    }
  );
  return result;
};

module.exports = { createUser };