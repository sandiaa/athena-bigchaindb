const axios = require("axios");
const testFunction = () => {
  axios.get("http://localhost:3000/getFilesList?id=0013").then(
    (response) => {
      console.log(response.data);
    },
    (err) => console.log(err)
  );
};
testFunction();