const axios = require("axios");
const testFunction = () => {
  axios.get("http://localhost:3000/getTxDetails?id=815674ce78e92eea765cde6ec42376132e3788c394e774da3e92b2b92e97878c").then(
    (response) => {
      console.log(response.data.data[0]);
    },
    (err) => console.log(err)
  );
};
testFunction();