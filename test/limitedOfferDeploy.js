const axios = require("axios");
const testFunction = () => {
  axios
    .post("http://localhost:3000/limitedOfferDeploy", {
      id: "000001",
      brandId1: "4PLqZM3yC7HPSyMb7i2zjfurUaCWhA6HNEZpdsAtSvNz",
      brandId2: "84aCB4gybGkP56xqyP318UeszWqhmGK7Do76bowqsThS",
      nTokens: 1000
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err.response.data)
    );
};
testFunction();