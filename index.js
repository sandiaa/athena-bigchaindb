var express = require("express");
var app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
var cors = require('cors')

var createBusiness = require("./src/createBusiness")
var createUser = require("./src/createUser")
var createNewFileTransfer = require("./src/createNewFileTransfer")
var getFilesList = require("./src/getFilesList")
var redeemLpByUser = require("./src/redeemLpByUser")
var limitedOfferDeploy = require("./src/limitedOfferDeploy")
var getOfferListBusiness = require("./src/getOfferListBusiness")
var getTxDetails = require("./src/getTxDetails");
var getTransaction = require("./src/getTransaction")

app.post("/createBusiness", async function (req, res) {

    const data = {
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
      pin: req.body.pin,
    };
    const result = await createBusiness.createBusiness(data);
  
    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  });

  app.post("/createUser", async function (req, res) {

    const data = {
      id: req.body.id,
      email: req.body.email,
      name: req.body.name,
      number: req.body.number,
      pin: req.body.pin,
    };
    const result = await createUser.createUser(data);
  
    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  });

  app.post("/createNewFileTransfer", async function (req, res) {
   
    const data = {
      id: req.body.id,
      sender: req.body.sender,
      receiver: req.body.receiver,
      fileHash: req.body.fileHash,
      fileLink: req.body.fileLink,
      fileName: req.body.fileName
    };
    const result = await createNewFileTransfer.createNewFileTransfer(data);
 
    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  });

  app.post("/redeemLpByUser", async function (req, res) {

    const data = {
        txID:req.body.txID,
        userId1: req.body.userId1,
        userId2: req.body.userId2,
        brandId: req.body.brandId
    };
    const result = await redeemLpByUser.redeemLpByUser(data);
 
    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  });

  app.get("/getFilesList", async function (req, res) {
    var result = await getFilesList.getFilesList(req.query.id);

    if (result.status === "success") {
      res.status(200).send(result.message);
    } else {
      res.status(404).send("No offers found");
    }
  });

  app.get("/getTxDetails", async function (req, res) {
    var result = await getTxDetails.getTxDetails(req.query.id);

    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send("No tx found");
    }
  });
  app.get("/getTx", async function (req, res) {
    var result = await getTransaction.getTransaction(req.query.id);

    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send("No tx found");
    }
  });

  app.post("/limitedOfferDeploy", async function (req, res) {

    const data = {
      brandId1 : req.body.brandId1,
      brandId2 : req.body.brandId2,
      nTokens: req.body.nTokens
    };
    const result = await limitedOfferDeploy.limitedOfferDeploy(data);
  
    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  });

  app.use(cors());
  app.options('*', cors());
app.listen(3000 || "172.10.21.186" || "localhost" , function () {
    console.log("listening at port 3000");
  });