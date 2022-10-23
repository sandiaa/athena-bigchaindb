
const driver = require("bigchaindb-driver");
const createKeys = require("./createKeys");
const getUserId = require("./getUserId");
const assignFileToUser = require("./assignFileToUser");
const createNewFileTransfer = async (data) => {
  //code for create transaction
  const conn = new driver.Connection("https://test.ipdb.io/api/v1/");
  // const senderId = await getUserId.getUserId(data.sender);
  // const receiverId = await getUserId.getUserId(data.receiver);
  const newTransaction = {
    id: data.id,
    sender: data.sender,
    receiver:data.receiver,
    createdAt: new Date(),
    fileHash: data.fileHash,
    fileLink: data.fileLink,
    fileName: data.fileName
  };

  const transactionMetadata = {
   fileStatus : "UPLOADED",
   timeStamp: new Date(),
   
  };



  const senderKeys = await createKeys.createKeys(data.sender);
  const receiverKeys = await createKeys.createKeys(data.receiver);

  const tx = driver.Transaction.makeCreateTransaction(
    { newTransaction },
    { transactionMetadata },
    [
      driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(receiverKeys.publicKey)
      ),
    ],
    senderKeys.publicKey
  );
  const txSigned = driver.Transaction.signTransaction(
    tx,
    senderKeys.privateKey
  );
  var result = {};
  
  await conn.postTransactionCommit(txSigned).then(
    (res) => {
      result = { status: "success", id: res.id };
    },
    (err) => {
      result = { status: "error", message: "Transaction not created" };
    }
  );
  // if (result.status == "success") {
  //   await assignFileToUser
  //     .assignFileToUser(result.id, senderKeys.privateKey, receiverKeys.publicKey)
  //     .then(
  //       (res) => {
  //         result = { status: "success", data: "Transaction created" };
  //       },
  //       (err) => {
  //         result = { status: "error", message: "Transaction not created" };
  //       }
  //     );
  // }
  return result;
};

module.exports = { createNewFileTransfer };