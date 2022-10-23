const driver = require("bigchaindb-driver");
const getTransaction = require("./getTransaction");
const createKeys = require("./createKeys");
const userId = require("./getUserId");

const redeemLpByUser = async (data) => {
    
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  const txID = data.txID
  const sender = data.userId2
  const receiver = data.brandId

 
  const meta = await conn.searchMetadata(txID)
  const tx = await getTransaction.getTransaction(meta[0].id);
const metadata = {
    assetId: data.txID,
    message: "Coupon redeemed by user",
    createdAt: new Date(),
  };

  const createTranfer = driver.Transaction.makeTransferTransaction(
    [
      {
        tx: tx,
        output_index: 0,
      },
    ],
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(receiver)
      ),
    ],
    metadata
  );

  const signedTX = driver.Transaction.signTransaction(
    createTranfer,
    sender
  );

await conn.postTransactionCommit(signedTX)
  .then(
    (res) => {

      result = { status: "success", data: {message: "Offer redeemed by user", id: res.id}};
    },
    (err) => {
      result = { status: "error", message: "offer could not be redeemed" };
    }
  );
  return result;
};

module.exports = { redeemLpByUser };