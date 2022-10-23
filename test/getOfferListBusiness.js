const axios = require("axios");
const testFunction = () => {
  axios.get("http://localhost:3000/getOfferListBusiness?id=4PLqZM3yC7HPSyMb7i2zjfurUaCWhA6HNEZpdsAtSvNz").then(
    (response) => {
      console.log(response.data);
    },
    (err) => console.log(err)
  );
};
testFunction();