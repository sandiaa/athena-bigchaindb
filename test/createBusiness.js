const axios = require("axios");
const testFunction = () => {
  axios
    .post("http://localhost:3000/createBusiness", {
      id: "001",
      email: "mybusiness001@business.com",
      name: "My Business",
      number: "9000000001",
      pin: "0101",
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err.response.data)
    );
};
testFunction();