const driver = require("bigchaindb-driver");
const createKeys = require("./createKeys");

const limitedOfferDeploy = async (data) => {
    const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
    const nTokens = data.nTokens
    var result = {};
    const offer = {
    createdAt: new Date(),
    id: data.id,
    brandId: data.brandPublic,
    tokens: data.nTokens
  };

  const metaData = {
    description : "Offer from business1"
  };

  const tx = driver.Transaction.makeCreateTransaction(
    { offer },
    { metaData },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(data.brandPublic), nTokens.toString()
      ),
    ],
    data.brandPublic
  );

  const txSigned = driver.Transaction.signTransaction(tx, data.brandPrivate);

  await conn.postTransactionCommit(txSigned).then(
    (res) => {
      result = { status: "success", message: {text: "Offer created", id: res.id} };
    },
    (err) => {
      result = { status: "error", message: "Offer not created" };
    }
  );
  return result;
}

module.exports = { limitedOfferDeploy };