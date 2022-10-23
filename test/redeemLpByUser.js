const axios = require("axios");
const testFunction = () => {
  axios
    .post("http://localhost:3000/redeemLpByUser", {
        txID:"8ba68cdeded9570898b5089f41ba602743c94b673ffe13d8f299d04f7723d52c",
        userId1: "5TZqTcanAzEMoqJsHWiS8By943bT3o4sCfX6ZEAkEYHU",
        userId2:"HrR78MK8rfnuqakXasxG3v59G3rZjsZ9aHk28852JjRy",
        brandId:"4PLqZM3yC7HPSyMb7i2zjfurUaCWhA6HNEZpdsAtSvNz"
    })
    .then(
      (response) => {
        console.log(response.data);
      },
      (err) => console.log(err.data)
    );
};
testFunction();
