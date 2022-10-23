const axios = require("axios");
const testFunction = () => {
  axios
    .post("http://localhost:3000/createNewFileTransfer", {
      id: "45667676",
      sender: "0013",
      receiver: "0014",
      fileHash: "QmRFwsvew49b3AXwDJmqnicPDyFLhZP2451hE4WzBtTwVihC",
      fileLink: "https://samplelink.com",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err.response)
    );
};
testFunction();
