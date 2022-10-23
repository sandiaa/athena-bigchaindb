const axios = require("axios");
const testFunction = () => {
  axios
    .post("http://localhost:3000/createUser", {
      id: "2002",
      email: "receiver@gmail.com",
      name: "De-Share Receiver",
      pin: "receiver",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err.response.data)
    );
};
testFunction();